import type { ServiceAccount } from "firebase-admin";
import { initializeApp, cert } from "firebase-admin/app";

const serviceAccount = JSON.parse(import.meta.env.PUBLIC_FIREBASE_SERVICE_ACCOUNT || {});

export const app = initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
});