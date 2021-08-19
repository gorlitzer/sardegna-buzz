import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import "./style.scss";
// redux imports
import { useDispatch } from "react-redux";
import { cleanStates } from "../../redux/actions/game_actions";
import { cleanNewRecord } from "../../redux/actions/leaderboard_actions";

const Landing = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.clear();
    dispatch(cleanStates());
    dispatch(cleanNewRecord());
  }, []);

  return (
    <div className="landing-component">
      <button className="button">
        <Link to="/game">START GAME</Link>
      </button>
      <button className="button">
        <Link to="/leaderboard">VIEW LEADERBOARD</Link>
      </button>
    </div>
  );
};

export default Landing;
