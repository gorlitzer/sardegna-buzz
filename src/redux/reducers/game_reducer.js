import {
  CLEAN_STATE,
  START_GAME,
  HANDLE_TIME,
  GAME_OVER,
  TOGGLE_MODAL,
  STOP_TIMER,
} from "../constants/types";

const initialState = {
  color: null,
  is_playing: false,
  countdown_timer: 0,
  game_over: false,
  show_modal: false,
  winning: false,
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
    // Click buzz button handler
    case STOP_TIMER:
      if (action.choosen_color === state.color) {
        return {
          ...state,
          is_playing: false,
          winning: true,
          current_level: state.current_level + 1,
          show_modal: true,
        };
      } else {
        return {
          ...state,
          is_playing: false,
          show_modal: true,
        };
      }
    // Clean up states
    case CLEAN_STATE:
      return initialState;
    default:
      return state;
  }
}
