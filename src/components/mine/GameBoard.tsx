import { useInject } from "@/hooks";
import { GameProviderContext } from "@/providers";
import { Mine, MineField, Timer } from "@/components";

export const GameBoard = () => {
  const { isGameReady } = useInject(GameProviderContext);

  return (
    <div
      id="game-board-container"
      className="flex w-screen h-screen m-auto overflow-auto"
    >
      <div hidden={!isGameReady} className="m-auto">
        <Timer />
        <MineField />
      </div>
      {!isGameReady && (
        <Mine
          width="240px"
          height="240px"
          className="heartbeat-animation max-h-full self-center m-auto"
        />
      )}
    </div>
  );
};
