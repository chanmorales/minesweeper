import { useCallback, useMemo, useState } from "react";
import {
  GameBoard,
  GameOverDialog,
  GamePausedDialog,
  SelectGameDifficultyDialog,
} from "@/components";
import { GameDifficulty } from "@/types";
import { GameProviderContext, GameProviderContextType } from "@/providers";

export const Game = () => {
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<GameDifficulty>();
  const [isGameReady, setIsGameReady] = useState(false);
  const [isGamePaused, setIsGamePaused] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isMineFieldGenerated, setIsMineFieldGenerated] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isWin, setIsWin] = useState(false);

  const gameProviderContext: GameProviderContextType = useMemo(
    () => ({
      gameDifficulty: selectedDifficulty,
      isGameReady,
      setIsGameReady,
      isGamePaused,
      setIsGamePaused,
      elapsedSeconds,
      setElapsedSeconds,
      isMineFieldGenerated,
      setIsMineFieldGenerated,
      isGameOver,
      setIsGameOver,
      setIsWin,
    }),
    [
      elapsedSeconds,
      isGameOver,
      isGamePaused,
      isGameReady,
      isMineFieldGenerated,
      selectedDifficulty,
    ]
  );

  const onNewGame = useCallback(() => {
    setSelectedDifficulty(undefined);
    setIsGameReady(false);
    setIsGamePaused(false);
    setIsGameOver(false);
    setIsMineFieldGenerated(false);
    setElapsedSeconds(0);
    setIsWin(false);
  }, []);

  return (
    <div
      id="game-container"
      className={`w-screen h-screen${isGamePaused ? " blur" : ""}`}
    >
      <GameProviderContext.Provider value={gameProviderContext}>
        <GameBoard />
      </GameProviderContext.Provider>
      <SelectGameDifficultyDialog
        open={!selectedDifficulty}
        onSelectDifficulty={setSelectedDifficulty}
      />
      <GameOverDialog
        open={isGameOver}
        onNewGame={onNewGame}
        isWin={isWin}
        time={elapsedSeconds}
        difficulty={selectedDifficulty?.name ?? ""}
      />
      <GamePausedDialog
        open={isGamePaused}
        elapsedSeconds={elapsedSeconds}
        difficulty={selectedDifficulty?.name ?? ""}
        isTimeRunning={isMineFieldGenerated}
        onResume={() => setIsGamePaused(false)}
        onRestart={() => onNewGame()}
      />
    </div>
  );
};
