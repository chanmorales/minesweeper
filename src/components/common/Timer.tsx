import { useInject } from "@/hooks";
import { GameProviderContext } from "@/providers";
import { useEffect, useMemo } from "react";
import { timerHelper } from "@/helpers";
import { Clock, Pause, Play } from "lucide-react";
import { Button } from "@/components";

export const Timer = () => {
  const {
    isGameReady,
    isGamePaused,
    elapsedSeconds,
    setElapsedSeconds,
    isMineFieldGenerated,
    isGameOver,
    setIsGamePaused,
  } = useInject(GameProviderContext);

  useEffect(() => {
    if (isGamePaused || !isGameReady || !isMineFieldGenerated || isGameOver) {
      return;
    }

    const interval = setInterval(
      () => setElapsedSeconds((prev) => prev + 1),
      1000
    );
    return () => clearInterval(interval);
  }, [
    isGameOver,
    isGamePaused,
    isGameReady,
    isMineFieldGenerated,
    setElapsedSeconds,
  ]);

  const timer = useMemo(() => {
    return timerHelper.formatTime(elapsedSeconds);
  }, [elapsedSeconds]);

  return (
    <div className="flex justify-end">
      <Clock width="20" className="mt-1.5 mr-2.5" />
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-white w-12 pt-[3px]">
        {timer}
      </h4>
      <Button
        className="border-none p-0 hover:bg-transparent hover:text-white"
        variant="outline"
        size="icon"
        onClick={() => setIsGamePaused(true)}
      >
        {isGamePaused ? <Play /> : <Pause />}
      </Button>
    </div>
  );
};
