import React from "react";

import { useSelector } from "react-redux";

import ModalComponents from "./ModalComponents";

import "./style.scss";

const Modal = ({
  title,
  show,
  setCurrentScore,
  currentScore,
  setCurrentTimer,
}) => {
  const buzz_state = useSelector((state) => state.buzz); // redux state getter

  const titleColor = title === "SUCCESS" ? "green" : "red";

  const startNewRound = async () => {
    const newScore = currentScore + buzz_state.round_points;
    const newTimer = buzz_state.countdown_timer - 200; // 0.2 seconds
    setCurrentScore(newScore); // 1. save current score in localstorage
    if (newTimer >= buzz_state.countdown_timer / 5) {
      setCurrentTimer(newTimer); // 2. save current timer in localstorage until it reaches 1/5 initial timer
    }

    window.location.reload(); // 3. reload page
  };

  const tryAgain = () => {
    localStorage.clear();
    window.location.reload();
  };

  if (!show) {
    return null;
  }
  return (
    <div className="modal-component" /* onClick={props.onClose} */>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* HEADER */}
        <div className="modal-header">
          <h2 className={`modal-title ${titleColor}`}>{title}</h2>
        </div>
        {/*  BODY */}
        <ModalComponents.Body />
        {/* FOOTER */}
        <ModalComponents.Footer
          title={title}
          startNewRound={startNewRound}
          tryAgain={tryAgain}
        />
      </div>
    </div>
  );
};

export default Modal;
