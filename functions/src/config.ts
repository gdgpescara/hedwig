import {
  cert,
  getApps,
  initializeApp,
  ServiceAccount,
} from "firebase-admin/app";
import * as dotenv from "dotenv";

dotenv.config({ path: "../.env" });
const serviceAccount = JSON.parse(
  process.env.PUBLIC_FIREBASE_SERVICE_ACCOUNT || "{}",
);

const initializeFirebaseApp = () => {
  if (getApps().length === 0) {
    initializeApp({
      credential: cert(serviceAccount as ServiceAccount),
      databaseURL: process.env.FIREBASE_DATABASE_URL,
    });
  }
};

const projectId = serviceAccount.project_id;

const functionsRegion = process.env.PUBLIC_FIREBASE_FUNCTIONS_REGION || "";

export { initializeFirebaseApp, projectId, functionsRegion };
