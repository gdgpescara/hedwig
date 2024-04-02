import * as functions from "firebase-functions";
import {onUserCreation} from "../../services/on-user-craetion";

const functionsRegion = process.env.FIREBASE_FUNCTIONS_REGION || "";

export const onCreate = functions
  .region(functionsRegion)
  .auth.user()
  .onCreate(async (user) => {
    await onUserCreation(user);
  });
