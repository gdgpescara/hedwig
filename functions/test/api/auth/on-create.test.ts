import { expect } from "chai";
import { getAuth } from "firebase-admin/auth";
import { DocumentSnapshot, getFirestore } from "firebase-admin/firestore";
import { before, describe, test } from "mocha";
import {initialize} from "../../../src/config";

describe("onCreate", () => {
  const collection = "users";
  const testUser = {
    email: "test@test.it",
    displayName: "test",
    password: "verysecurepassword",
  };

  before(async () => {
    initialize();
  });

  test("Create user and check if it saved in users collection", async () => {
    // create a user
    await getAuth().createUser(testUser);

    // check if the user was created
    const user = await getAuth().getUserByEmail(testUser.email);
    expect(user).to.not.be.null;

    const docPromise = new Promise<DocumentSnapshot>((resolve) => {
      const unsubscribe = getFirestore()
        .collection(collection)
        .doc(user.uid)
        .onSnapshot((doc) => {
          if (doc.exists) {
            resolve(doc);
            unsubscribe();
          }
        });
    });

    // check if the user collection contains the user
    // and the email and displayName are correct
    const userDoc = await docPromise;
    const userData = userDoc.data();
    expect(userData).to.not.be.null;
    expect(userData?.email).to.be.equal(testUser.email);
    expect(userData?.displayName).to.be.equal(testUser.displayName);
  });
});
