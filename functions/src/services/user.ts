import { getAuth } from "firebase-admin/auth";

export const addUserRole = async (uid: string, role: string) => {
  const user = await getAuth().getUser(uid);
  if (user.customClaims && user.customClaims[role]) {
    return;
  }
  await getAuth().setCustomUserClaims(uid, {
    [role]: true,
  });
};

export const removeUserRole = async (uid: string, role: string) => {
  const user = await getAuth().getUser(uid);
  if (!user.customClaims || !user.customClaims[role]) {
    return;
  }
  const newCustomClaims = { ...user.customClaims };
  delete newCustomClaims[role];
  await getAuth().setCustomUserClaims(uid, newCustomClaims);
};
