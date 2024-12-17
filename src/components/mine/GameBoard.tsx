import { useInject } from "@/hooks";
import { GameProviderContext } from "@/providers";
import { Mine, MineField, Timer } from "@/components";

export const GameBoard = () => {
  const { isGameReady } = useInject(GameProviderContext);

  return (
    <div
      id="game-board-container"
      className="flex flex-col w-full h-full justify-center items-center"
    >
      <div hidden={!isGameReady}>
        <Timer />
        <MineField />
      </div>
      {!isGameReady && (
        <Mine width="240px" height="240px" className="heartbeat-animation" />
      )}
    </div>
  );
};
