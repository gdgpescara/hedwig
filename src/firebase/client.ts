import { initializeApp } from "firebase/app";

const firebaseConfig = JSON.parse(import.meta.env.FIREBASE_CONFIG || {});

export const app = initializeApp(firebaseConfig);