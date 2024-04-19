const loading = require("loading-cli");

const loader = loading({
  color: "blue",
  interval: 200,
  frames: [".", "o", "O", "°", "O", "o", "."],
});

module.exports = {
  loader,
};
