export interface GameDifficulty {
  /**
   * The name of the difficulty
   */
  name: string;
  /**
   * The number of rows
   */
  rows: number;
  /**
   * The number of columns
   */
  columns: number;
  /**
   * The number of mines
   */
  mines: number;
}

export const BEGINNER: GameDifficulty = {
  name: "Beginner",
  rows: 9,
  columns: 9,
  mines: 10,
};

export const INTERMEDIATE: GameDifficulty = {
  name: "Intermediate",
  rows: 16,
  columns: 16,
  mines: 40,
};

export const EXPERT: GameDifficulty = {
  name: "Expert",
  rows: 16,
  columns: 30,
  mines: 99,
};

export enum FieldState {
  UNEXPLORED,
  FLAGGED,
  OPENED,
}
