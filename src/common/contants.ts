export const MINE = -1;

export const NEIGHBOR_OFFSETS: Readonly<number[][]> = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

export const MIN_DIMENSION = 9;
export const MAX_DIMENSION = 30;
export const DEFAULT_CUSTOM_MINES = 10;

/**
 * Height | Width | Mines
 */
export const FIXED_MINES_AND_DIMENSIONS = [
  // Beginner
  [9, 9, 10],
  // Intermediate
  [16, 16, 40],
  // Expert
  [16, 30, 99],
];
