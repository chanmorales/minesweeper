import { useEffect, useState } from "react";

/**
 * Custom hook that return a debounced value
 *
 * @param value - the value
 * @param delay - the delay
 */
export const useDebounce = <T>(value: T, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [delay, value]);

  return debouncedValue;
};
