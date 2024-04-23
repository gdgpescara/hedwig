const { getAuth } = require("firebase-admin/auth");
const { rl } = require("../utilities/read-line");

const setCustomClaim = (claim, uid) => {
  return getAuth().setCustomUserClaims(uid, { [claim]: true });
};

const action = async () => {
  console.log(
    "\x1b[36m",
    `
  ╔═╗┬─┐┌─┐┌─┐┌┬┐┌─┐  ┌─┐┬─┐┌─┐┌─┐┌┐┌┬┌─┐┌─┐┬─┐  ┌─┐┌─┐┌─┐┌─┐┬ ┬┌┐┌┌┬┐
  ║  ├┬┘├┤ ├─┤ │ ├┤   │ │├┬┘│ ┬├─┤││││┌─┘├┤ ├┬┘  ├─┤│  │  │ ││ ││││ │ 
  ╚═╝┴└─└─┘┴ ┴ ┴ └─┘  └─┘┴└─└─┘┴ ┴┘└┘┴└─┘└─┘┴└─  ┴ ┴└─┘└─┘└─┘└─┘┘└┘ ┴ 
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
    const user = await getAuth().createUser({
      email,
      password,
      displayName,
    });

    await setCustomClaim("organizer", user.uid);

    const verifyEmailLink =
      await getAuth().generateEmailVerificationLink(email);

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

const createOrganizerAccount = {
  key: "createOrganizerAccount",
  description: "\x1b[1mCreate organizer account\x1b[0m",
  execute: action,
};

module.exports = {
  createOrganizerAccount,
};
