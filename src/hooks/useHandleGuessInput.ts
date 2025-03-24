import { useState } from "react";
import { useKeyDown } from "./useKeyDown";
import { WORD_LENGTH } from "../constants/shared";

export const useHandleGuessInput = () => {
  const [currentGuess, setCurrentGuess] = useState<string>("");

  useKeyDown((event) => {
    if (event.key === "Backspace") {
      setCurrentGuess((prev) => prev.slice(0, -1)); // Remove last character
      return;
    }

    const isSingleCharacter = event.key.length === 1;
    const isAllowedCharacter = /^[a-zA-Z]$/.test(event.key);

    if (
      currentGuess.length < WORD_LENGTH &&
      isSingleCharacter &&
      isAllowedCharacter
    ) {
      setCurrentGuess((prev) => `${prev}${event.key}`);
    }
  });

  return { currentGuess, setCurrentGuess };
};
