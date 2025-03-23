import {
  Dispatch,
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { WordsActionTypes, WordsContextState } from "./types";
import { wordsReducer } from "./wordsReducer";
import { getWord } from "../api";

const initialState: WordsContextState = {
  currentWord: "",
  guesses: [],
  usedCharacters: new Set(),
} as const;

type WordsContextType = {
  wordsState: WordsContextState;
  dispatch: Dispatch<any>;
};

type WordsContextWrapperProps = {
  children: ReactNode;
};

export const WordsContext = createContext<WordsContextType>(
  {} as WordsContextType
);

export const WordsContextWrapper: FC<WordsContextWrapperProps> = ({
  children,
}) => {
  const [wordsState, dispatch] = useReducer(wordsReducer, initialState);

  useEffect(() => {
    getWord((value) =>
      dispatch({ type: WordsActionTypes.SET_CURRENT_WORD, value })
    );
  }, []);

  return (
    <WordsContext.Provider value={{ wordsState, dispatch }}>
      {children}
    </WordsContext.Provider>
  );
};

export const useWordsContext = () => useContext<WordsContextType>(WordsContext);
