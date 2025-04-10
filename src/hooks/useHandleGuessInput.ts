import { useState } from "react";
import { useKeyDown } from "./useKeyDown";
import { WORD_LENGTH } from "../constants/words";
import { getIsKeyInputValid } from "../utils/words";
import { Word } from "../types/shared";
import { KEYS } from "../constants/keys";

type UseHandleGuessInputProps = { onSubmit?: () => void };

export const useHandleGuessInput = ({ onSubmit }: UseHandleGuessInputProps) => {
  const [currentGuess, setCurrentGuess] = useState<Word>("");

  const onKeyPressed = (key: string): void => {
    if (key === KEYS.BACKSPACE) {
      setCurrentGuess((prev) => prev.slice(0, -1)); // Remove last character

      return;
    }

    if (key === KEYS.ENTER) {
      onSubmit?.();

      return;
    }

    if (currentGuess.length < WORD_LENGTH && getIsKeyInputValid(key)) {
      setCurrentGuess((prev) => `${prev}${key}`);
    }
  };

  useKeyDown((event) => {
    onKeyPressed(event.key);
  });

  return { currentGuess, setCurrentGuess, onKeyPressed };
};
