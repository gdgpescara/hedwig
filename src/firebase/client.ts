import { connectAuthEmulator, getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = JSON.parse(
  import.meta.env.PUBLIC_FIREBASE_CONFIG || "{}",
);

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

if (import.meta.env.DEV) {
  connectAuthEmulator(auth, "http://127.0.0.1:9099");
}
