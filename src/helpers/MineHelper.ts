import { GameDifficulty } from "@/types";
import { MINE } from "@/common";

class MineHelper {
  /**
   * Generate the mine locations based on the game difficulty and initial user click
   *
   * @param gameDifficulty - the game difficulty
   * @param initialRow - the row coordinate of the user's first click
   * @param initialColumn - the column coordinate of the user's first click
   */
  public generateMineField(
    gameDifficulty: GameDifficulty,
    initialRow: number,
    initialColumn: number
  ) {
    const { rows, columns, mines } = gameDifficulty;

    // Available indices for a mine to be placed
    const availableIndices: number[] = Array.from(
      { length: rows * columns },
      (_, index) => index + 1
    );

    /*
     * Make initial click coordinate and its neighbors mine free by removing
     * them from the available fields
     */
    const initialAndNeighborsIndices = this.getInitialAndNeighborsIndices(
      initialRow,
      initialColumn,
      rows,
      columns
    );
    initialAndNeighborsIndices.forEach((e) => {
      const index = availableIndices.indexOf(e);
      if (index !== -1) {
        availableIndices.splice(index, 1);
      }
    });

    return this.randomizeMineLocations(rows, columns, mines, availableIndices);
  }

  /**
   * Get the initial click and its neighbors' indices
   *
   * @param initialRow - the row coordinate of the initial click
   * @param initialColumn - the column coordinate of the initial click
   * @param height - the number of rows
   * @param width - the number of columns
   */
  private getInitialAndNeighborsIndices(
    initialRow: number,
    initialColumn: number,
    height: number,
    width: number
  ) {
    const initialAndNeighborsIndices: number[] = [];

    // Add the cell itself
    initialAndNeighborsIndices.push(
      this.coordinateToIndex(initialRow, initialColumn, width)
    );

    /*
     * Add the neighbors
     */

    if (initialColumn > 0) {
      // Left
      initialAndNeighborsIndices.push(
        this.coordinateToIndex(initialRow, initialColumn - 1, width)
      );
      // Upper Left
      if (initialRow > 0) {
        initialAndNeighborsIndices.push(
          this.coordinateToIndex(initialRow - 1, initialColumn - 1, width)
        );
      }
      // Lower Left
      if (initialRow < height - 1) {
        initialAndNeighborsIndices.push(
          this.coordinateToIndex(initialRow + 1, initialColumn - 1, width)
        );
      }
    }

    if (initialColumn < width - 1) {
      // Right
      initialAndNeighborsIndices.push(
        this.coordinateToIndex(initialRow, initialColumn + 1, width)
      );
      // Upper Right
      if (initialRow > 0) {
        initialAndNeighborsIndices.push(
          this.coordinateToIndex(initialRow - 1, initialColumn + 1, width)
        );
      }
      // Upper Left
      if (initialRow < height - 1) {
        initialAndNeighborsIndices.push(
          this.coordinateToIndex(initialRow + 1, initialColumn + 1, width)
        );
      }
    }

    // Top
    if (initialRow > 0) {
      initialAndNeighborsIndices.push(
        this.coordinateToIndex(initialRow - 1, initialColumn, width)
      );
    }

    // Bottom
    if (initialRow < height - 1) {
      initialAndNeighborsIndices.push(
        this.coordinateToIndex(initialRow + 1, initialColumn, width)
      );
    }

    return initialAndNeighborsIndices;
  }

  /**
   * Converts coordinate to index
   *
   * @param row - the row of the coordinate
   * @param col - the column of the coordinate
   * @param width - the width of the field
   */
  private coordinateToIndex(row: number, col: number, width: number) {
    return row * width + col + 1;
  }

  /**
   * Converts an index to coordinate
   *
   * @param index - the index to be converted
   * @param width  the width of the field
   */
  private indexToCoordinate(index: number, width: number) {
    const row = Math.floor((index - 1) / width);
    const col = (index - 1) % width;

    return { row, col };
  }

  /**
   * Randomize mine locations
   *
   * @param height - the height of the minefield
   * @param width - the width of the minefield
   * @param mines - the number of mines to be placed
   * @param availableIndices - the available indices for the mines to be placed
   */
  private randomizeMineLocations(
    height: number,
    width: number,
    mines: number,
    availableIndices: number[]
  ) {
    // Initialize the minefield to all non-mine (zero)
    const generatedMineField: number[][] = [];
    for (let r = 0; r < height; r++) {
      generatedMineField.push(new Array(width).fill(0));
    }

    while (mines > 0) {
      // Pick a random index from the available indices
      const mineIndex = Math.floor(Math.random() * availableIndices.length);

      // Set the randomized index in the minefield as a mine
      const { row, col } = this.indexToCoordinate(
        availableIndices[mineIndex],
        width
      );
      generatedMineField[row][col] = MINE;

      // Remove the index from the available indices
      availableIndices.splice(mineIndex, 1);

      /*
       * Increment the mine count of the neighboring cells
       */
      if (col > 0) {
        // Left
        if (generatedMineField[row][col - 1] !== MINE) {
          generatedMineField[row][col - 1]++;
        }

        // Upper Left
        if (row > 0 && generatedMineField[row - 1][col - 1] !== MINE) {
          generatedMineField[row - 1][col - 1]++;
        }

        // Lower Left
        if (row < height - 1 && generatedMineField[row + 1][col - 1] !== MINE) {
          generatedMineField[row + 1][col - 1]++;
        }
      }

      if (col < width - 1) {
        // Right
        if (generatedMineField[row][col + 1] !== MINE) {
          generatedMineField[row][col + 1]++;
        }

        // Upper Right
        if (row > 0 && generatedMineField[row - 1][col + 1] !== MINE) {
          generatedMineField[row - 1][col + 1]++;
        }

        // Lower Right
        if (row < height - 1 && generatedMineField[row + 1][col + 1] !== MINE) {
          generatedMineField[row + 1][col + 1]++;
        }
      }

      // Top
      if (row > 0 && generatedMineField[row - 1][col] !== MINE) {
        generatedMineField[row - 1][col]++;
      }

      // Bottom
      if (row < height - 1 && generatedMineField[row + 1][col] !== MINE) {
        generatedMineField[row + 1][col]++;
      }

      // Decrement the number of mines remaining to be placed
      mines--;
    }

    return generatedMineField;
  }
}

export const mineHelper = new MineHelper();
