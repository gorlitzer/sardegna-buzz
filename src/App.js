import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./components/Header";
import Home from './components/Home';
import Game from './components/Game';
import Leaderboard from './components/Leaderboard';

function App() {
  return (
    <Router>
        <Header />
        <div className='container'>
            <Switch>
              <Route exact path='/' component={Home} /> 
              <Route exact path='/game' component={Game} /> 
              <Route exact path='/leaderboard' component={Leaderboard} /> 
            </Switch>
         </div>
    </Router>
  );
}

export default App;
