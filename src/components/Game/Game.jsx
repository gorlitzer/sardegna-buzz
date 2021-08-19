import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import BuzzSVG from "../BuzzSVG";
import SquareSVG from "../SquareSVG";

import Modal from "../Modal";
import Countdown from "../Countdown";

// redux imports
import { useSelector, useDispatch } from "react-redux";
import {
  startNewGame,
  setIsPlaying,
  onClickBuzz,
  setModal,
} from "../../redux/actions/game_actions";

// service imports
import game_services from "../../services/game_services";

import "./style.scss";

const Game = () => {
  const dispatch = useDispatch();
  const buzz_state = useSelector((state) => state.buzz); // redux state getter
  const [time, setTime] = useState(null); // parent component state for Countdown and BuzzButtons childs

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

  const getCorrectTitle = () => {
    if (buzz_state.winning === true) {
      return "SUCCESS";
    } else {
      return "GAME OVER";
    }
  };

  return (
    <div className="game-component">
      <UIelements
        toggleModal={() => dispatch(setModal())}
        time={time}
        setTime={setTime}
      />
      <Buzzlight />
      <BuzzButtons time={time} />
      {/* Custom modal */}
      <Modal show={buzz_state.show_modal} title={getCorrectTitle()}>
        {
          <ul>
            <li>
              <h4>Target time: {buzz_state.countdown_timer} ms </h4>
            </li>
            <li className="flex-list">
              <h4>Target color: </h4>
              <SquareSVG infill={buzz_state.color} />
            </li>
            <li>
              <h4>Your time: {buzz_state.click_time ? 'yes' : 'no'} ms</h4>
            </li>
            <li className="flex-list">
              <h4>Your color:</h4>
              <SquareSVG infill={buzz_state.curr_color ?? "#e0e0e0"} />
            </li>
            <li>
              <h4>Current score: {buzz_state.score} </h4>
            </li>
          </ul>
        }
      </Modal>
    </div>
  );
};

const UIelements = ({ toggleModal, time, setTime }) => {
  const buzz_state = useSelector((state) => state.buzz); // redux state getter

  return (
    <div>
      {/* Back button + Score view + Countdown */}
      <div className="helper-container">
        <h3>
          <Link to="/">← EXIT</Link>
        </h3>
        <h3>SCORE: 0</h3>
      </div>
      <div className="helper-container">
        <Countdown
          value={buzz_state.countdown_timer}
          toggleModal={toggleModal}
          time={time}
          setTime={setTime}
        />
      </div>
    </div>
  );
};

const Buzzlight = () => {
  const buzz_state = useSelector((state) => state.buzz); // redux state getter

  return (
    <div className="buzz">
      {/* Buzz-light */}
      <BuzzSVG infill={buzz_state.color ?? "#e0e0e0"} />
    </div>
  );
};

// Memoized functional stateless component
const BuzzButtons = ({ time }) => {
  const dispatch = useDispatch(); // initialize dispatcher
  const buzz_state = useSelector((state) => state.buzz); // redux state getter

  const buzz_buttons = [
    {
      id: 1,
      tag: "red",
      infill: "#ff0000",
      onClick: () => dispatch(onClickBuzz("#ff0000", time)),
    },
    {
      id: 2,
      tag: "blue",
      infill: "#0037ff",
      onClick: () => dispatch(onClickBuzz("#0037ff", time)),
    },
    {
      id: 3,
      tag: "green",
      infill: "#10ff00",
      onClick: () => dispatch(onClickBuzz("#10ff00", time)),
    },
    {
      id: 4,
      tag: "yellow",
      infill: "#e5de10",
      onClick: () => dispatch(onClickBuzz("#e5de10", time)),
    },
  ];

  // Schwartzian transform JavaScript implementation - https://stackoverflow.com/a/46545530
  // NON UTILIZZATA AL MOMENTO PERCHE MANDA IN PALLA IL RENDER
  const shuffled = buzz_buttons
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  return (
    <div className="flex-row">
      {/* Buzz input buttons */}
      {buzz_buttons.map((item, i) => (
        <div
          className="buzz-button"
          key={item.id}
          onClick={item.onClick}
          disabled={!buzz_state.is_playing}
        >
          <BuzzSVG className="buzz-button" infill={item.infill} />
        </div>
      ))}
    </div>
  );
};

export default Game;
