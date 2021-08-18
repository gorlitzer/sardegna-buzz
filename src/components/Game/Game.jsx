import React, { useState, memo } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import BuzzSVG from "../BuzzSVG";
import Modal from "../Modal";
import Countdown from "../Countdown";

// redux imports
import { useSelector, useDispatch } from "react-redux";
import { startNewGame, setIsPlaying } from "../../redux/actions/game_actions";

// service imports
import game_services from "../../services/game_services";

import "./style.scss";

const Game = () => {
  const [modal, setModal] = useState(false); // modal boolean state
  const dispatch = useDispatch(); // initialize dispatcher

  useEffect(() => {
    // 1. calculate delay (range 0.5-1.5)
    const delay = game_services.getRandomTimer(5, 15);
    //console.log('current delay (ms)', delay * 100)

    // 2. dispatch 'start game' action after timeout
    const timer = setTimeout(async () => {
      const curr_color = await game_services.getRandomColor();
      dispatch(startNewGame(curr_color, delay * 100));
      dispatch(setIsPlaying());
    }, delay * 100); // {[5,15]*100}=[500,1500] (random number range)

    // Cleanup timeout
    return () => clearTimeout(timer);
  }, []);

  const toggle = () => setModal(!modal); // toggle modal true or false

  return (
    <div className="game-component">
      {/* Back button and score view - UI elements */}
      <UIelements toggleModal={() => toggle(false)} />
      {/* Buzz-light */}
      <Buzzlight />
      {/* Buzz input buttons */}
      <BuzzButtons />
      {/* Custom modal */}
      <Modal show={modal} onClose={() => toggle(false)} />
    </div>
  );
};

const UIelements = ({ toggleModal }) => {
  const buzz_state = useSelector((state) => state.buzz); // redux state getter

  return (
    <div>
      <div className="helper-container">
        <h3>
          <Link to="/">← EXIT</Link>
        </h3>
        <h3>SCORE: 100</h3>
      </div>
      <div className="helper-container">
        <Countdown
          value={buzz_state.countdown_timer}
          toggleModal={toggleModal}
        />
      </div>
    </div>
  );
};

const Buzzlight = () => {
  const buzz_state = useSelector((state) => state.buzz); // redux state getter

  return (
    <div className="buzz">
      <BuzzSVG infill={buzz_state.color ?? "#e0e0e0"} />
    </div>
  );
};

const BuzzButtons = memo(() => {

  const buzz_buttons = [
    {
      id: 1,
      tag: "red",
      infill: "#ff0000",
      onClick: () => console.log("red"),
    },
    {
      id: 2,
      tag: "blue",
      infill: "#0037ff",
      onClick: () => console.log("blue"),
    },
    {
      id: 3,
      tag: "green",
      infill: "#10ff00",
      onClick: () => console.log("green"),
    },
    {
      id: 4,
      tag: "yellow",
      infill: "#e5de10",
      onClick: () => console.log("yellow"),
    },
  ];

  // Schwartzian transform JavaScript implementation - https://stackoverflow.com/a/46545530
  const shuffled = buzz_buttons
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  return (
    <div className="flex-row">
      {shuffled.map((item, i) => (
        <div className="buzz-button" key={item.id} onClick={item.onClick}>
          <BuzzSVG className="buzz-button" infill={item.infill} />
        </div>
      ))}
    </div>
  );
})

export default Game;
