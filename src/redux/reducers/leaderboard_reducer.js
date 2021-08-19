import { SET_LEADERBOARD, UPDATE_LEADERBOARD } from "../constants/types";

const initialState = {
  topTen: [],
  isRecord: false
};

export function leaderboard_reducer(state = initialState, action) {
  switch (action.type) {
    // Get leaderboard from external resource
    case SET_LEADERBOARD:
      return {
        ...state,
        topTen: action.payload,
      };
    case UPDATE_LEADERBOARD:
      let isRecord = false;
      const newTopTen = state.topTen; // new topTen object
      const newPlayer = {
        id: 10,
        name: action.name,
        score: parseInt(action.score),
      };
      // 1. check for index player
      for (var i in newTopTen) {
        // iterate through topTen array
        if (newTopTen[i].score <= action.score) {
          // find the right position and assign index
          newPlayer.id = parseInt(i);
          break; //Stop this loop, we found it!
        }
      }
      // 2. check for new personal record
      for (var i in newTopTen) {
        if (newTopTen[i].name === action.name.toUpperCase()) {
          isRecord = true
          break;
        }
      }
      newTopTen[newPlayer.id].name = action.name.toUpperCase();
      newTopTen[newPlayer.id].score = parseInt(action.score);
      return {
        ...state,
        topTen: newTopTen,
        isRecord: isRecord
      };
    default:
      return state;
  }
}
