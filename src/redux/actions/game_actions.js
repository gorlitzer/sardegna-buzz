import { CLEAN_STATE, START_GAME } from "../constants/types";

export const cleanStates = () => {
  return {
    type: CLEAN_STATE,
  };
};

export const startNewGame = (curr_color) => {
  return {
    type: START_GAME,
    color: curr_color,
  };
};