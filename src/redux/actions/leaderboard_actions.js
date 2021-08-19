export const setLeaderboard = (array) => {
  return {
    type: SET_LEADERBOARD,
    payload: array,
  };
};

// Handle HTTP errors since fetch won't.
const handleErrors = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};

export const getLeaderboardAsync = () => {
  return (dispatch) => {
    return fetch("/") // 1. get data - hardcoded endpoint API from personal nodeJS server
      .then(handleErrors) // 2. handle errors for fetch call
      .then((res) => res.json()) // 3. parse json object
      .then((json) => {
        dispatch(setLeaderboard(json.products));
      }) // 4. set current data
      .catch((error) => console.log(error));
  };
};
