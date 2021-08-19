import {
  CLEAN_STATE,
  START_GAME,
  HANDLE_TIME,
  GAME_OVER,
  TOGGLE_MODAL,
  STOP_GAME
} from "../constants/types";

const initialState = {
  color: null, // buzz random color
  is_playing: false, // round started
  countdown_timer: 0, // settled timer
  click_time: 0, // elapsed time since click
  game_over: false, // game over
  show_modal: false, // toggle modal
  winning: false, // winning round
  choosen_color: null, // clicked color
  current_level: 0, // level helper for 'countdown_timer' decrease
  score: 0, // current player score
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
    // Game over handler - sets current click time
    case GAME_OVER:
      return {
        ...state,
        is_playing: false,
        game_over: true,
        click_time: action.time,
      };
    // Game modal handler
    case TOGGLE_MODAL:
      return {
        ...state,
        show_modal: !state.show_modal,
      };
    // Click buzz button handler
    case STOP_GAME:
      if (action.choosen_color === state.color) {
        return {
          ...state,
          is_playing: false,
          winning: true,
          current_level: state.current_level + 1,
          show_modal: true,
          click_time: action.click_time,
          choosen_color: action.choosen_color
        };
      } else {
        return {
          ...state,
          is_playing: false,
          show_modal: true,
          click_time: action.click_time,
          choosen_color: action.choosen_color
        };
      }
    // Clean up states
    case CLEAN_STATE:
      return initialState;
    default:
      return state;
  }
}
