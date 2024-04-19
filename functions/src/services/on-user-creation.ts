import { getFirestore } from "firebase-admin/firestore";
import { UserRecord } from "firebase-admin/auth";

export const onUserCreation = async (user: UserRecord) => {
  const userRef = getFirestore().collection("users").doc(user.uid);
  await userRef.set({
    email: user.email,
    displayName: user.displayName,
  });
};
