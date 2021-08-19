import React, { useEffect } from 'react';
import { Link } from "react-router-dom";

// redux imports
import { useSelector, useDispatch } from "react-redux";
import { cleanNewRecord } from "../../redux/actions/leaderboard_actions";

import "./style.scss";

const Leaderboard = () => {
  const dispatch = useDispatch();

  const leaderboar_state = useSelector((state) => state.board); // redux state getter

  useEffect(() => {
    localStorage.clear();
    dispatch(cleanNewRecord());
  }, []);

  return (
    <div className="leaderboard-component">
      <table>
        <thead>
          <tr>
            <th>PLAYER</th>
            <th>BEST SCORE</th>
          </tr>
        </thead>
        {leaderboar_state.topTen.map((item, i) => (
          <tbody key={i}>
            <tr>
              <td>{item.name}</td>
              <td>{item.score}</td>
            </tr>
          </tbody>
        ))}
      </table>
      <h3>
        <Link to="/">← EXIT</Link>
      </h3>
    </div>
  );
};

export default Leaderboard;
