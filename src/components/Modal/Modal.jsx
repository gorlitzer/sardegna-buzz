import React from "react";
import { Link } from "react-router-dom";

import SquareSVG from "../SquareSVG";

import { useSelector } from "react-redux";

import "./style.scss";

const Modal = ({ title, show }) => {
  const buzz_state = useSelector((state) => state.buzz); // redux state getter

  const titleColor = title === "SUCCESS" ? "green" : "red";

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
              <h4>Earned points:&nbsp;{buzz_state.score} </h4>
            </li>
          </ul>
        </section>
        {/* FOOTER */}
        <div className="modal-footer">
          <button className="modal-button">
            <h2>
              <Link to="/">← GO BACK</Link>
            </h2>
          </button>
          <button
            className="modal-button"
            onClick={() => window.location.reload()}
          >
            <h2>
              <a>TRY AGAIN ⟳</a>
            </h2>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
