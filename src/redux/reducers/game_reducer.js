import { CLEAN_STATE, START_GAME } from "../constants/types";

const initialState = {
  color: null,
  is_playing: false,
  countdown_timer: 3000
};

export function game_reducer(state = initialState, action) {
  switch (action.type) {
    // Start game case: set color and current timer
    case START_GAME:
      return {
        ...state,
        color: action.color,
        is_playing: true,
      };
    // Clean up states
    case CLEAN_STATE:
      return initialState;
    default:
      return state;
  }
}
