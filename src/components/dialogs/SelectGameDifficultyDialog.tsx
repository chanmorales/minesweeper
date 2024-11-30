import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  ToggleGroup,
  ToggleGroupItem,
} from "@/components";
import { FC, useCallback, useState } from "react";
import { ADVANCED, EASY, GameDifficulty, INTERMEDIATE } from "@/types";

export interface SelectGameDifficultyDialogProps {
  open: boolean;
  onSelectDifficulty: (difficulty: GameDifficulty) => void;
}

export const SelectGameDifficultyDialog: FC<
  SelectGameDifficultyDialogProps
> = ({ open, onSelectDifficulty }) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>();

  const onStart = useCallback(() => {
    let difficulty: GameDifficulty;
    switch (selectedDifficulty) {
      case "easy":
        difficulty = EASY;
        break;
      case "intermediate":
        difficulty = INTERMEDIATE;
        break;
      case "advanced":
        difficulty = ADVANCED;
        break;
      default:
        // Do nothing
        return;
    }

    onSelectDifficulty(difficulty);
  }, [onSelectDifficulty, selectedDifficulty]);

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[300px]" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Select Game Difficulty</DialogTitle>
        </DialogHeader>
        <DialogDescription />
        <div>
          <ToggleGroup
            type="single"
            variant="outline"
            onValueChange={(value) => setSelectedDifficulty(value)}
          >
            <div className="flex flex-col gap-4 w-full">
              <ToggleGroupItem value="easy">Easy</ToggleGroupItem>
              <ToggleGroupItem value="intermediate">
                Intermediate
              </ToggleGroupItem>
              <ToggleGroupItem value="advanced">Advanced</ToggleGroupItem>
            </div>
          </ToggleGroup>
        </div>
        <DialogFooter>
          <DialogTrigger asChild>
            <Button disabled={!selectedDifficulty} onClick={onStart}>
              START
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
