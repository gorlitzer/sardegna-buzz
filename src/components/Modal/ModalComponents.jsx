import React, { useState } from "react";
import { Link } from "react-router-dom";

import SquareSVG from "../SquareSVG";

// redux imports
import { useSelector, useDispatch } from "react-redux";
import { updateLeaderboard } from "../../redux/actions/leaderboard_actions";

const Body = ({ title }) => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const [wizardShow, setWizardShow] = useState(false);

  const buzz_state = useSelector((state) => state.buzz); // buzz states
  const leaderboard_state = useSelector((state) => state.board); // buzz states

  const score = localStorage.getItem("currentScore"); // current score

  const onChangeHandler = (event) => {
    setInputValue(event.target.value);
  };

  const onNameSubmit = (event) => {
    event.preventDefault();
    dispatch(updateLeaderboard(inputValue, score));
    setWizardShow(!wizardShow);
  };

  return (
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
          {title === "SUCCESS" ? (
            <h4>Earned points:&nbsp;{buzz_state.round_points} </h4>
          ) : (
            <h4>Total score:&nbsp;{score} </h4>
          )}
        </li>
      </ul>
      {title !== "SUCCESS" && score > leaderboard_state.topTen[9].score ? (
        <div className="notify">
          {/* STEP 1 */}
          {wizardShow ? (
            <button className="modal-button">
              {leaderboard_state.isRecord ? (
                <Link to="/leaderboard">
                  <h2>
                    It is a <span className="anim">RECORD!!!</span>
                  </h2>
                  <h5>Click to go to leaderboard</h5>
                </Link>
              ) : (
                <h4>
                  <Link to="/leaderboard">← GO TO LEADERBOARD</Link>
                </h4>
              )}
            </button>
          ) : (
            <>
              <h4>Top 10 entry:</h4>
              <div className="item">
                <input
                  type="text"
                  name="name"
                  maxLength={3}
                  autoComplete="off"
                  placeholder="3 Letter Name"
                  onChange={onChangeHandler}
                  value={inputValue}
                />
                <button onClick={onNameSubmit}>Submit</button>
              </div>
            </>
          )}
        </div>
      ) : (
        ""
      )}
    </section>
  );
};

const Footer = ({ title, startNewRound, tryAgain }) => {
  return (
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
          <button className="modal-button" onClick={() => tryAgain()}>
            <h2>
              <span>TRY AGAIN ⟳</span>
            </h2>
          </button>
        </>
      )}
    </div>
  );
};

const ModalComponents = {
  Body,
  Footer,
};

export default ModalComponents;
