import { Link } from "react-router-dom";

import BuzzSVG from "../BuzzSVG";
import Countdown from "../Countdown";

// redux imports
import { useSelector, useDispatch } from "react-redux";
import { onClickBuzz } from "../../redux/actions/game_actions";

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

const GameComponents = {
  UIelements,
  Buzzlight,
  BuzzButtons,
};

export default GameComponents;
