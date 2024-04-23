import { ServiceAccount, cert, initializeApp } from "firebase-admin/app";
import * as dotenv from "dotenv";

// load environment variables
dotenv.config({ path: "../.env" });
const serviceAccount = JSON.parse(
  process.env.PUBLIC_FIREBASE_SERVICE_ACCOUNT || "{}",
);

// initialize firebase app
export const initialize = () =>
  initializeApp({
    credential: cert(serviceAccount as ServiceAccount),
  });

export const functionsRegion = process.env.FIREBASE_FUNCTIONS_REGION || "";
