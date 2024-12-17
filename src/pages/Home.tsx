import { Button, Mine } from "@/components";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      id="home-container"
      className="h-full w-full flex flex-col gap-6 justify-center items-center"
    >
      <Mine
        width="240px"
        height="240px"
        className="slow-spin-animation glow glow-red"
      />
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        M I N E S W E E P E R
      </h1>
      <Button
        variant="outline"
        onClick={() => navigate("/game", { replace: true })}
      >
        PLAY
      </Button>
    </div>
  );
};
