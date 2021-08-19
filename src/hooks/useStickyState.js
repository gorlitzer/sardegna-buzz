import { useState, useEffect } from "react";
// article: https://www.joshwcomeau.com/react/persisting-react-state-in-localstorage/

const useStickyState = (defaultValue, key) => {
  const [value, setValue] = useState(() => {
    const stickyValue = window.localStorage.getItem(key);
    return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
  });
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
};

export default useStickyState;

// usage
// const [count, setCount] = useStickyState(0, "count");