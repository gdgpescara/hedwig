import { initializeApp } from "firebase/app";

const firebaseConfig = JSON.parse(import.meta.env.PUBLIC_FIREBASE_CONFIG || {});

export const app = initializeApp(firebaseConfig);