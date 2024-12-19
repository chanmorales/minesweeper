import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
  LearnMore,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ToggleGroup,
  ToggleGroupItem,
} from "@/components";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { BEGINNER, EXPERT, GameDifficulty, INTERMEDIATE } from "@/types";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { OctagonAlert, Settings, Sparkles } from "lucide-react";
import {
  DEFAULT_CUSTOM_MINES,
  FIXED_MINES_AND_DIMENSIONS,
  MAX_DIMENSION,
  MIN_DIMENSION,
} from "@/common";
import { useDebounce } from "@/hooks";
import { statHelper } from "@/helpers";

export interface SelectGameDifficultyDialogProps {
  open: boolean;
  onSelectDifficulty: (difficulty: GameDifficulty) => void;
}

export const SelectGameDifficultyDialog: FC<
  SelectGameDifficultyDialogProps
> = ({ open, onSelectDifficulty }) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>();
  const [customWidth, setCustomWidth] = useState(MIN_DIMENSION);
  const [customHeight, setCustomHeight] = useState(MIN_DIMENSION);
  const [customMines, setCustomMines] = useState(DEFAULT_CUSTOM_MINES);
  const [isCustomConfigValid, setIsCustomConfigValid] = useState(true);

  const debouncedWidth = useDebounce(customWidth);
  const debouncedHeight = useDebounce(customHeight);
  const debouncedMines = useDebounce(customMines);

  useEffect(() => {
    if (open) {
      setSelectedDifficulty(undefined);
    }
  }, [open]);

  useEffect(() => {
    /*
     * Checks if dimension is in range
     */
    const isConfigInvalid =
      selectedDifficulty === "custom" &&
      (debouncedWidth < MIN_DIMENSION ||
        debouncedWidth > MAX_DIMENSION ||
        debouncedHeight < MIN_DIMENSION ||
        debouncedHeight > MAX_DIMENSION ||
        debouncedMines > debouncedWidth * debouncedHeight - 9);
    setIsCustomConfigValid(!isConfigInvalid);
  }, [debouncedHeight, debouncedMines, debouncedWidth, selectedDifficulty]);

  const onSuggestMines = useCallback(() => {
    // Fixed dimensions and mines
    const fixedMineAndDim = FIXED_MINES_AND_DIMENSIONS.find(
      (fixedDimension) =>
        fixedDimension[0] === debouncedHeight &&
        fixedDimension[1] === debouncedWidth
    );

    const mines = fixedMineAndDim
      ? fixedMineAndDim[2]
      : statHelper.calculateTrend(
          [81, 256, 480],
          [10, 40, 99],
          debouncedWidth * debouncedHeight
        );
    setCustomMines(mines);
  }, [debouncedHeight, debouncedWidth]);

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
      case "custom":
        if (isCustomConfigValid) {
          difficulty = {
            name: "Custom",
            rows: debouncedHeight,
            columns: debouncedWidth,
            mines: debouncedMines,
          };
        } else {
          // Do nothing
          return;
        }
        break;
      default:
        // Do nothing
        return;
    }

    onSelectDifficulty(difficulty);
  }, [
    debouncedHeight,
    debouncedMines,
    debouncedWidth,
    isCustomConfigValid,
    onSelectDifficulty,
    selectedDifficulty,
  ]);

  const isValidDifficulty = useMemo(() => {
    /*
     * Difficulty is valid if:
     * (1) there is selected difficulty and
     * (2a) selected difficulty is not custom or
     * (2b) selected difficulty is custom and configuration is valid
     */
    return (
      selectedDifficulty &&
      (selectedDifficulty !== "custom" || isCustomConfigValid)
    );
  }, [isCustomConfigValid, selectedDifficulty]);

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
              <div>
                <div className="flex flex-row gap-1">
                  <ToggleGroupItem
                    value="custom"
                    className={`w-full${selectedDifficulty === "custom" && !isCustomConfigValid ? " !bg-red-200 border-red-600 !text-red-600" : ""}`}
                  >
                    Custom
                  </ToggleGroupItem>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        disabled={selectedDifficulty !== "custom"}
                      >
                        <Settings />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 dark">
                      <div className="grid">
                        <div className="grid grid-cols-3 items-center gap-4">
                          <Label htmlFor="width">Width</Label>
                          <Input
                            id="width"
                            type="number"
                            className="col-span-2 h-8"
                            value={customWidth}
                            min={9}
                            max={30}
                            onChange={(e) =>
                              setCustomWidth(Number(e.target.value))
                            }
                          />
                        </div>
                        <div className="grid grid-cols-3">
                          <p className="col-span-2 col-start-2 ml-2 text-xs text-gray-500">
                            The number of columns (9 - 30).
                          </p>
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4 mt-2">
                          <Label htmlFor="height">Height</Label>
                          <Input
                            id="height"
                            type="number"
                            className="col-span-2 h-8"
                            value={customHeight}
                            min={9}
                            max={30}
                            onChange={(e) =>
                              setCustomHeight(Number(e.target.value))
                            }
                          />
                        </div>
                        <div className="grid grid-cols-3">
                          <p className="col-span-2 col-start-2 ml-2 text-xs text-gray-500">
                            The number of rows (9 - 30).
                          </p>
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4 mt-2">
                          <Label htmlFor="mines">Mines</Label>
                          <div className="flex col-span-2">
                            <Input
                              id="mines"
                              type="number"
                              className="h-8"
                              value={customMines}
                              min={10}
                              onChange={(e) =>
                                setCustomMines(Number(e.target.value))
                              }
                            />
                            <Button
                              variant="ghost"
                              className="w-9"
                              onClick={onSuggestMines}
                            >
                              <Sparkles />
                            </Button>
                          </div>
                        </div>
                        <div className="grid grid-cols-3">
                          <p className="col-span-2 col-start-2 ml-2 text-xs text-gray-500">
                            The number of mines. There should be enough space to
                            place the mines.
                          </p>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
                <div
                  className={`flex flex-row${isCustomConfigValid ? " hidden" : ""}`}
                >
                  <OctagonAlert className="w-4 h-4 mt-1 mr-1 text-red-600" />
                  <p className="text-sm text-red-600">
                    Invalid custom configuration.
                  </p>
                </div>
              </div>
            </div>
          </ToggleGroup>
        </div>
        <DialogFooter>
          <div className="flex justify-between w-full">
            <LearnMore />
            <DialogTrigger asChild>
              <Button
                disabled={!isValidDifficulty}
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
