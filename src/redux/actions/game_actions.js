import { CLEAN_STATE, START_GAME, HANDLE_TIME } from "../constants/types";

export const cleanStates = () => {
  return {
    type: CLEAN_STATE,
  };
};


export const setIsPlaying = () => {
  return {
    type: HANDLE_TIME,
  };
};

export const startNewGame = (curr_color, curr_timer) => {
  return {
    type: START_GAME,
    color: curr_color,
    countdown_timer: curr_timer
  };
};