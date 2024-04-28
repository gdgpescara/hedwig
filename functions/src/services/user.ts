import { getAuth } from "firebase-admin/auth";
import { CustomClaims, Roles } from "../models/user.types";

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

export { userExists, updateUserRoles };
