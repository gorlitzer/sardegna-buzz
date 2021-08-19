import { Link } from "react-router-dom";

import SquareSVG from "../SquareSVG";

// redux imports
import { useSelector } from "react-redux";

const Body = () => {
  const buzz_state = useSelector((state) => state.buzz); // redux state getter

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
          <h4>Earned points:&nbsp;{buzz_state.round_points} </h4>
        </li>
      </ul>
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
