import { afterEach, before, beforeEach, describe, test } from "mocha";
import { initializeFirebaseApp } from "../../../src/config";
import {
  FirestoreDataConverter,
  getFirestore,
  Timestamp,
} from "firebase-admin/firestore";
// eslint-disable-next-line max-len
import { PaginationParams } from "../../../src/api/http/pagination/pagination.type";
import getPaginated from "../../../src/utilities/firestore/get-paginated";
// eslint-disable-next-line max-len
import FirestoreDocument from "../../../src/utilities/firestore/model-document-mapper";
import { expect } from "chai";

type TestModel = {
  id?: string;
  lastUpdate: Date;
  name: string;
  userUpdate: {
    id: string;
    username: string;
    name: string;
    role: string;
  };
  deleted: boolean;
};

type TestDoc = FirestoreDocument<TestModel>;

describe("Get all documents", () => {
  const testCollection = "test-collection";
  const testConverter: FirestoreDataConverter<TestModel, TestDoc> = {
    toFirestore: (model: TestModel): TestDoc => {
      return {
        ...model,
        lastUpdate: Timestamp.fromDate(model.lastUpdate),
      };
    },
    fromFirestore: (
      snapshot: FirebaseFirestore.QueryDocumentSnapshot,
    ): TestModel => {
      const data = snapshot.data();
      return {
        id: snapshot.id,
        ...data,
        lastUpdate: data.lastUpdate.toDate(),
      } as TestModel;
    },
  };
  const modelsToSave: TestModel[] = [
    {
      id: "test-model-1",
      lastUpdate: new Date("2024-01-01"),
      name: "Carrefour spa",
      userUpdate: {
        id: "test-id-1",
        username: "test",
        name: "Test User",
        role: "admin",
      },
      deleted: false,
    },
    {
      id: "test-model-2",
      lastUpdate: new Date("2024-01-02"),
      name: "Conad spa",
      userUpdate: {
        id: "test-id-1",
        username: "test",
        name: "Test User",
        role: "admin",
      },
      deleted: false,
    },
    {
      id: "test-model-3",
      lastUpdate: new Date("2024-01-03"),
      name: "Esselunga spa",
      userUpdate: {
        id: "test-id-2",
        username: "test",
        name: "Test User",
        role: "admin",
      },
      deleted: false,
    },
    {
      id: "test-model-4",
      lastUpdate: new Date("2024-01-04"),
      name: "Crai",
      userUpdate: {
        id: "test-id-2",
        username: "test",
        name: "Test User",
        role: "admin",
      },
      deleted: false,
    },
    {
      id: "test-model-5",
      lastUpdate: new Date("2024-01-05"),
      name: "Craig spa",
      userUpdate: {
        id: "test-id-3",
        username: "test",
        name: "Test User",
        role: "admin",
      },
      deleted: false,
    },
    {
      id: "test-model-6",
      lastUpdate: new Date("2024-01-06"),
      name: "Tigre",
      userUpdate: {
        id: "test-id-3",
        username: "test",
        name: "Test User",
        role: "admin",
      },
      deleted: false,
    },
    {
      id: "test-model-7",
      lastUpdate: new Date("2024-01-07"),
      name: "Coop",
      userUpdate: {
        id: "test-id-3",
        username: "test",
        name: "Test User",
        role: "admin",
      },
      deleted: false,
    },
    {
      id: "test-model-8",
      lastUpdate: new Date("2024-01-08"),
      name: "Coop adriatico",
      userUpdate: {
        id: "test-id-4",
        username: "test",
        name: "Test User",
        role: "admin",
      },
      deleted: false,
    },
  ];

  before(() => {
    initializeFirebaseApp();
  });

  beforeEach(async () => {
    const batch = getFirestore().batch();
    modelsToSave.forEach((model) => {
      batch.create(
        getFirestore().collection(testCollection).doc(model.id!),
        model,
      );
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

  test("Should get first page ordered", async () => {
    const params: PaginationParams = {
      offset: 0,
      limit: 2,
      orderBy: "lastUpdate",
      orderDirection: "desc",
    };

    const result = await getPaginated(testCollection, testConverter, params);

    expect(result).deep.equal({
      data: [modelsToSave[7], modelsToSave[6]],
      total: modelsToSave.length,
      limit: 2,
      offset: 0,
      totalPages: Math.ceil(modelsToSave.length / params.limit),
    });
  });

  test("should get second page ordered", async () => {
    const params: PaginationParams = {
      offset: 2,
      limit: 2,
      orderBy: "lastUpdate",
      orderDirection: "desc",
    };

    const result = await getPaginated(testCollection, testConverter, params);

    expect(result).deep.equal({
      data: [modelsToSave[5], modelsToSave[4]],
      total: modelsToSave.length,
      limit: 2,
      offset: 2,
      totalPages: Math.ceil(modelsToSave.length / params.limit),
    });
  });

  test("should get last page ordered", async () => {
    const params: PaginationParams = {
      offset: 6,
      limit: 2,
      orderBy: "lastUpdate",
      orderDirection: "desc",
    };

    const result = await getPaginated(testCollection, testConverter, params);

    expect(result).deep.equal({
      data: [modelsToSave[1], modelsToSave[0]],
      total: modelsToSave.length,
      limit: 2,
      offset: 6,
      totalPages: Math.ceil(modelsToSave.length / params.limit),
    });
  });
});
