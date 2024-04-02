import * as httpApi from "./api/http/api";
import * as authOnCreate from "./api/auth/on-create";
import {ServiceAccount, cert, initializeApp} from "firebase-admin/app";
import * as dotenv from "dotenv";

// load environment variables
dotenv.config({path: "../.env"});
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || "{}");

// initialize firebase app
export const app = initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
});

// export functions
exports.http_api = httpApi.default;
exports.onCreateUser = authOnCreate;
