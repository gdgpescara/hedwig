import type { ServiceAccount } from "firebase-admin";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

const activeApps = getApps();
const serviceAccount = JSON.parse(
  import.meta.env.PUBLIC_FIREBASE_SERVICE_ACCOUNT || "{}",
);

if (import.meta.env.DEV) {
  process.env.GCLOUD_PROJECT = "your-project-id";
  process.env.FIRESTORE_EMULATOR_HOST = "localhost:8080";
  process.env.FIREBASE_AUTH_EMULATOR_HOST = "localhost:9099";
  process.env.FIREBASE_STORAGE_EMULATOR_HOST = "localhost:9199";
}

export const app =
  activeApps.length === 0
    ? initializeApp({
        credential: cert(serviceAccount as ServiceAccount),
        storageBucket: import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET,
      })
    : activeApps[0];

export const auth = getAuth(app);
export const firestoreInstance = getFirestore(app);
export const bucket = getStorage(app).bucket();
