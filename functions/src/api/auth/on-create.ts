import { functionsRegion } from "../../config";
import { onUserCreation } from "../../services/on-user-creation";
import * as functions from "firebase-functions";

const onCreate = functions
  .region(functionsRegion)
  .auth.user()
  .onCreate(async (user) => {
    await onUserCreation(user);
  });

export default onCreate;
