import { FC, useState } from "react";
import { TileRow } from "./TileRow";
import { useWordsContext } from "../store";
import { useKeyDown } from "../hooks/useKeyDown";
import { WORD_LENGTH } from "../constants/shared";
import { WordsActionTypes } from "../store/types";

export const Game: FC = () => {
  const { wordsState, dispatch } = useWordsContext();

  useKeyDown((event) => {
    if (currentGuess.length < WORD_LENGTH) {
      setCurrentGuess(`${currentGuess}${event.key}`);
    }
  });

  const [currentGuess, setCurrentGuess] = useState<string>("");

  const handleSubmitGuess = () => {
    if (!currentGuess) {
      return;
    }

    dispatch({ type: WordsActionTypes.ADD_GUESS, value: currentGuess });
    setCurrentGuess("");
  };

  return (
    <div>
      <h1 className="p-2 bg-amber-100">
        {wordsState?.currentWord || "Loading..."}
      </h1>

      {[...Array(WORD_LENGTH + 1).keys()].map((index) => (
        <TileRow key={index} />
      ))}

      {currentGuess && <div className="p-2 bg-blue-200">{currentGuess}</div>}

      <button
        onClick={handleSubmitGuess}
        className="m-2 px-6 py-2 bg-green-800 rounded-full text-white"
      >
        Submit guess
      </button>

      <div className="flex gap-2">
        {Array.from(wordsState.usedCharacters).map((char, idx) => (
          <span key={idx} className="p-2 bg-emerald-100">
            {char as string}
          </span>
        ))}
      </div>
    </div>
  );
};
