import React, { FC, memo, useCallback, useMemo } from "react";
import { FieldState } from "@/types";
import { Button } from "@/components";
import { Bomb, Flag } from "lucide-react";
import { MINE } from "@/common";

export interface MineCellProps {
  /**
   * The row coordinate of this mine
   */
  row: number;
  /**
   * The column coordinate of this mine
   */
  col: number;
  /**
   * The state of this mine
   */
  state: FieldState;
  /**
   * Callback when a cell if flagged / un-flagged
   *
   * @param row - the row coordinate of this cell
   * @param col - the column coordinate of this cell
   */
  onFlag: (row: number, col: number, flagged: boolean) => void;
  /**
   * Callback when this cell is opened
   *
   * @param row - the row coordinate of this cell
   * @param col - the column coordinate of this cell
   */
  onOpen: (row: number, col: number) => void;
  /**
   * Callback when this cell's neighbors opened
   *
   * @param row - the row coordinate of this cell
   * @param col - the column coordinate of this cell
   */
  onOpenNeighbors: (row: number, col: number) => void;
  /**
   * The value of the cell
   * (-1 if mine, other else indicates the number of mines around the cell)
   */
  value: number;
}

export const MineCell: FC<MineCellProps> = memo(
  ({ row, col, state, onFlag, onOpen, onOpenNeighbors, value }) => {
    const onMineFlag = useCallback(
      (e: React.MouseEvent) => {
        switch (state) {
          case FieldState.UNEXPLORED:
            onFlag(row, col, true);
            break;
          case FieldState.FLAGGED:
            onFlag(row, col, false);
            break;
          case FieldState.OPENED:
          default:
            break;
        }

        // Prevent browser default action
        e.preventDefault();
      },
      [col, onFlag, row, state]
    );

    const onMineOpen = useCallback(
      (e: React.MouseEvent) => {
        switch (state) {
          case FieldState.UNEXPLORED:
            // If unexplored yet, open the cell
            onOpen(row, col);
            break;
          case FieldState.OPENED:
            // If mine is already opened, open the neighbors instead
            onOpenNeighbors(row, col);
            break;
          case FieldState.FLAGGED:
          default:
            // Do nothing
            break;
        }

        // Prevent browser default action
        e.preventDefault();
      },
      [col, onOpen, onOpenNeighbors, row, state]
    );

    const additionalClassNames = useMemo(() => {
      switch (state) {
        case FieldState.OPENED:
          return value === MINE ? " bg-red-400" : "";
        case FieldState.FLAGGED:
          return " bg-sky-600 hover:bg-sky-800";
        case FieldState.UNEXPLORED:
        default:
          return " bg-sky-400 hover:bg-sky-800";
      }
    }, [state, value]);

    const renderCellContent = useMemo(() => {
      if (state === FieldState.FLAGGED) {
        return <Flag />;
      } else if (state === FieldState.OPENED) {
        if (value === MINE) {
          return <Bomb />;
        } else if (value === 0) {
          return "";
        } else {
          return `${value}`;
        }
      } else {
        return "";
      }
    }, [state, value]);

    return (
      <Button
        className={`w-8 h-8 max-w-8 max-h-8 rounded-sm hover:bg-sky-950${additionalClassNames}`}
        onContextMenu={onMineFlag}
        onClick={onMineOpen}
      >
        {renderCellContent}
      </Button>
    );
  }
);
