import { FC } from "react";
import { TileRow } from "./TileRow";
import { useWordsContext, WordsActionTypes } from "../store";
import { WORD_LENGTH } from "../constants/shared";
import { getWord } from "../api";
import { useHandleGuessInput } from "../hooks/useHandleGuessInput";

export const Game: FC = () => {
  const { wordsState, dispatch } = useWordsContext();
  const { currentGuess, setCurrentGuess } = useHandleGuessInput();

  const handleSubmitGuess = () => {
    if (!currentGuess) {
      return;
    }

    dispatch({ type: WordsActionTypes.ADD_GUESS, value: currentGuess });
    setCurrentGuess("");
  };

  const handleResetGame = () => {
    dispatch({ type: WordsActionTypes.SET_CURRENT_WORD, value: "" });

    getWord((word) =>
      dispatch({ type: WordsActionTypes.RESET_GAME_STATE, value: word })
    );
  };

  return (
    <div>
      <h2 className="bold mb-2">{wordsState?.gameState}</h2>
      <h1 className="p-2 bg-amber-100">
        {wordsState?.currentWord || "Loading..."}
      </h1>

      <div className="flex flex-col gap-2 p-2">
        {[...Array(WORD_LENGTH + 1).keys()].map((index) => {
          const lastGuessId = wordsState.guesses?.length || 0;

          if (index < lastGuessId) {
            return (
              <TileRow
                key={index}
                wordLength={WORD_LENGTH}
                currentGuess={wordsState.guesses?.[index]}
              />
            );
          }

          if (index === lastGuessId) {
            return (
              <TileRow
                key={index}
                wordLength={WORD_LENGTH}
                currentGuess={currentGuess}
              />
            );
          }

          return <TileRow key={index} wordLength={WORD_LENGTH} />;
        })}
      </div>

      {currentGuess && <div className="p-2 bg-blue-200">{currentGuess}</div>}

      <div className="flex gap-0.5">
        <button
          onClick={handleSubmitGuess}
          className="m-2 px-6 py-2 bg-green-800 rounded-full text-white"
        >
          Submit guess
        </button>
        <button
          onClick={handleResetGame}
          className="m-2 px-6 py-2 bg-red-800 rounded-full text-white"
        >
          Reset game
        </button>
      </div>

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
