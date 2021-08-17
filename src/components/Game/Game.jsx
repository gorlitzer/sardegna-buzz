import { Link } from "react-router-dom";
import BuzzSVG from "../BuzzSVG";

import "./style.scss";

const Game = () => {
  const timerHelper = (min, max) => {
    return (Math.random() * (max - min + 1) + min) / 10;
  };

  return (
    <div className="game-component">
      <div className="helpers">
        <h3>
          <Link to="/">← EXIT</Link>
        </h3>
        <h3>100</h3>
      </div>
      <div className="helpers">
        <h3 style={{ color: "red" }}>{timerHelper(5, 15)}</h3>
      </div>
      <div className="buzz">
        <BuzzSVG infill={"#e0e0e0"} />
      </div>
      <div className="flex-row">
        <div className="buzz-button">
          <BuzzSVG className="buzz-button" infill={"#ff0000"} />
        </div>
        <div className="buzz-button">
          <BuzzSVG className="buzz-button" infill={"#0037ff"} />
        </div>
        <div className="buzz-button">
          <BuzzSVG className="buzz-button" infill={"#10ff00"} />
        </div>
        <div className="buzz-button">
          <BuzzSVG className="buzz-button" infill={"#e5de10"} />
        </div>
      </div>
    </div>
  );
};

export default Game;
