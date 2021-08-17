import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./components/Header";
import Landing from './components/Landing';
import Game from './components/Game';
import Leaderboard from './components/Leaderboard';

function App() {
  return (
    <Router>
        <Header />
        <div className='container'>
            <Switch>
              <Route exact path='/' component={Landing} /> 
              <Route exact path='/game' component={Game} /> 
              <Route exact path='/leaderboard' component={Leaderboard} /> 
            </Switch>
         </div>
    </Router>
  );
}

export default App;
