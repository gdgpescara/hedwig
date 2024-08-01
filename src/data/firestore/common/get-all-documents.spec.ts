import { afterEach, beforeEach, describe, expect, test } from "vitest";
import type { GetAllDocumentsParam } from "~/models/get-all/get-all-document.type.ts";
import {
  testConverter,
  type TestDoc,
  type TestModel,
} from "~/data/firestore/common/test-model.ts";
import { firestoreInstance } from "~/firebase/server.ts";
import { getAllDocuments } from "~/data/firestore/common/get-all-documents.ts";
import { fail } from "node:assert";
import type { FirestoreDataConverter } from "firebase-admin/firestore";

const testCollection = "test-collection";

describe("getAllDocuments", () => {
  beforeEach(async () => {
    const batch = firestoreInstance.batch();
    const testData: Omit<TestModel, "id">[] = [
      { name: "Test 1", lastUpdate: new Date("2023-01-01") },
      { name: "Test 2", lastUpdate: new Date("2023-01-02") },
      { name: "Test 3", lastUpdate: new Date("2023-01-03") },
    ];
    testData.forEach((data) => {
      const docRef = firestoreInstance.collection(testCollection).doc();
      batch.set(docRef, testConverter.toFirestore(data as TestModel));
    });
    await batch.commit();
  });

  afterEach(async () => {
    const snapshot = await firestoreInstance.collection(testCollection).get();
    const batch = firestoreInstance.batch();
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();
  });

  test("should get all documents successfully", async () => {
    const params: GetAllDocumentsParam<TestModel> = {
      orderBy: "name",
      orderDirection: "asc",
    };

    const result = await getAllDocuments(testCollection, testConverter, params);

    expect(result.status).toBe("success");
    expect(result.data).toHaveLength(3);
    if (result.status === "success") {
      expect(result.data).toHaveLength(3);
      expect(result.data[0].name).toBe("Test 1");
      expect(result.data[1].name).toBe("Test 2");
      expect(result.data[2].name).toBe("Test 3");
      expect(result.data[0].lastUpdate).toBeInstanceOf(Date);
      expect(result.data[0].id).toBeDefined();
    } else {
      fail("Expected successful result");
    }
  });

  test("should handle empty collection", async () => {
    const snapshot = await firestoreInstance.collection(testCollection).get();
    const batch = firestoreInstance.batch();
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();

    const params: GetAllDocumentsParam<TestModel> = {
      orderBy: "name",
      orderDirection: "desc",
    };

    const result = await getAllDocuments(testCollection, testConverter, params);

    expect(result.status).toBe("success");
    expect(result.data).toHaveLength(0);
  });

  test("should use correct ordering", async () => {
    const params: GetAllDocumentsParam<TestModel> = {
      orderBy: "lastUpdate",
      orderDirection: "desc",
    };

    const result = await getAllDocuments(testCollection, testConverter, params);

    expect(result.status).toBe("success");
    expect(result.data).toHaveLength(3);
    if (result.status === "success") {
      expect(result.data[0].lastUpdate.getTime()).toBeGreaterThan(
        result.data[1].lastUpdate.getTime(),
      );
      expect(result.data[1].lastUpdate.getTime()).toBeGreaterThan(
        result.data[2].lastUpdate.getTime(),
      );
    } else {
      fail("Expected successful result");
    }
  });

  test("Should return an error if firestore error", async () => {
    const fakeConverter: FirestoreDataConverter<TestModel, TestDoc> = {
      toFirestore: (): TestDoc => {
        throw new Error("Error converting to firestore");
      },
      fromFirestore: (): TestModel => {
        throw new Error("Error converting from firestore");
      },
    };

    const params: GetAllDocumentsParam<TestModel> = {
      orderBy: "name",
      orderDirection: "desc",
    };

    const result = await getAllDocuments(testCollection, fakeConverter, params);

    expect(result.status).toBe("error");
    if (result.status === "error") {
      expect(result.data.code).toBe(`${testCollection}/get-all-error`);
      expect(result.data.message).toBe(
        `Error getting documents from collection: ${testCollection}`,
      );
    } else {
      fail("Expected error result");
    }
  });
});
