import { expect } from "chai";
import { getAuth } from "firebase-admin/auth";
import { before, describe, test } from "mocha";
import { initializeFirebaseApp } from "../../../src/config";
import { httpApiBaseUrl, login } from "./utils";

/* eslint-disable max-len */
/* eslint-disable quote-props */

describe("user APIs", () => {
  const testOrganizer = {
    email: "organizer@test.it",
    displayName: "main organizer",
    password: "verysecurepassword",
  };

  const testUser = {
    email: "user@test.it",
    displayName: "user",
    password: "verysecurepassword",
  };

  const userToPromote = {
    email: "new-organizer@test.it",
    displayName: "new organizer",
    password: "verysecurepassword",
  };

  let organizer: { uid: string; idToken: string };
  let userToPromoteUid: string;

  before(async () => {
    initializeFirebaseApp();

    // create all users
    await getAuth().createUser(testOrganizer);
    await getAuth().createUser(testUser);
    await getAuth().createUser(userToPromote);

    // set organizer custom claim
    await getAuth().setCustomUserClaims(
      (await getAuth().getUserByEmail(testOrganizer.email)).uid,
      { organizer: true },
    );

    organizer = await login(testOrganizer.email, testOrganizer.password);
    userToPromoteUid = (await getAuth().getUserByEmail(userToPromote.email))
      .uid;
  });

  test("WHEN check customClaims on organizer EXPECT customClaims equals { organizer: true }", async () => {
    const user = await getAuth().getUserByEmail(testOrganizer.email);
    const userRecord = await getAuth().getUser(user.uid);
    expect(userRecord.customClaims).to.deep.equal({ organizer: true });
  });

  test("WHEN call /user/:id API without token EXPECT 401 status code", async () => {
    const response = await fetch(`${httpApiBaseUrl}/user/userid`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    expect(response.status).to.be.equal(401);
  });

  test("WHEN call /user/:id API with normal user token EXPECT 401 status code", async () => {
    const loginData = await login(testUser.email, testUser.password);

    const response = await fetch(`${httpApiBaseUrl}/user/userid`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${loginData.idToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    expect(response.status).to.be.equal(401);
  });

  test("WHEN call /user/:id API with organizer token and same organizer id EXPECT 403 status code", async () => {
    const organizer = await login(testOrganizer.email, testOrganizer.password);
    const response = await fetch(`${httpApiBaseUrl}/user/${organizer.uid}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${organizer.idToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    expect(response.status).to.be.equal(403);
  });

  test("WHEN call /user/:id API with organizer token and user id of user without organizer role EXPECT 200 status code and user with organizer role set", async () => {
    const response = await fetch(`${httpApiBaseUrl}/user/${userToPromoteUid}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${organizer.idToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ organizer: true }),
    });

    expect(response.status).to.be.equal(200);

    const userRecord = await getAuth().getUser(userToPromoteUid);
    expect(userRecord.customClaims).to.deep.equal({ organizer: true });
  });

  test("WHEN call /user/:id API with organizer token and fake user id EXPECT 404 status code", async () => {
    const response = await fetch(`${httpApiBaseUrl}/user/fakeuserid`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${organizer.idToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ organizer: true }),
    });

    expect(response.status).to.be.equal(404);
  });

  test("WHEN call /user/:id API with organizer token and user id of user with organizer role and request body with organizer: false EXPECT 200 status code and user with organizer role removed", async () => {
    await getAuth().setCustomUserClaims(userToPromoteUid, {
      organizer: true,
    });

    const response = await fetch(`${httpApiBaseUrl}/user/${userToPromoteUid}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${organizer.idToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ organizer: false }),
    });

    expect(response.status).to.be.equal(200);

    const userRecord = await getAuth().getUser(userToPromoteUid);
    expect(userRecord.customClaims).to.deep.equal({});
  });

  test("WHEN call /user/:id API with organizer token and user id of user with organizer role and request body empty EXPECT 200 status code and user with organizer role removed", async () => {
    await getAuth().setCustomUserClaims(userToPromoteUid, {
      organizer: true,
    });

    const response = await fetch(`${httpApiBaseUrl}/user/${userToPromoteUid}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${organizer.idToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    expect(response.status).to.be.equal(200);

    const userRecord = await getAuth().getUser(userToPromoteUid);
    expect(userRecord.customClaims).to.deep.equal({});
  });
});
