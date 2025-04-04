export const WordsActionTypes = {
  SET_INITIAL_STATE: "setInitialState",
  ADD_GUESS: "addGuess",
  RESET_GAME_STATE: "resetGameState",
} as const;

export const GameStates = {
  IN_PROGRESS: "IN_PROGRESS",
  IS_SUCCESS: "IS_SUCCESS",
  IS_FAILURE: "IS_FAILURE",
} as const;
