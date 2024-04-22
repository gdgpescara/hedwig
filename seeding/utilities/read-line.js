const rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl._writeToOutput = function _writeToOutput(stringToWrite) {
  if (rl.stdoutMuted) rl.output.write("*");
  else rl.output.write(stringToWrite);
};

module.exports = {
  rl,
};
