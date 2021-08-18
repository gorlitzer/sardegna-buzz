import {
  CLEAN_STATE,
  START_GAME,
  HANDLE_TIME,
  GAME_OVER,
  TOGGLE_MODAL,
} from "../constants/types";

const initialState = {
  color: null,
  is_playing: false,
  countdown_timer: 0,
  game_over: false,
  show_modal: false,
  current_level: 0,
};

export function game_reducer(state = initialState, action) {
  switch (action.type) {
    // Start game case: set color and current timer
    case START_GAME:
      return {
        ...state,
        color: action.color,
        countdown_timer: action.countdown_timer,
      };
    // Set countdown state to 'is-running'
    case HANDLE_TIME:
      return {
        ...state,
        is_playing: !state.is_playing,
      };
    // Game over handler
    case GAME_OVER:
      return {
        ...state,
        is_playing: false,
        game_over: true,
      };
    // Game modal handler
    case TOGGLE_MODAL:
      return {
        ...state,
        show_modal: !state.show_modal,
      };
    // Clean up states
    case CLEAN_STATE:
      return initialState;
    default:
      return state;
  }
}
