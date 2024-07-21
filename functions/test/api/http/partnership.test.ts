import { expect} from "chai";
import { describe, test } from "mocha";
import { httpApiBaseUrl } from "./utils";
import { initializeFirebaseApp } from "../../../src/config";
import { Partnership } from "../../../src/models/partnership.types";
import { getFirestore } from "firebase-admin/firestore";

describe("getParterships", () => {
  const collection = "/partnerships";
  const dummyPartnership: any = {
    id: "dummy_01",
    name: "Main Sponsors",
    position: 0,
  };

  const dummyPartners: any[] = [
    {
      id: "dummy_partner_01",
      name: "Dummy Partner 01",
      logo: "https://dummy.com",
      link: "https://dummy.com",
      position: 0
    },
    {
      id: "dummy_partner_02",
      name: "Dummy Partner 02",
      logo: "https://dummy.com",
      link: "https://dummy.com",
      position: 1
    },

  ];

  before(async () => {
    initializeFirebaseApp();
    const fs = getFirestore();
    const batch = fs.batch();
    
    const partnerDocRef = fs.doc(`${collection}/${dummyPartnership.id}`)
    await batch.set(partnerDocRef,dummyPartnership);
    
    dummyPartners.forEach((partner) => {
      const ref =  fs.doc(`${collection}/${dummyPartnership.id}/partners/${partner.id}`);
      batch.set(ref, partner);
    });

    await batch.commit();
  });

  test("Fetch partnerships from collections", async () => {
    const response = await fetch(`${httpApiBaseUrl}/partnership`);

    expect(response.status).to.be.equal(200);

    const expectedPartnership: Partnership = {
      ...dummyPartnership,
      partners: dummyPartners,
    }

    const partnershipFeched = await response.json() as Partnership[];

    expect(partnershipFeched).to.deep.be.equal([expectedPartnership]);
    
  });

});
