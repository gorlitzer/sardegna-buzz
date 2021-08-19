import {
  CLEAN_STATE,
  START_GAME,
  HANDLE_TIME,
  GAME_OVER,
  TOGGLE_MODAL,
  STOP_GAME,
} from "../constants/types";

export const cleanStates = () => {
  return {
    type: CLEAN_STATE,
  };
};

export const gameOver = (time) => {
  return {
    type: GAME_OVER,
    current_time: time,
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

export const onClickBuzz = (color, time) => {
  return {
    type: STOP_GAME,
    choosen_color: color,
    click_time: time.milliseconds,
  };
};

export const startNewGame = (curr_color, curr_timer) => {
  return {
    type: START_GAME,
    color: curr_color,
    countdown_timer: curr_timer,
  };
};
