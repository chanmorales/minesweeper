class TimerHelper {
  /**
   * Formats time to display HH:MM:SS where HH is optional
   *
   * @param time - the time
   */
  public formatTime(time: number) {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    return (
      `${hours > 0 ? String(hours).padStart(2, "0") + ":" : ""}` +
      `${String(minutes).padStart(2, "0")}:` +
      `${String(seconds).padStart(2, "0")}`
    );
  }
}

export const timerHelper = new TimerHelper();
