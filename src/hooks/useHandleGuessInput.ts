import { useState } from "react";
import { useKeyDown } from "./useKeyDown";
import { WORD_LENGTH } from "../constants/shared";
import { getIsKeyInputValid } from "../utils/words";
import { Word } from "../types/shared";

const KEYS = {
  BACKSPACE: "Backspace",
  ENTER: "Enter",
} as const;

type UseHandleGuessInputProps = { onSubmit?: () => void };

export const useHandleGuessInput = ({ onSubmit }: UseHandleGuessInputProps) => {
  const [currentGuess, setCurrentGuess] = useState<Word>("");

  useKeyDown((event) => {
    if (event.key === KEYS.BACKSPACE) {
      setCurrentGuess((prev) => prev.slice(0, -1)); // Remove last character

      return;
    }

    if (event.key === KEYS.ENTER) {
      onSubmit?.();

      return;
    }

    if (currentGuess.length < WORD_LENGTH && getIsKeyInputValid(event.key)) {
      setCurrentGuess((prev) => `${prev}${event.key}`);
    }
  });

  return { currentGuess, setCurrentGuess };
};
