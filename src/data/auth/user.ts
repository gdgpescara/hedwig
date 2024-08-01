import { auth } from "../../firebase/server";
import type { ServerResponse } from "../../models/server-response/server-response.type";
import type { CustomClaims, Roles } from "../../models/user/user.type";

const updateUserRoles = async (
  uid: string,
  roles: CustomClaims,
): Promise<ServerResponse<boolean, "auth/promote-user-to-organizer-error">> => {
  try {
    const rolesKeys = Object.keys(roles) as Roles[];
    for (const role of rolesKeys) {
      if (!roles[role]) {
        delete roles[role];
      }
    }
    await auth.setCustomUserClaims(uid, roles);
    return {
      status: "success",
      data: true,
    };
  } catch (error) {
    console.error(`Error promoting user ${uid} to organizer`, error);
    return {
      status: "error",
      data: {
        code: "auth/promote-user-to-organizer-error",
        message: `Error promoting user ${uid} to organizer`,
      },
    };
  }
};

export { updateUserRoles };
