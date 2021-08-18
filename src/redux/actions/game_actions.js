import {
  CLEAN_STATE,
  START_GAME,
  HANDLE_TIME,
  GAME_OVER,
  TOGGLE_MODAL,
  STOP_TIMER
} from "../constants/types";

export const cleanStates = () => {
  return {
    type: CLEAN_STATE,
  };
};

export const gameOver = () => {
  return {
    type: GAME_OVER,
  };
};

export const setModal = () => {
  return {
    type: TOGGLE_MODAL,
  };
};

export const setIsPlaying = () => {
  return {
    type: HANDLE_TIME,
  };
};

export const onClickBuzz = (color) => {
  return {
    type: STOP_TIMER,
    choosen_color: color
  };
};

export const startNewGame = (curr_color, curr_timer) => {
  return {
    type: START_GAME,
    color: curr_color,
    countdown_timer: curr_timer,
  };
};
