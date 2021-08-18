import React, { useState } from "react";
import { useEffect } from "react";
import useInterval from "../../hooks/useInterval";

// redux imports
import { useSelector, useDispatch } from "react-redux";
import { gameOver } from "../../redux/actions/game_actions";

// forked codepen - https://codesandbox.io/s/24xmm6n530?file=/src/index.js
// stackoverflow - https://stackoverflow.com/a/55748441

const Countdown = ({ value, toggleModal }) => {
  const [prevTime, setPrevTime] = useState(null);
  const [timeInMilliseconds, setTimeInMilliseconds] = useState(value);
  const [time, setTime] = useState(null);

  const buzz_state = useSelector((state) => state.buzz); // redux state getter
  const dispatch = useDispatch(); // initialize dispatcher

  useEffect(() => {
    setTimeInMilliseconds(value);
  }, [value]);

  useInterval(
    () => {
      let prev = prevTime ? prevTime : Date.now();
      let diffTime = Date.now() - prev; // delta T con tick precedente
      let newMilliTime = timeInMilliseconds - diffTime; // calcolo differenziale su valore parametro
      let newTime = toTime(newMilliTime);
      setPrevTime(Date.now());
      setTimeInMilliseconds(newMilliTime);
      setTime(newTime);
      if (newMilliTime <= 0) {
        // non sempre è preciso, lo step potrebbe sorpassare lo zero
        setPrevTime(null);
        dispatch(gameOver());
        toggleModal();
      }
    },
    buzz_state.is_playing ? 10 : null // per mettere lo step in pausa
  );

  const toTime = (time) => {
    let milliseconds = parseInt(time % 1000),
      seconds = Math.floor((time / 1000) % 60);

    return {
      milliseconds,
      seconds,
    };
  };

  return (
    <div style={{ height: "50px" }}>
      {time && (
        <h2
          style={{ color: "red" }}
        >{`${time.seconds}.${time.milliseconds}`}</h2>
      )}
    </div>
  );
};

export default Countdown;
