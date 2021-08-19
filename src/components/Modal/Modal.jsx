import React from "react";
import { Link } from "react-router-dom";

import SquareSVG from "../SquareSVG";

import { useSelector } from "react-redux";
import useStickyState from "../../hooks/useStickyState";

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
        <section className="modal-body">
          <ul>
            <li>
              <h4>Target time:&nbsp;{buzz_state.countdown_timer} ms </h4>
            </li>
            <li className="flex-list">
              <h4>Target color: </h4>
              <SquareSVG infill={buzz_state.color} />
            </li>
            <li>
              <h4>
                Your time:&nbsp;
                {buzz_state.countdown_timer - buzz_state.click_time ||
                  buzz_state.countdown_timer + 1}
                ms
              </h4>
            </li>
            <li className="flex-list">
              <h4>Your color:</h4>
              <SquareSVG infill={buzz_state.choosen_color ?? "#e0e0e0"} />
            </li>
            <li>
              <h4>Earned points:&nbsp;{buzz_state.round_points} </h4>
            </li>
          </ul>
        </section>
        {/* FOOTER */}
        <div className="modal-footer">
          {title === "SUCCESS" ? (
            <button className="modal-button" onClick={() => startNewRound()}>
              <h2>
                <span>NEXT LAP →</span>
              </h2>
            </button>
          ) : (
            <>
              <button className="modal-button">
                <h2>
                  <Link to="/">← GO BACK</Link>
                </h2>
              </button>
              <button
                className="modal-button"
                onClick={() => tryAgain()}
              >
                <h2>
                  <span>TRY AGAIN ⟳</span>
                </h2>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
