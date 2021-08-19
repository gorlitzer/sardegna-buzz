import { useEffect } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./components/Header";
import Landing from "./components/Landing";
import Game from "./components/Game";
import Leaderboard from "./components/Leaderboard";

// redux imports
import { useDispatch } from "react-redux";
import { getLeaderboardAsync } from "./redux/actions/leaderboard_actions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLeaderboardAsync()); // fetch request to leaderboard endpoint
  }, []);
  return (
    <Router>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/game" component={Game} />
          <Route exact path="/leaderboard" component={Leaderboard} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
