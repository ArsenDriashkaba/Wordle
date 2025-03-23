import { WORD_LENGTH } from "../constants/shared";
import {
  WordsAction,
  WordsActionTypes,
  WordsContextState,
  GuessedChar,
} from "./types";

// Handlers
const handleAddGuess = (
  state: WordsContextState,
  value: WordsAction["value"]
): WordsContextState => {
  // TODO: Some validation
  if (value.length !== WORD_LENGTH) {
    return state;
  }

  const updatedGuesses = [...value].reduce((acc, curr) => {
    const normalizedWordToGuess = state.currentWord.toUpperCase();
    const normalizedGuessedChar = curr.toUpperCase();

    const guessedCharIdx = normalizedWordToGuess.indexOf(normalizedGuessedChar);
    const isCorrect = guessedCharIdx >= 0;
    const isOnCorrectPlace =
      normalizedGuessedChar === normalizedWordToGuess.charAt(guessedCharIdx);
    const guessedChar: GuessedChar = {
      char: curr,
      isCorrect,
      isOnCorrectPlace,
    };

    state.usedCharacters.add(curr);

    return [...acc, guessedChar];
  }, [] as WordsContextState["guesses"]);

  return { ...state, guesses: [...state.guesses, updatedGuesses] };
};

export const wordsReducer = (
  state: WordsContextState,
  { type, value }: WordsAction
) => {
  switch (type) {
    case WordsActionTypes.SET_CURRENT_WORD:
      return { ...state, currentWord: value };
    case WordsActionTypes.ADD_GUESS:
      return handleAddGuess(state, value);
    default:
      return state;
  }
};
