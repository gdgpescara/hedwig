import { getAuth } from "firebase-admin/auth";
import { CustomClaims, Roles } from "../models/user.types";

const decodeIdToken = async (idToken: string): Promise<string | null> => {
  try {
    if (idToken.startsWith("Bearer ")) idToken = idToken.slice(7);
    const decodedToken = await getAuth().verifyIdToken(idToken);
    return decodedToken.uid;
  } catch (error) {
    return null;
  }
};

const isOrganizer = async (uid: string): Promise<boolean> => {
  const user = await getAuth().getUser(uid);
  return user.customClaims?.organizer === true;
};

const userExists = async (uid: string) => {
  try {
    await getAuth().getUser(uid);
    return true;
  } catch (error) {
    return false;
  }
};

const updateUserRoles = async (uid: string, roles: CustomClaims) => {
  const rolesKeys = Object.keys(roles) as Roles[];
  for (const role of rolesKeys) {
    if (!roles[role]) {
      delete roles[role];
    }
  }
  await getAuth().setCustomUserClaims(uid, roles);
};

export { decodeIdToken, isOrganizer, userExists, updateUserRoles };
