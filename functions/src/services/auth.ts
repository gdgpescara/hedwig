import { getAuth } from "firebase-admin/auth";

export const decodeIdToken = async (
  idToken: string,
): Promise<string | null> => {
  try {
    if (idToken.startsWith("Bearer ")) idToken = idToken.slice(7);
    const decodedToken = await getAuth().verifyIdToken(idToken);
    return decodedToken.uid;
  } catch (error) {
    return null;
  }
};

export const isOrganizer = async (uid: string): Promise<boolean> => {
  const user = await getAuth().getUser(uid);
  return user.customClaims?.organizer === true;
};
