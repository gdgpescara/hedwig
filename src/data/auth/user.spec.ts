import { test, describe, expect, beforeAll, afterAll } from "vitest";
import { auth } from "../../firebase/server";
import { updateUserRoles } from "./user";

describe("Auth User", () => {
  let uid: string;

  beforeAll(async () => {
    const user = await auth.createUser({
      displayName: "Test User",
      email: "test@test.it",
      password: "test123",
    });
    uid = user.uid;
  });

  afterAll(async () => {
    auth.deleteUser(uid);
  });

  test("Should promote user to organizer", async () => {
    const result = await updateUserRoles(uid, { organizer: true });
    expect(result).toMatchObject({
      status: "success",
      data: true,
    });
  });

  test("Should return an error if user does not exist", async () => {
    const result = await updateUserRoles("non-existing-user", {
      organizer: true,
    });
    expect(result).toMatchObject({
      status: "error",
      data: {
        code: "auth/promote-user-to-organizer-error",
        message: "Error promoting user non-existing-user to organizer",
      },
    });
  });

  test("Remove organizer role", async () => {
    const result = await updateUserRoles(uid, { organizer: false });
    expect(result).toMatchObject({
      status: "success",
      data: true,
    });
  });
});
