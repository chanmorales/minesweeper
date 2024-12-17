import { Context, useContext } from "react";

export const useInject = <T>(context: Context<T>) => {
  const container = useContext(context);
  if (!container) {
    throw new Error(
      "Context provider container not found. Make sure to wrap your components with the correct provider."
    );
  }

  return container;
};
