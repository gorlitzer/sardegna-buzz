import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import BuzzSVG from "../BuzzSVG";
import Modal from "../Modal";

// redux imports
import { useSelector, useDispatch } from "react-redux";
import { startNewGame } from "../../redux/actions/game_actions";

// service imports
import game_services from "../../services/game_services";

import "./style.scss";

const Game = () => {
  const [modal, setModal] = useState(false); // modal boolean state

  const buzz_state = useSelector((state) => state.buzz); // redux state getter
  const dispatch = useDispatch(); // initialize dispatcher

  // async with useEffect hook - https://dev.to/danialdezfouli/what-s-wrong-with-the-async-function-in-useeffect-4jne
  useEffect(() => {
    // 1. calculate delay (range 0.5-1.5)
    const delay = game_services.getRandomTimer(5, 15); 
    console.log('current delay (ms)', delay * 100)
    
    // 2. dispatch 'start game' action after timeout
    const timer = setTimeout(async () => {  
      const curr_color = await game_services.getRandomColor();
      dispatch(startNewGame(curr_color));
    }, delay * 100); // {[5,15]*100}=[500,1500] (random number range)
    
    // Cleanup timeout 
    return () => clearTimeout(timer);
  }, []);

  const toggle = () => setModal(!modal); // toggle modal true or false

  return (
    <div className="game-component">
      {/* Back button and score view - UI elements */}
      <div className="helpers">
        <h3>
          <Link to="/">← EXIT</Link>
        </h3>
        <h3>100</h3>
      </div>
      <div className="helpers">
        <h3 style={{ color: "red" }}>{buzz_state.current_timer}</h3>
      </div>
      {/* Buzz-light */}
      <div className="buzz">
        <BuzzSVG infill={buzz_state.color ?? '#e0e0e0'} />
      </div>
      {/* Buzz input buttons */}
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
      {/* Custom modal */}
      <Modal show={modal} onClose={() => toggle(false)} />
    </div>
  );
};

export default Game;
