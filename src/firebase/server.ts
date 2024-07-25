import type { ServiceAccount } from "firebase-admin";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const activeApps = getApps();
const serviceAccount = JSON.parse(
  import.meta.env.PUBLIC_FIREBASE_SERVICE_ACCOUNT || "{}",
);

export const app =
  activeApps.length === 0
    ? initializeApp({
        credential: cert(serviceAccount as ServiceAccount),
      })
    : activeApps[0];

export const auth = getAuth(app);
export const firestoreInstance = getFirestore(app);
