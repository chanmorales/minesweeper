import { Button, Popover, PopoverContent, PopoverTrigger } from "@/components";

export const LearnMore = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="link" className="text-gray-400">
          Learn More
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col gap-4">
          <div>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              <strong>Beginner</strong>: 9x9, 10 mines
            </p>
          </div>
          <div>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              <strong>Intermediate</strong>: 16x16, 40 mines
            </p>
          </div>
          <div>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              <strong>Expert</strong>: 16x30, 99 mines
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
