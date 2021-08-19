import { SET_LEADERBOARD } from "../constants/types";

const axios = require("axios");

export const setLeaderboard = (array) => {
  return {
    type: SET_LEADERBOARD,
    payload: array,
  };
};

export const getLeaderboardAsync = () => {
  return (dispatch) => {
    return axios
      .get("https://sardegna-express.herokuapp.com/leaderboard") //get data - hardcoded endpoint API from personal nodeJS server
      .then(({ data }) => {
        dispatch(setLeaderboard(data));
      })
      .catch((error) => console.log(error));
  };
};
