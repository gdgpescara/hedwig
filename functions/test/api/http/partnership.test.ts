import { expect} from "chai";
import { describe, test } from "mocha";
import { httpApiBaseUrl } from "./utils";
import { initializeFirebaseApp } from "../../../src/config";
import { Partnership } from "../../../src/models/partnership.types";
import { getFirestore } from "firebase-admin/firestore";
import { PaginatedResponse } from "../../../src/api/http/pagination/pagination.type";

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

  test("Fetch partnerships from collections", async function () {
    const response = await fetch(`${httpApiBaseUrl}/partnership?orderDirection=asc&limit=10&offset=0&orderBy=position`);

    expect(response.status).to.be.equal(200);

    const expectedPartnership: Partnership = {
      ...dummyPartnership,
      partners: dummyPartners,
    }

    const expextedResponse : PaginatedResponse<Partnership> = {
      data: [expectedPartnership],
      total: 1,
      limit: 10,
      offset: 0,
      totalPages: 1,
    };
    

    const partnershipFeched = await response.json() as Partnership[];

    expect(partnershipFeched).to.deep.be.equal(expextedResponse);
    
  });

});
