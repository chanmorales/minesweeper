import { FC } from "react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Exploded,
  Gold,
} from "@/components";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Timer } from "lucide-react";
import { timerHelper } from "@/helpers";

export interface GameOverDialogProps {
  open: boolean;
  onNewGame: () => void;
  isWin: boolean;
  time: number;
  difficulty: string;
}

export const GameOverDialog: FC<GameOverDialogProps> = ({
  open,
  onNewGame,
  isWin,
  time,
  difficulty,
}) => {
  return (
    <Dialog open={open}>
      <DialogContent showCloseButton={false}>
        <VisuallyHidden asChild>
          <DialogHeader>
            <DialogTitle />
          </DialogHeader>
        </VisuallyHidden>
        <VisuallyHidden asChild>
          <DialogDescription />
        </VisuallyHidden>
        <div className="flex flex-col w-full justify-center items-center gap-4">
          {isWin ? (
            <>
              <Gold width="256px" height="256px" className="glow glow-yellow" />
              <Alert className="border-none">
                <AlertTitle>
                  <div className="w-full flex justify-center items-center">
                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                      Congratulations!
                    </h4>
                  </div>
                </AlertTitle>
                <AlertDescription>
                  <div className="flex items-center mt-4 gap-2">
                    <Timer />
                    <div className="text-lg font-semibold">{`${difficulty}: ${timerHelper.formatTime(time)}`}</div>
                  </div>
                </AlertDescription>
              </Alert>
            </>
          ) : (
            <>
              <Exploded
                width="256px"
                height="256px"
                className="glow glow-red"
              />
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Better Luck Next Time!
              </h4>
            </>
          )}
        </div>
        <DialogFooter>
          <div className="flex justify-center w-full">
            <DialogTrigger asChild>
              <Button onClick={onNewGame}>NEW GAME</Button>
            </DialogTrigger>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
