var admin = require("firebase-admin");

const checkIfSeedWasExecuted = async (key) => {
  const snapshot = await admin.database().ref(`seeds/${key}`).once("value");
  return snapshot.exists();
};

const markSeedAsExecuted = async (key) => {
  await admin.database().ref(`seeds/${key}`).set("executed");
};

module.exports = {
  checkIfSeedWasExecuted,
  markSeedAsExecuted,
};
