const admin = require("firebase-admin");
require("dotenv").config({ path: "../.env" });

const initializeApp = () =>
  admin.initializeApp({
    credential: admin.credential.cert(
      JSON.parse(process.env.PUBLIC_FIREBASE_SERVICE_ACCOUNT || "{}"),
    ),
    databaseURL: process.env.FIREBASE_DATABASE_URL || "",
  });

module.exports = {
  initializeApp,
};
