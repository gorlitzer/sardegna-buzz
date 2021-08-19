const getRandomTimer = (min, max) => {
  var rand = Math.floor(Math.random() * (max - min + 1) + min); //Generate Random number between 5 - 15
  return rand;
};

const getRandomColor = () => {
  var colors = ["#ff0000", "#0037ff", "#10ff00", "#e5de10"]; // rosso, blu, verde, giallo
  var rand = colors[Math.floor(Math.random() * colors.length)];
  return rand;
};

const game_services = {
  getRandomTimer,
  getRandomColor,
};

export default game_services;
