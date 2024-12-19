class StatHelper {
  /**
   * Calculates a suggested mine count based on the user's custom dimension using linear algebra
   *
   * @param xs - the known number of cells
   * @param ys - the known mine counts
   * @param newX - the new number of cells
   */
  public calculateTrend(xs: number[], ys: number[], newX: number) {
    const n = xs.length;

    // Calculate sums needed for slope and intercept calculations
    const sumX = xs.reduce((sum, x) => sum + x, 0);
    const sumY = ys.reduce((sum, y) => sum + y, 0);
    const sumXY = xs.reduce((sum, x, i) => sum + x * ys[i], 0);
    const sumXX = xs.reduce((sum, x) => sum + x * x, 0);

    // Calculate slope (m) and intercept (b)
    const m = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const b = (sumY - m * sumX) / n;

    // Predict new y using linear equation
    return Math.round(m * newX + b);
  }
}

export const statHelper = new StatHelper();
