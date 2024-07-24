import { afterEach, beforeEach, describe, expect, test } from "vitest";
import {
  type FirestoreDataConverter,
  Timestamp,
} from "firebase-admin/firestore";
import { firestore as adminFirestore } from "firebase-admin";
import type {
  PaginatedResponse,
  PaginationParams,
} from "~/models/pagination/pagination.type";
import type { FirestoreDocument } from "~/data/model-document-mapper.ts";
import QueryDocumentSnapshot = adminFirestore.QueryDocumentSnapshot;
import getDocsPaginated from "./get-docs-paginated";
import { firestore } from "~/firebase/server";

const testCollection = "get-paginated-test";

type TestModel = {
  id?: string;
  name: string;
  lastUpdate: Date;
};

type TestDoc = FirestoreDocument<TestModel>;

const testConverter: FirestoreDataConverter<TestModel, TestDoc> = {
  toFirestore: (company: TestModel): TestDoc => {
    return {
      ...company,
      lastUpdate: Timestamp.fromDate(company.lastUpdate),
    };
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot): TestModel => {
    const data = snapshot.data();
    return {
      id: snapshot.id,
      ...data,
      lastUpdate: data.lastUpdate.toDate(),
    } as TestModel;
  },
};

describe("Get docs paginated", () => {
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
      lastUpdate: new Date("2024-01-07"),
      name: "Name 6",
    },
    {
      lastUpdate: new Date("2024-01-07"),
      name: "Name 7",
    },
  ];

  beforeEach(async () => {
    const batch = firestore.batch();
    modelsToSave.forEach((model) => {
      batch.create(
        firestore.collection(testCollection).withConverter(testConverter).doc(),
        model,
      );
    });
    await batch.commit();
  });

  afterEach(async () => {
    const docs = await firestore
      .collection(testCollection)
      .withConverter(testConverter)
      .listDocuments();
    const batch = firestore.batch();
    docs.forEach((doc) => {
      batch.delete(doc);
    });
    await batch.commit();
  });

  test("should get first offset ordered", async () => {
    const params: PaginationParams<TestModel> = {
      offset: 0,
      limit: 2,
      orderBy: "name",
      orderDirection: "desc",
    };

    const result = await getDocsPaginated(
      testCollection,
      testConverter,
      params,
    );

    expect(result).toMatchObject({
      status: "success",
      data: {
        data: expect.any(Array),
        total: modelsToSave.length,
        offset: 0,
        limit: 2,
        totalPages: Math.ceil(modelsToSave.length / params.limit),
      },
    });
    const response = result.data as PaginatedResponse<TestModel>;
    expect(response.data).toHaveLength(params.limit);
    expect(response.data[0].lastUpdate).toEqual(modelsToSave[6].lastUpdate);
  });

  test("should get second offset ordered", async () => {
    const params: PaginationParams<TestModel> = {
      offset: 2,
      limit: 2,
      orderBy: "name",
      orderDirection: "desc",
    };

    const result = await getDocsPaginated(
      testCollection,
      testConverter,
      params,
    );

    expect(result).toMatchObject({
      status: "success",
      data: {
        data: expect.any(Array),
        total: modelsToSave.length,
        offset: 2,
        limit: 2,
        totalPages: Math.ceil(modelsToSave.length / params.limit),
      },
    });
    const response = result.data as PaginatedResponse<TestModel>;
    expect(response.data).toHaveLength(params.limit);
    expect(response.data[0].lastUpdate).toEqual(modelsToSave[4].lastUpdate);
  });

  test("should get last page ordered", async () => {
    const params: PaginationParams<TestModel> = {
      offset: 6,
      limit: 3,
      orderBy: "name",
      orderDirection: "desc",
    };

    const result = await getDocsPaginated(
      testCollection,
      testConverter,
      params,
    );

    expect(result).toMatchObject({
      status: "success",
      data: {
        data: expect.any(Array),
        total: modelsToSave.length,
        offset: 6,
        limit: 3,
        totalPages: Math.ceil(modelsToSave.length / params.limit),
      },
    });
    const response = result.data as PaginatedResponse<TestModel>;
    expect(response.data).toHaveLength(1);
    expect(response.data[0].lastUpdate).toEqual(modelsToSave[0].lastUpdate);
  });

  // *********** Error cases *********** //

  test("should return an error if offset is less than 1", async () => {
    const params: PaginationParams<TestModel> = {
      offset: -1,
      limit: 2,
      orderBy: "name",
      orderDirection: "asc",
    };

    const result = await getDocsPaginated(
      testCollection,
      testConverter,
      params,
    );

    expect(result).toMatchObject({
      status: "error",
      data: {
        code: `${testCollection}/search-error:invalid-offset`,
        message: `Offset must be a positive integer`,
      },
    });
  });

  test("should return an error if limit is less than 1", async () => {
    const params: PaginationParams<TestModel> = {
      offset: 0,
      limit: 0,
      orderBy: "name",
      orderDirection: "asc",
    };

    const result = await getDocsPaginated(
      testCollection,
      testConverter,
      params,
    );

    expect(result).toMatchObject({
      status: "error",
      data: {
        code: `${testCollection}/search-error:invalid-limit`,
        message: `Limit must be a positive integer`,
      },
    });
  });

  test("should return an empty array if no documents found", async () => {
    const params: PaginationParams<TestModel> = {
      offset: 0,
      limit: 2,
      orderBy: "name",
      orderDirection: "asc",
    };

    const result = await getDocsPaginated(
      "non-existing-collection",
      testConverter,
      params,
    );

    expect(result).toMatchObject({
      status: "success",
      data: {
        data: [],
        total: 0,
        offset: 0,
        limit: 2,
        totalPages: 0,
      },
    });
  });

  test("should return an error if offset is out of range", async () => {
    const params: PaginationParams<TestModel> = {
      offset: 10,
      limit: 2,
      orderBy: "name",
      orderDirection: "asc",
    };

    const result = await getDocsPaginated(
      testCollection,
      testConverter,
      params,
    );

    expect(result).toMatchObject({
      status: "error",
      data: {
        code: `${testCollection}/search-error:invalid-offset`,
        message: `Offset is greater than the total number of documents`,
      },
    });
  });
});
