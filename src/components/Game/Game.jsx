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
      <GameComponents.UIelements
        toggleModal={() => dispatch(setModal())}
        time={time}
        setTime={setTime}
      />
      <GameComponents.Buzzlight />
      <GameComponents.BuzzButtons time={time} />
      <Modal show={buzz_state.show_modal} title={getCorrectTitle()} />
    </div>
  );
};

export default Game;
