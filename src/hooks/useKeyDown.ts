import { useCallback, useEffect } from "react";

export const useKeyDown = (onKeyPress: (event: KeyboardEvent) => void) => {
  const eventHandler = useCallback(onKeyPress, [onKeyPress]);

  useEffect(() => {
    document.addEventListener("keydown", eventHandler);

    return () => {
      document.removeEventListener("keydown", eventHandler);
    };
  }, [eventHandler]);
};
