const { initializeApp } = require("./config");
const { seeds } = require("./seeds/seeds");
const { checkIfSeedWasExecuted } = require("./utilities/real-time-db");
const { exit } = require("process");

initializeApp();

const checkSeedingStatus = async () => {
  for (const seed of seeds) {
    const isExecuted = await checkIfSeedWasExecuted(seed.key);
    if (isExecuted) {
      console.log(`\x1b[0m✅ ${seed.description} was executed!\x1b[0m`);
    } else {
      console.log(`\x1b[0m❌ ${seed.description} was not executed!\x1b[0m`);
      exit(1);
    }
  }
};

checkSeedingStatus();
