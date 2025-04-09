import { Dispatch, ReactNode } from "react";
import { GameStates, WordsActionTypes } from "./constants";
import { GuessedChar, Word } from "../types/shared";

// Action types

export type SetWordAction = {
  type: typeof WordsActionTypes.SET_INITIAL_STATE;
  value: Word[];
};

export type AddGuess = {
  type: typeof WordsActionTypes.ADD_GUESS;
  value: Word;
};

export type ResetGameState = {
  type: typeof WordsActionTypes.RESET_GAME_STATE;
};

export type WordsAction = SetWordAction | AddGuess | ResetGameState;

// General Types

export type GameState = keyof typeof GameStates;

export type WordsContextState = {
  gameState: GameState;
  currentWord: Word;
  validWords: Word[];
  usedCharacters: Set<GuessedChar>;
  lastUsedCharacters: Set<GuessedChar>;
  guesses: GuessedChar[][];
  errorMessage?: string;
};

export type WordsContextType = {
  wordsState: WordsContextState;
  dispatch: Dispatch<WordsAction>;
  isSuccess: () => boolean;
  isFailure: () => boolean;
  isInProgress: () => boolean;
};

export type WordsContextWrapperProps = {
  children: ReactNode;
};
