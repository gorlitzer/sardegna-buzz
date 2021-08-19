import React from "react";

import { useSelector } from "react-redux";
import useStickyState from "../../hooks/useStickyState";

import ModalComponents from "./ModalComponents";

import "./style.scss";

const Modal = ({ title, show }) => {
  const buzz_state = useSelector((state) => state.buzz); // redux state getter

  const [currentScore, setCurrentScore] = useStickyState(0, "currentScore"); // custom hook to store in localstorage

  const titleColor = title === "SUCCESS" ? "green" : "red";

  const startNewRound = async () => {
    const newScore = currentScore + buzz_state.round_points;
    setCurrentScore(newScore); // 1. save current score in localstorage
    window.location.reload(); // 2. reload page
  };

  const tryAgain = () => { 
    localStorage.clear();
    window.location.reload();
  }

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
        <ModalComponents.Footer title={title} startNewRound={startNewRound} tryAgain={tryAgain}/>

      </div>
    </div>
  );
};

export default Modal;
