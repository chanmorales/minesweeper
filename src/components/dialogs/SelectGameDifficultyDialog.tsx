import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  LearnMore,
  ToggleGroup,
  ToggleGroupItem,
} from "@/components";
import { FC, useCallback, useEffect, useState } from "react";
import { BEGINNER, EXPERT, GameDifficulty, INTERMEDIATE } from "@/types";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export interface SelectGameDifficultyDialogProps {
  open: boolean;
  onSelectDifficulty: (difficulty: GameDifficulty) => void;
}

export const SelectGameDifficultyDialog: FC<
  SelectGameDifficultyDialogProps
> = ({ open, onSelectDifficulty }) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>();

  useEffect(() => {
    if (open) {
      setSelectedDifficulty(undefined);
    }
  }, [open]);

  const onStart = useCallback(() => {
    let difficulty: GameDifficulty;
    switch (selectedDifficulty) {
      case "beginner":
        difficulty = BEGINNER;
        break;
      case "intermediate":
        difficulty = INTERMEDIATE;
        break;
      case "expert":
        difficulty = EXPERT;
        break;
      default:
        // Do nothing
        return;
    }

    onSelectDifficulty(difficulty);
  }, [onSelectDifficulty, selectedDifficulty]);

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[350px]" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="text-center">
            Select Game Difficulty
          </DialogTitle>
        </DialogHeader>
        <VisuallyHidden asChild>
          <DialogDescription />
        </VisuallyHidden>
        <div>
          <ToggleGroup
            type="single"
            variant="outline"
            onValueChange={(value) => setSelectedDifficulty(value)}
          >
            <div className="flex flex-col gap-4 w-full">
              <ToggleGroupItem value="beginner">Beginner</ToggleGroupItem>
              <ToggleGroupItem value="intermediate">
                Intermediate
              </ToggleGroupItem>
              <ToggleGroupItem value="expert">Expert</ToggleGroupItem>
            </div>
          </ToggleGroup>
        </div>
        <DialogFooter>
          <div className="flex justify-between w-full">
            <LearnMore />
            <DialogTrigger asChild>
              <Button
                disabled={!selectedDifficulty}
                onClick={onStart}
                className="bg-sky-600 hover:bg-sky-800"
              >
                START
              </Button>
            </DialogTrigger>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
