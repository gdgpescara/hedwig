import type { ServiceAccount } from "firebase-admin";
import { initializeApp, cert } from "firebase-admin/app";
import serviceAccountJSON from "../../firebase.server.json";
import { firebaseServerConfigSchema } from "./utils";

const serviceAccount = firebaseServerConfigSchema.parse(serviceAccountJSON)

export const app = initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
});
