/* eslint-disable max-len */
/* eslint-disable quote-props */

import { expect } from "chai";
import { TestModel, testConverter } from "../../test-types";
import { getFirestore } from "firebase-admin/firestore";
import { PaginationParams } from "../../../src/api/http/pagination/pagination.type";
import { initializeFirebaseApp } from "../../../src/config";
import { before, beforeEach, afterEach, describe, test } from "mocha";
import getDocsPaginated from "../../../src/services/generic/get-docs-paginated";

const testCollection = "test-collection";

describe("Get all documents", () => {
  const modelsToSave: TestModel[] = [
    {
      lastUpdate: new Date("2024-01-01"),
      name: "Name 1",
    },
    {
      lastUpdate: new Date("2024-01-02"),
      name: "Name 2",
    },
    {
      lastUpdate: new Date("2024-01-03"),
      name: "Name 3",
    },
    {
      lastUpdate: new Date("2024-01-04"),
      name: "Name 4",
    },
    {
      lastUpdate: new Date("2024-01-05"),
      name: "Name 5",
    },
    {
      lastUpdate: new Date("2024-01-06"),
      name: "Name 6",
    },
    {
      lastUpdate: new Date("2024-01-07"),
      name: "Name 7",
    },
  ];

  before(() => {
    initializeFirebaseApp();
  });

  beforeEach(async () => {
    const batch = getFirestore().batch();
    modelsToSave.forEach((model) => {
      batch.create(getFirestore().collection(testCollection).doc(), model);
    });
    await batch.commit();
  });

  afterEach(async () => {
    const docs = await getFirestore()
      .collection(testCollection)
      .listDocuments();
    const batch = getFirestore().batch();
    docs.forEach((doc) => {
      batch.delete(doc);
    });
    await batch.commit();
  });

  test("should get first page ordered", async () => {
    const params: PaginationParams = {
      offset: 0,
      limit: 2,
      orderBy: "lastUpdate",
      orderDirection: "desc",
    };

    const result = await getDocsPaginated(
      testCollection,
      testConverter,
      params,
    );

    expect(result).to.have.all.keys(
      "data",
      "total",
      "limit",
      "offset",
      "totalPages",
    );
    expect(result.data).to.be.an("array").that.has.lengthOf(params.limit);
    expect(result.data[0].name).to.deep.equal("Name 7");
    expect(result.data[1].name).to.deep.equal("Name 6");
    expect(result.total).to.equal(modelsToSave.length);
    expect(result.limit).to.equal(params.limit);
    expect(result.offset).to.equal(params.offset);
    expect(result.totalPages).to.equal(
      Math.ceil(modelsToSave.length / params.limit),
    );
  });

  test("should get second page ordered", async () => {
    const params: PaginationParams = {
      offset: 2,
      limit: 2,
      orderBy: "lastUpdate",
      orderDirection: "desc",
    };

    const result = await getDocsPaginated(
      testCollection,
      testConverter,
      params,
    );

    expect(result).to.have.all.keys(
      "data",
      "total",
      "limit",
      "offset",
      "totalPages",
    );
    expect(result.data).to.be.an("array").that.has.lengthOf(params.limit);
    expect(result.data[0].name).to.deep.equal("Name 5");
    expect(result.data[1].name).to.deep.equal("Name 4");
    expect(result.total).to.equal(modelsToSave.length);
    expect(result.limit).to.equal(params.limit);
    expect(result.offset).to.equal(params.offset);
    expect(result.totalPages).to.equal(
      Math.ceil(modelsToSave.length / params.limit),
    );
  });

  test("should get last page ordered", async () => {
    const params: PaginationParams = {
      offset: 6,
      limit: 2,
      orderBy: "lastUpdate",
      orderDirection: "desc",
    };

    const result = await getDocsPaginated(
      testCollection,
      testConverter,
      params,
    );

    expect(result).to.have.all.keys(
      "data",
      "total",
      "limit",
      "offset",
      "totalPages",
    );
    expect(result.data).to.be.an("array").that.has.lengthOf(1);
    expect(result.data[0].name).to.deep.equal("Name 1");
    expect(result.total).to.equal(modelsToSave.length);
    expect(result.limit).to.equal(params.limit);
    expect(result.offset).to.equal(params.offset);
    expect(result.totalPages).to.equal(
      Math.ceil(modelsToSave.length / params.limit),
    );
  });

  // search all documents by search term on name field with value "1"
  test("should get all documents by custom query", async () => {
    const params: PaginationParams = {
      offset: 0,
      limit: 2,
      orderBy: "lastUpdate",
      orderDirection: "desc",
    };

    const result = await getDocsPaginated(
      testCollection,
      testConverter,
      params,
      (query) => query.where("name", "==", "Name 3"),
    );

    expect(result).to.have.all.keys(
      "data",
      "total",
      "limit",
      "offset",
      "totalPages",
    );
    expect(result.data).to.be.an("array").that.has.lengthOf(1);
    expect(result.data[0].name).to.deep.equal("Name 3");
    expect(result.total).to.equal(1);
    expect(result.limit).to.equal(params.limit);
    expect(result.offset).to.equal(params.offset);
    expect(result.totalPages).to.equal(Math.ceil(1 / params.limit));
  });

  // *********** Error cases *********** //

  test("should return an empty array if no documents found", async () => {
    const params: PaginationParams = {
      offset: 0,
      limit: 2,
      orderBy: "lastUpdate",
      orderDirection: "desc",
    };

    const result = await getDocsPaginated(
      testCollection,
      testConverter,
      params,
      (query) => query.where("name", "==", "Not existing"),
    );

    expect(result).deep.equal({
      data: [],
      total: 0,
      limit: params.limit,
      offset: params.offset,
      totalPages: 0,
    });
  });
});
