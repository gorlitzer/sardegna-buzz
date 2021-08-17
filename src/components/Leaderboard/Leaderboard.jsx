import { Link } from "react-router-dom";

import "./style.scss";

const initialData = [
  { name: "FR0", score: 1000 },
  { name: "FR1", score: 2000 },
  { name: "FR2", score: 3000 },
  { name: "FR3", score: 4000 },
  { name: "FR4", score: 5000 },
  { name: "FR5", score: 6000 },
  { name: "FR6", score: 7000 },
  { name: "FR7", score: 8000 },
  { name: "FR8", score: 9000 },
  { name: "FR9", score: 10000 },
];

const Leaderboard = () => {
  return (
    <div className="leaderboard-component">
      <table>
        <thead>
          <tr>
            <th>PLAYER</th>
            <th>BEST SCORE</th>
          </tr>
        </thead>
        {initialData.map((item, i) => (
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
