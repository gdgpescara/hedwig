import { initializeApp } from "firebase/app";
import { firebaseClientConfigSchema } from "./utils";
import firebaseConfigJSON from "../../firebase.client.json";

const firebaseConfig = firebaseClientConfigSchema.parse(firebaseConfigJSON);

export const app = initializeApp(firebaseConfig);
