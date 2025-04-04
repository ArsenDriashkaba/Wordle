import { Dispatch, ReactNode } from "react";
import { GameStates, WordsActionTypes } from "./constants";
import { Word } from "../types/shared";

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

export type GuessedChar = {
  char: string;
  isCorrect: boolean;
  isOnCorrectPlace: boolean;
};

export type WordsContextState = {
  gameState: GameState;
  currentWord: Word;
  validWords: Word[];
  usedCharacters: Set<string>;
  guesses: GuessedChar[][];
  errorMessage?: string;
};

export type WordsContextType = {
  wordsState: WordsContextState;
  dispatch: Dispatch<WordsAction>;
};

export type WordsContextWrapperProps = {
  children: ReactNode;
};
