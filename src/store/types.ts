export const WordsActionTypes = {
  SET_CURRENT_WORD: "setCurrentWord",
  ADD_GUESS: "addGuess",
} as const;

type SetWordAction = {
  type: typeof WordsActionTypes.SET_CURRENT_WORD;
  value: string;
};

type AddGuess = {
  type: typeof WordsActionTypes.ADD_GUESS;
  value: string;
};

export type WordsAction = SetWordAction | AddGuess;

export type WordsContextState = {
  currentWord: string;
  usedCharacters: string[];
  guesses: string[];
} & any;
