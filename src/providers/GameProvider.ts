import { GameDifficulty } from "@/types";
import { createContext, Dispatch, SetStateAction } from "react";

export interface GameProviderContextType {
  /**
   * The game difficulty
   */
  gameDifficulty?: GameDifficulty;
  /**
   * Flag to determine if game is ready
   */
  isGameReady: boolean;
  /**
   * Sets the flag when game is ready
   *
   * @param ready the value whether the game is ready or not
   */
  setIsGameReady: (ready: boolean) => void;
  /**
   * Flag to determine whether the game is paused
   */
  isGamePaused: boolean;
  /**
   * Sets the flag when the game is paused
   *
   * @param paused the value whether the game is paused
   */
  setIsGamePaused: (isGamePaused: boolean) => void;
  /**
   * The elapsed seconds since game is start
   */
  elapsedSeconds: number;
  /**
   * Sets the elapsed seconds
   *
   * @param elapsedSeconds the value of the elapsed seconds
   */
  setElapsedSeconds: Dispatch<SetStateAction<number>>;
  /**
   * Flag to determine whether the minefield is already generated
   */
  isMineFieldGenerated: boolean;
  /**
   * Sets the flag whether the minefield is already generated
   *
   * @param isMineFieldGenerated - the value of the flag
   */
  setIsMineFieldGenerated: (isMineFieldGenerated: boolean) => void;
  /**
   * Flag to determine when the game is over
   */
  isGameOver: boolean;
  /**
   * Sets the flag when the game is over
   *
   * @param isGameOver - the value of the flag
   */
  setIsGameOver: (isGameOver: boolean) => void;
  /**
   * Sets the flag if the player wins on game over
   *
   * @param isWin - the value of the flag
   */
  setIsWin: (isWin: boolean) => void;
}

export const GameProviderContext =
  createContext<GameProviderContextType | null>(null);
