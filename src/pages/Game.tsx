import { useMemo, useState } from "react";
import { GameBoard, SelectGameDifficultyDialog } from "@/components";
import { GameDifficulty } from "@/types";
import {
  GameProviderContext,
  GameProviderContextType,
} from "@/providers/GameProvider.ts";

export const Game = () => {
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<GameDifficulty>();

  const gameProviderContext: GameProviderContextType = useMemo(
    () => ({
      gameDifficulty: selectedDifficulty,
    }),
    [selectedDifficulty]
  );

  return (
    <>
      <GameProviderContext.Provider value={gameProviderContext}>
        <GameBoard />
      </GameProviderContext.Provider>
      <SelectGameDifficultyDialog
        open={!selectedDifficulty}
        onSelectDifficulty={setSelectedDifficulty}
      />
    </>
  );
};
