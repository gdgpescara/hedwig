require("dotenv").config({ path: "../.env" });

const app = require("firebase-admin").initializeApp({
  credential: require("firebase-admin").credential.cert(
    JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || "{}"),
  ),
});

const rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl._writeToOutput = function _writeToOutput(stringToWrite) {
  if (rl.stdoutMuted) rl.output.write("*");
  else rl.output.write(stringToWrite);
};

const setCustomClaim = (claim, uid) => {
  return app.auth().setCustomUserClaims(uid, { [claim]: true });
};

const createOrganizerAccount = async () => {
  console.log(
    "\x1b[33m",
    `
    ██╗  ██╗███████╗██████╗ ██╗    ██╗██╗ ██████╗     ███████╗███████╗███████╗██████╗ ███████╗
    ██║  ██║██╔════╝██╔══██╗██║    ██║██║██╔════╝     ██╔════╝██╔════╝██╔════╝██╔══██╗██╔════╝
    ███████║█████╗  ██║  ██║██║ █╗ ██║██║██║  ███╗    ███████╗█████╗  █████╗  ██║  ██║███████╗
    ██╔══██║██╔══╝  ██║  ██║██║███╗██║██║██║   ██║    ╚════██║██╔══╝  ██╔══╝  ██║  ██║╚════██║
    ██║  ██║███████╗██████╔╝╚███╔███╔╝██║╚██████╔╝    ███████║███████╗███████╗██████╔╝███████║
    ╚═╝  ╚═╝╚══════╝╚═════╝  ╚══╝╚══╝ ╚═╝ ╚═════╝     ╚══════╝╚══════╝╚══════╝╚═════╝ ╚══════╝
                                                                                              
                                    CREATE ORGANIZER ACCOUNT

    `,
    "\x1b[0m",
  );
  const email = await new Promise((resolve) => {
    rl.question("Enter email: ", resolve);
  });
  const displayName = await new Promise((resolve) => {
    rl.question("Enter display name: ", resolve);
  });
  const password = await new Promise((resolve) => {
    rl.question("Enter password: ", resolve);
    rl.stdoutMuted = true;
  });

  try {
    const user = await app.auth().createUser({
      email,
      password,
      displayName,
    });

    await setCustomClaim("organizer", user.uid);

    const verifyEmailLink = await app
      .auth()
      .generateEmailVerificationLink(email);

    console.log(`
\x1b[32m
🎉 Organizer account configured successfully! 🎉
\x1b[0m
You can verify your email by clicking on the link below:\x1b[0m
\x1b[36m${verifyEmailLink}
  `);
  } catch (error) {
    console.error(
      "\x1b[31m",
      `

🚫 Error while configuring account: ${error.message} 🚫
      `,
      "\x1b[0m",
    );
  } finally {
    rl.close();
  }
};

createOrganizerAccount();
