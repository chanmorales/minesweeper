import { GameDifficulty } from "@/types";
import { createContext } from "react";

export interface GameProviderContextType {
  /**
   * The game difficulty
   */
  gameDifficulty?: GameDifficulty;
}

export const GameProviderContext =
  createContext<GameProviderContextType | null>(null);
