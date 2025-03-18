import { FC, useState } from "react";
import { TileRow } from "./TileRow";
import { useWordsContext } from "../store";
import { useKeyDown } from "../hooks/useKeyDown";
import { WORD_LENGTH } from "../constants/shared";
import { WordsActionTypes } from "../store/types";

export const Game: FC = () => {
  const { wordsState, dispatch } = useWordsContext();

  useKeyDown((event) => {
    console.log(event.key);

    if (currentGuess.length < WORD_LENGTH) {
      setCurrentGuess(`${currentGuess}${event.key}`);
    }
  });

  //test
  const [currentGuess, setCurrentGuess] = useState<string>("");

  const handleSubmitGuess = () => {
    // TODO:
    dispatch({ type: WordsActionTypes.ADD_GUESS, value: currentGuess });
  };

  return (
    <div>
      <h1>{wordsState.currentWord || "Loading..."}</h1>
      {[...Array(WORD_LENGTH + 1).keys()].map((index) => (
        <TileRow key={index} />
      ))}

      <div>{currentGuess}</div>
      <button onClick={handleSubmitGuess}>Submit guess</button>
    </div>
  );
};
