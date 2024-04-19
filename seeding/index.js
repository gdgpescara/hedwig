const admin = require("firebase-admin");
const { loader } = require("./utilities/loader");
const {
  checkIfSeedWasExecuted,
  markSeedAsExecuted,
} = require("./utilities/real-time-db");
const { seeds } = require("./seeds/seeds");
const { exit } = require("process");

require("dotenv").config({ path: "../.env" });

admin.initializeApp({
  credential: admin.credential.cert(
    JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || "{}"),
  ),
  databaseURL: process.env.FIREBASE_DATABASE_URL || "",
});

const checkAndExecuteSeed = async (seed) => {
  loader.start(`Checking if ${seed.description} was executed...`);
  const isExecuted = await checkIfSeedWasExecuted(seed.key);
  loader.stop();
  if (!isExecuted) {
    await seed.execute();
    loader.start("Updating seed status...");
    await markSeedAsExecuted(seed.key);
    loader.stop();
    await checkAndExecuteSeed(seed);
  } else {
    console.log(`\x1b[0m✅ ${seed.description} was executed!\x1b[0m`);
  }
};

const startSeeding = async () => {
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

  console.log(`
\x1b[32mSeeding completed!\x1b[0m
`);
  exit();
};

startSeeding();
