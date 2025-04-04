import { FC, createContext, useContext, useEffect, useReducer } from "react";
import {
  WordsContextState,
  WordsContextType,
  WordsContextWrapperProps,
} from "./types";
import { wordsReducer } from "./wordsReducer";
import { getWords } from "../api";
import { GameStates, WordsActionTypes } from "./constants";

const initialState: WordsContextState = {
  gameState: GameStates.IN_PROGRESS,
  currentWord: "",
  validWords: [],
  guesses: [],
  usedCharacters: new Set(),
} as const;

export const WordsContext = createContext<WordsContextType>(
  {} as WordsContextType
);

export const WordsContextWrapper: FC<WordsContextWrapperProps> = ({
  children,
}) => {
  const [wordsState, dispatch] = useReducer(wordsReducer, initialState);

  useEffect(() => {
    getWords((words) =>
      dispatch({ type: WordsActionTypes.SET_INITIAL_STATE, value: words })
    );
  }, []);

  return (
    <WordsContext.Provider value={{ wordsState, dispatch }}>
      {children}
    </WordsContext.Provider>
  );
};

export const useWordsContext = () => useContext<WordsContextType>(WordsContext);
