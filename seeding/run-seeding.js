const { loader } = require("./utilities/loader");
const {
  checkIfSeedWasExecuted,
  markSeedAsExecuted,
} = require("./utilities/real-time-db");
const { seeds } = require("./seeds/seeds");
const { exit } = require("process");
const { initializeApp } = require("./config");

initializeApp();

let someSeedFails = false;

const checkAndExecuteSeed = async (seed) => {
  loader.start(`Checking if ${seed.description} was executed...`);
  const isExecuted = await checkIfSeedWasExecuted(seed.key);
  loader.stop();
  if (!isExecuted) {
    try {
      await seed.execute();
    } catch (error) {
      someSeedFails = true;
      loader.stop();
      return;
    }
    loader.start("Updating seed status...");
    await markSeedAsExecuted(seed.key);
    loader.stop();
  }
  console.log(`\x1b[0m  ✅ ${seed.description} was executed!\x1b[0m`);
};

const startSeeding = async () => {
  someSeedFails = false;
  console.log(
    "\x1b[33m",
    `
  ██╗  ██╗███████╗██████╗ ██╗    ██╗██╗ ██████╗     ███████╗███████╗███████╗██████╗ ███████╗
  ██║  ██║██╔════╝██╔══██╗██║    ██║██║██╔════╝     ██╔════╝██╔════╝██╔════╝██╔══██╗██╔════╝
  ███████║█████╗  ██║  ██║██║ █╗ ██║██║██║  ███╗    ███████╗█████╗  █████╗  ██║  ██║███████╗
  ██╔══██║██╔══╝  ██║  ██║██║███╗██║██║██║   ██║    ╚════██║██╔══╝  ██╔══╝  ██║  ██║╚════██║
  ██║  ██║███████╗██████╔╝╚███╔███╔╝██║╚██████╔╝    ███████║███████╗███████╗██████╔╝███████║
  ╚═╝  ╚═╝╚══════╝╚═════╝  ╚══╝╚══╝ ╚═╝ ╚═════╝     ╚══════╝╚══════╝╚══════╝╚═════╝ ╚══════╝
                                                                                              
    `,
    "\x1b[0m",
  );

  for (const seed of seeds) {
    await checkAndExecuteSeed(seed);
  }

  if (someSeedFails) {
    console.log(
      "\x1b[38;2;255;165;0m",
      "Some seeds failed to execute.",
      "\x1b[0m",
    );
  } else {
    console.log("\x1b[32m", "All seeds executed successfully!", "\x1b[0m");
  }
  exit();
};

startSeeding();
