import { FC } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { timerHelper } from "@/helpers";
import { Clock, Joystick, Play } from "lucide-react";

export interface GamePausedDialogProps {
  open: boolean;
  elapsedSeconds: number;
  difficulty: string;
  onResume: () => void;
  onRestart: () => void;
}

export const GamePausedDialog: FC<GamePausedDialogProps> = ({
  open,
  elapsedSeconds,
  difficulty,
  onResume,
  onRestart,
}) => {
  return (
    <Dialog open={open}>
      <DialogContent showCloseButton={false}>
        <DialogHeader className="sm:text-center">
          <DialogTitle>Game Paused</DialogTitle>
        </DialogHeader>
        <VisuallyHidden asChild>
          <DialogDescription />
        </VisuallyHidden>
        <div className="flex justify-evenly">
          <div className="flex flex-col text-center gap-2">
            <div className="flex flex-row gap-2">
              <Clock />
              <span>Time</span>
            </div>
            <span>{timerHelper.formatTime(elapsedSeconds)}</span>
          </div>
          <div className="flex flex-col text-center gap-2">
            <div className="flex flex-row gap-2">
              <Joystick />
              <span>Difficulty</span>
            </div>
            <span>{difficulty}</span>
          </div>
        </div>
        <DialogFooter>
          <div className="w-full flex flex-col text-center items-center">
            <DialogTrigger asChild>
              <Button className="w-fit" onClick={onResume}>
                <Play /> RESUME
              </Button>
            </DialogTrigger>
            <DialogTrigger asChild>
              <Button
                variant="link"
                className="text-gray-400"
                onClick={onRestart}
              >
                RESTART
              </Button>
            </DialogTrigger>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
