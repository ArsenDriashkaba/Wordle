import { Dispatch, ReactNode } from "react";
import { GameStates, WordsActionTypes } from "./constants";

// Action types

export type SetWordAction = {
  type: typeof WordsActionTypes.SET_CURRENT_WORD;
  value: string;
};

export type AddGuess = {
  type: typeof WordsActionTypes.ADD_GUESS;
  value: string;
};

export type ResetGameState = {
  type: typeof WordsActionTypes.RESET_GAME_STATE;
  value: string;
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
  currentWord: string;
  usedCharacters: Set<string>;
  guesses: GuessedChar[][];
};

export type WordsContextType = {
  wordsState: WordsContextState;
  dispatch: Dispatch<WordsAction>;
};

export type WordsContextWrapperProps = {
  children: ReactNode;
};
