import { Link } from "react-router-dom";

import "./style.scss";

const Home = () => {
  return (
    <div className="home-component">
      <button className="button">
        <Link to="/game">START GAME</Link>
      </button>
      <button className="button">
        <Link to="/leaderboard">VIEW LEADERBOARD</Link>
      </button>
    </div>
  );
};

export default Home;
