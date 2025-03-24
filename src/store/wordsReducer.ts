import { WORD_LENGTH } from "../constants/shared";
import { GameStates, WordsActionTypes } from "./constants";
import { WordsAction, WordsContextState, GuessedChar, AddGuess } from "./types";

// Handlers
const handleAddGuess = (
  state: WordsContextState,
  value: AddGuess["value"]
): WordsContextState => {
  if (value.length !== WORD_LENGTH) {
    return state;
  }

  const normalizedWordToGuess = state.currentWord.toUpperCase();
  const normalizedGuessedWord = value.toUpperCase();

  const isSuccess = normalizedGuessedWord === normalizedWordToGuess;
  const isFailure = !isSuccess && state.guesses.length >= WORD_LENGTH;

  const newGuess = [...normalizedGuessedWord].reduce((acc, currChar, index) => {
    const guessedCharIdx = normalizedWordToGuess.indexOf(currChar);
    const isCorrect = guessedCharIdx >= 0;
    const isOnCorrectPlace = currChar === normalizedWordToGuess.charAt(index);
    const guessedChar: GuessedChar = {
      char: currChar,
      isCorrect,
      isOnCorrectPlace,
    };

    state.usedCharacters.add(currChar);

    return [...acc, guessedChar] as GuessedChar[];
  }, [] as GuessedChar[]);

  console.log({ isSuccess, isFailure });

  return { ...state, guesses: [...state.guesses, newGuess] };
};

const handleResetGameState = (
  newWordToGuess: WordsContextState["currentWord"]
): WordsContextState => {
  return {
    gameState: GameStates.IN_PROGRESS,
    currentWord: newWordToGuess,
    usedCharacters: new Set(),
    guesses: [],
  };
};

export const wordsReducer = (
  state: WordsContextState,
  action: WordsAction
): WordsContextState => {
  switch (action.type) {
    case WordsActionTypes.SET_CURRENT_WORD:
      return { ...state, currentWord: action.value };
    case WordsActionTypes.ADD_GUESS:
      return handleAddGuess(state, action.value);
    case WordsActionTypes.RESET_GAME_STATE:
      return handleResetGameState(action.value);
    default:
      return state;
  }
};
