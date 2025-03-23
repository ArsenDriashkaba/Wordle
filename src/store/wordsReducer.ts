import { WORD_LENGTH } from "../constants/shared";
import { WordsAction, WordsActionTypes, WordsContextState } from "./types";

// Handlers
const handleAddGuess = (
  state: WordsContextState,
  value: WordsAction["value"]
): WordsContextState => {
  console.log({ state, value });
  // TODO: Some validation
  if (value.length !== WORD_LENGTH) {
    return state;
  }

  // TODO: Add used characters

  const updatedGuesses = state.guesses.push(value);

  return { ...state, guesses: updatedGuesses };
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
