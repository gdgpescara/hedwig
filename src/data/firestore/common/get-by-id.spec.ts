import { describe, expect, test } from "vitest";
import { createDocument } from "./create";
import { getDocumentById } from "./get-by-id";
import { testConverter, type TestDoc, type TestModel } from "./test-model";
import type { FirestoreDataConverter } from "firebase-admin/firestore";

const testCollection = "get-by-id-test";

describe("Get by id", () => {
  test("should get document from the specified collection", async () => {
    const modelToSave: TestModel = {
      lastUpdate: new Date("2024-01-01"),
      name: "Test Document",
    };

    const result = await createDocument(
      testCollection,
      testConverter,
      modelToSave,
    );

    const get = await getDocumentById(
      testCollection,
      testConverter,
      result.data as string,
    );

    expect(get).toMatchObject({
      status: "success",
      data: expect.objectContaining({
        ...modelToSave,
        id: result.data,
      }),
    });
  });

  test("should return an error if id is missing", async () => {
    const result = await getDocumentById(testCollection, testConverter, " ");

    expect(result).toMatchObject({
      status: "error",
      data: {
        code: `${testCollection}/get-by-id-error:missing-id`,
        message: "Document ID is required",
      },
    });
  });

  test("should return an error if id is missing", async () => {
    const result = await getDocumentById(testCollection, testConverter, "");

    expect(result).toMatchObject({
      status: "error",
      data: {
        code: `${testCollection}/get-by-id-error:missing-id`,
        message: "Document ID is required",
      },
    });
  });

  test("should return an error if document not found", async () => {
    const result = await getDocumentById(
      testCollection,
      testConverter,
      "not-found",
    );

    expect(result).toMatchObject({
      status: "error",
      data: {
        code: `${testCollection}/get-by-id-error:not-found`,
        message: `Document with id not-found not found in collection ${testCollection}`,
      },
    });
  });

  test("should return an error if firestore error", async () => {
    const modelToSave: TestModel = {
      lastUpdate: new Date("2024-01-01"),
      name: "Test Document",
    };

    const resultInsert = await createDocument(
      testCollection,
      testConverter,
      modelToSave,
    );

    const fakeConverter: FirestoreDataConverter<TestModel, TestDoc> = {
      toFirestore: (): TestDoc => {
        throw new Error("Error converting to firestore");
      },
      fromFirestore: (): TestModel => {
        throw new Error("Error converting from firestore");
      },
    };
    const result = await getDocumentById(
      testCollection,
      fakeConverter,
      resultInsert.data as string,
    );

    expect(result).toMatchObject({
      status: "error",
      data: {
        code: `${testCollection}/get-by-id-error`,
        message: `Error getting document with id ${resultInsert.data as string} from collection ${testCollection}`,
      },
    });
  });
});
