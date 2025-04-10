import { WORD_LENGTH } from "../constants/words";
import { GuessedChar } from "../types/shared";
import { getRandomItem } from "../utils/arrays";
import { getIsWordValid } from "../utils/words";
import { GameStates, WordsActionTypes } from "./constants";
import {
  WordsAction,
  WordsContextState,
  AddGuess,
  GameState,
  SetWordAction,
} from "./types";

// Set State Handlers

const handleSetInitialState = (
  state: WordsContextState,
  words: SetWordAction["value"]
): WordsContextState => {
  return { ...state, currentWord: getRandomItem(words), validWords: words };
};

const handleAddGuess = (
  state: WordsContextState,
  value: AddGuess["value"]
): WordsContextState => {
  if (!getIsWordValid(value, state.validWords)) {
    return {
      ...state,
      errorMessage:
        "Your guess is either not in the word list or is an invalid word",
    };
  }

  let gameState: GameState = GameStates.IN_PROGRESS;
  const lastUsedCharacters = new Set<GuessedChar>();

  const normalizedWordToGuess = state.currentWord.toUpperCase();
  const normalizedGuessedWord = value.toUpperCase();

  const isSuccess = normalizedGuessedWord === normalizedWordToGuess;

  if (isSuccess) {
    gameState = GameStates.IS_SUCCESS;
  }

  const isFailure = !isSuccess && state.guesses.length >= WORD_LENGTH;

  if (isFailure) {
    gameState = GameStates.IS_FAILURE;
  }

  const newGuess = [...normalizedGuessedWord].reduce((acc, currChar, index) => {
    const guessedCharIdx = normalizedWordToGuess.indexOf(currChar);
    const isCorrect = guessedCharIdx >= 0;
    const isOnCorrectPlace = currChar === normalizedWordToGuess.charAt(index);
    const guessedChar: GuessedChar = {
      char: currChar,
      isCorrect,
      isOnCorrectPlace,
    };

    if (!state.usedCharacters.has(guessedChar)) {
      state.usedCharacters.add(guessedChar);
      lastUsedCharacters.add(guessedChar);
    }

    return [...acc, guessedChar] as GuessedChar[];
  }, [] as GuessedChar[]);

  return {
    ...state,
    guesses: [...state.guesses, newGuess],
    lastUsedCharacters,
    gameState,
    errorMessage: "",
  };
};

const handleResetGameState = (state: WordsContextState): WordsContextState => {
  return {
    ...state,
    gameState: GameStates.IN_PROGRESS,
    currentWord: getRandomItem(state.validWords),
    usedCharacters: new Set(),
    lastUsedCharacters: new Set(),
    guesses: [],
    errorMessage: "",
  };
};

export const wordsReducer = (
  state: WordsContextState,
  action: WordsAction
): WordsContextState => {
  switch (action.type) {
    case WordsActionTypes.SET_INITIAL_STATE:
      return handleSetInitialState(state, action.value);
    case WordsActionTypes.ADD_GUESS:
      return handleAddGuess(state, action.value);
    case WordsActionTypes.RESET_GAME_STATE:
      return handleResetGameState(state);
    default:
      return state;
  }
};
