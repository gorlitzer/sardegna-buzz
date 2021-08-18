// article: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
// codepen: https://gist.github.com/EduVencovsky/466eae6c71c7021a86c3bd5afa6bfcc4
// stackoverflow: https://stackoverflow.com/a/55748441

import { useEffect, useRef } from "react";

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default useInterval;

