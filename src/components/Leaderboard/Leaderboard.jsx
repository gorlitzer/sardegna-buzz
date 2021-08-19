import { Link } from "react-router-dom";

// redux imports
import { useSelector } from "react-redux";

import "./style.scss";

const Leaderboard = () => {
  const leaderboar_state = useSelector((state) => state.board); // redux state getter

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
          <tbody key={item.id}>
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
