import { SET_LEADERBOARD } from "../constants/types";

const initialState = {
  topTen: []
};

export function leaderboard_reducer(state = initialState, action) {
  switch (action.type) {
    // Get leaderboard from external resource
    case SET_LEADERBOARD:
      return {
        ...state,
        topTen: action.payload
      };
    default:
      return state;
  }
}
