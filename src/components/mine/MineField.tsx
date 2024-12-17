import { useInject } from "@/hooks";
import { GameProviderContext } from "@/providers";
import { useCallback, useEffect, useState } from "react";
import { FieldState } from "@/types";
import {
  MineCell,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components";
import { mineHelper } from "@/helpers";
import { MINE, NEIGHBOR_OFFSETS } from "@/common";
import { Bomb } from "lucide-react";

export const MineField = () => {
  const [fieldState, setFieldState] = useState<FieldState[][]>();
  const [minefield, setMinefield] = useState<number[][]>();
  const [flaggedCount, setFlaggedCount] = useState(0);
  const [openedCount, setOpenedCount] = useState(0);
  const {
    isGameReady,
    setIsGameReady,
    gameDifficulty,
    isMineFieldGenerated,
    setIsMineFieldGenerated,
    setIsGameOver,
    setIsWin,
  } = useInject(GameProviderContext);

  useEffect(() => {
    if (isGameReady || !gameDifficulty) {
      return;
    }

    /*
     * Initialize all field state to unexplored and minefield to all zero's (no mines yet),
     * mine locations will be generated upon first click.
     */
    try {
      const minefield: number[][] = [];
      const fieldState: FieldState[][] = [];
      for (let i = 0; i < gameDifficulty.rows; i++) {
        minefield.push(new Array(gameDifficulty.columns).fill(0));
        fieldState.push(
          new Array(gameDifficulty.columns).fill(FieldState.UNEXPLORED)
        );
      }
      setMinefield(minefield);
      setFieldState(fieldState);
      setFlaggedCount(0);
      setOpenedCount(0);
    } finally {
      setIsGameReady(true);
    }
  }, [gameDifficulty, isGameReady, setIsGameReady]);

  useEffect(() => {
    if (!gameDifficulty || !isMineFieldGenerated) {
      return;
    }

    /*
     * The player wins if all non-mine is opened
     */
    const { rows: height, columns: width, mines } = gameDifficulty;
    if (openedCount === width * height - mines) {
      setIsWin(true);
      setIsGameOver(true);
    }
  }, [
    gameDifficulty,
    isMineFieldGenerated,
    openedCount,
    setIsGameOver,
    setIsWin,
  ]);

  const openMineNeighbors = useCallback(
    (
      row: number,
      col: number,
      fieldState: FieldState[][],
      minefield: number[][],
      openMine: (
        row: number,
        col: number,
        fieldState: FieldState[][],
        minefield: number[][]
      ) => void
    ) => {
      // Left
      openMine(row, col - 1, fieldState, minefield);
      // Right
      openMine(row, col + 1, fieldState, minefield);
      // Upper Left
      openMine(row - 1, col - 1, fieldState, minefield);
      // Upper Right
      openMine(row - 1, col + 1, fieldState, minefield);
      // Lower Left
      openMine(row + 1, col - 1, fieldState, minefield);
      // Lower Right
      openMine(row + 1, col + 1, fieldState, minefield);
      // Top
      openMine(row - 1, col, fieldState, minefield);
      // Bottom
      openMine(row + 1, col, fieldState, minefield);
    },
    []
  );

  const openMine = useCallback(
    (
      row: number,
      col: number,
      fieldState: FieldState[][],
      minefield: number[][]
    ) => {
      /*
       * Do not open mine cell in case of the following:
       * (1) The specified coordinates is outside the minefield's boundary
       * (2) The mine cell is not unexplored
       */
      if (
        !gameDifficulty ||
        row < 0 ||
        col < 0 ||
        row >= gameDifficulty.rows ||
        col >= gameDifficulty.columns ||
        fieldState[row][col] !== FieldState.UNEXPLORED
      ) {
        return;
      }

      // Open the current cell
      fieldState[row][col] = FieldState.OPENED;
      setOpenedCount((prev) => ++prev);

      // If current cell has no mines around, open the neighbors as well
      if (minefield[row][col] === MINE) {
        // Player loses when a mine is opened
        setIsWin(false);
        setIsGameOver(true);
      } else if (minefield[row][col] === 0) {
        openMineNeighbors(row, col, fieldState, minefield, openMine);
      }
    },
    [gameDifficulty, openMineNeighbors, setIsGameOver, setIsWin]
  );

  const onFlag = useCallback(
    (row: number, col: number, flagged: boolean) => {
      if (!fieldState) {
        return;
      }

      // Update the field state and the flagged count
      const updatedFieldState = [...fieldState];
      updatedFieldState[row][col] = flagged
        ? FieldState.FLAGGED
        : FieldState.UNEXPLORED;
      setFieldState(updatedFieldState);
      setFlaggedCount((prev) => (flagged ? ++prev : --prev));
    },
    [fieldState]
  );

  const onOpen = useCallback(
    (row: number, col: number) => {
      if (!minefield || !fieldState || !gameDifficulty || !isGameReady) {
        return;
      }

      let currentMineField;
      if (!isMineFieldGenerated) {
        // Generate the minefield locations
        currentMineField = mineHelper.generateMineField(
          gameDifficulty,
          row,
          col
        );
        setMinefield(currentMineField);
        setIsMineFieldGenerated(true);
      } else {
        currentMineField = [...minefield];
      }

      // Update field state
      const updatedFieldState = [...fieldState];
      openMine(row, col, updatedFieldState, currentMineField);
      setFieldState(updatedFieldState);
    },
    [
      fieldState,
      gameDifficulty,
      isGameReady,
      isMineFieldGenerated,
      minefield,
      openMine,
      setIsMineFieldGenerated,
    ]
  );

  const countNeighborFlag = useCallback(
    (row: number, col: number) => {
      if (!gameDifficulty || !fieldState) {
        return 0;
      }

      let neighborFlagCount = 0;
      NEIGHBOR_OFFSETS.forEach((offset) => {
        const neighborRow = row + offset[0];
        const neighborCol = col + offset[1];
        if (
          neighborRow >= 0 &&
          neighborCol >= 0 &&
          neighborRow < gameDifficulty.rows &&
          neighborCol < gameDifficulty.columns &&
          fieldState[neighborRow][neighborCol] === FieldState.FLAGGED
        ) {
          neighborFlagCount++;
        }
      });

      return neighborFlagCount;
    },
    [fieldState, gameDifficulty]
  );

  const onOpenNeighbors = useCallback(
    (row: number, col: number) => {
      if (!minefield || !fieldState) {
        return;
      }

      // Count neighbor flag first and only allow direct open neighbors
      // if flagged count is the same as the neighboring mine count
      const neighborFlagCount = countNeighborFlag(row, col);
      if (neighborFlagCount === minefield[row][col]) {
        const updatedFieldState = [...fieldState];
        openMineNeighbors(row, col, updatedFieldState, minefield, openMine);
        setFieldState(updatedFieldState);
      }
    },
    [countNeighborFlag, fieldState, minefield, openMine, openMineNeighbors]
  );

  return (
    <div>
      {gameDifficulty && fieldState && minefield && isGameReady && (
        <>
          <div>
            {Array.from({ length: gameDifficulty.rows }).map((_, row) => (
              <div className="flex" key={`mine-row-${row}`}>
                {Array.from({ length: gameDifficulty.columns }).map(
                  (_, col) => (
                    <MineCell
                      key={`mine-cell-${row}-${col}`}
                      row={row}
                      col={col}
                      state={fieldState[row][col]}
                      onFlag={onFlag}
                      onOpen={onOpen}
                      onOpenNeighbors={onOpenNeighbors}
                      value={minefield[row][col]}
                    />
                  )
                )}
              </div>
            ))}
          </div>
          <div className="w-full flex justify-end mt-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex gap-2 mr-2">
                    <Bomb className="text-red-500" />
                    <span>{`${flaggedCount} / ${gameDifficulty.mines}`}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <span>The number of mines flagged</span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </>
      )}
    </div>
  );
};
