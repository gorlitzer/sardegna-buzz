import React, { useState } from "react";
import { useEffect } from "react";

import Modal from "../Modal";
import GameComponents from "./GameComponents";

// redux imports
import { useSelector, useDispatch } from "react-redux";
import {
  startNewGame,
  setIsPlaying,
  setModal,
} from "../../redux/actions/game_actions";

// service import
import game_services from "../../services/game_services";
// hooks import
import useStickyState from "../../hooks/useStickyState";

import "./style.scss";

const Game = () => {
  const dispatch = useDispatch();
  const buzz_state = useSelector((state) => state.buzz); // redux state getter
  const [time, setTime] = useState(null); // parent component state for Countdown and BuzzButtons childs

  const [currentScore, setCurrentScore] = useStickyState(0, "currentScore"); // custom hook to store score localstorage
  const [currentTimer, setCurrentTimer] = useStickyState(0, "currentTimer"); // custom hook to store timer localstorage

  // helper function to choose between random delay or (settled timer - 0.2s)
  const getTimer = (delay) => {
    if (currentTimer === 0) {
      return delay * 100;
    } else if (currentTimer === null) {
      return delay * 100;
    } else {
      return currentTimer;
    }
  };

  useEffect(() => {
    // 1. calculate delay (range 0.5-1.5)
    const delay = game_services.getRandomTimer(5, 15);
    //console.log('current delay (ms)', delay * 100)

    // 2. dispatch 'start game' action after timeout
    const timer = setTimeout(async () => {
      const curr_color = await game_services.getRandomColor();
      dispatch(startNewGame(curr_color, getTimer(delay)));
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
      <GameComponents.UIelements
        toggleModal={() => dispatch(setModal())}
        time={time}
        setTime={setTime}
      />
      <GameComponents.Buzzlight />
      <GameComponents.BuzzButtons time={time} />
      <Modal
        show={buzz_state.show_modal}
        title={getCorrectTitle()}
        setCurrentScore={setCurrentScore}
        currentScore={currentScore}
        setCurrentTimer={setCurrentTimer}
      />
    </div>
  );
};

export default Game;
