import { FC } from "react";
import { useWordsContext, WordsActionTypes } from "../store";
import { useHandleGuessInput } from "../hooks/useHandleGuessInput";
import { Button } from "./ui/Button";
import { ScreenKeyboard } from "./shared/ScreenKeyboard/ScreenKeyboard";
import { Board } from "./shared/Board/Board";

export const Game: FC = () => {
  const { wordsState, dispatch, isSuccess, isInProgress } = useWordsContext();

  const handleSubmitGuess = () => {
    if (!currentGuess) {
      return;
    }

    dispatch({ type: WordsActionTypes.ADD_GUESS, value: currentGuess });
    setCurrentGuess("");
  };

  const { currentGuess, setCurrentGuess, onKeyPressed } = useHandleGuessInput({
    onSubmit: handleSubmitGuess,
  });

  const handleResetGame = () => {
    dispatch({ type: WordsActionTypes.RESET_GAME_STATE });
    setCurrentGuess("");
  };

  const ResetButton: FC = () => (
    <Button onClick={handleResetGame}>Reset game</Button>
  );

  const SuccessMessage: FC = () => (
    <>
      <h1 className="text-white">Success</h1>
      <ResetButton />
    </>
  );

  const FailureMessage: FC = () => (
    <>
      <h1 className="text-white">Failure! Better luck next time!</h1>
      <ResetButton />
    </>
  );

  if (!isInProgress()) {
    return (
      <div className="flex flex-col items-center justify-center">
        {isSuccess() ? <SuccessMessage /> : <FailureMessage />}
      </div>
    );
  }

  return (
    <div>
      <h2 className="bold mb-2 text-red-800">{wordsState?.errorMessage}</h2>

      <Board currentGuess={currentGuess} guesses={wordsState.guesses} />

      <div className="flex gap-0.5 justify-center">
        <Button onClick={handleSubmitGuess}>Submit guess</Button>
        <ResetButton />
      </div>

      <ScreenKeyboard
        onKeyPress={onKeyPressed}
        usedCharacters={Array.from(wordsState.usedCharacters)}
      />
    </div>
  );
};
