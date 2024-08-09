import { test, describe, expect } from "vitest";
import { updateDocument } from "./update";
import { getDocumentById } from "./get-by-id";
import { testConverter, type TestDoc, type TestModel } from "./test-model";
import type { FirestoreDataConverter } from "firebase-admin/firestore";
import createDocument from "./create";
import { defaultLanguage } from "~/constants/i18n";

const testCollection = "update-test";

describe("Update a new document", () => {
  test("Should update a document success", async () => {
    const modelToSave: TestModel = {
      lastUpdate: new Date("2024-01-01"),
      name: "Test Document",
    };

    const result = await createDocument(
      testCollection,
      testConverter,
      modelToSave,
      defaultLanguage,
    );

    const modelToUpdate = {
      id: result.data as string,
      ...modelToSave,
      name: "Updated Document",
    };

    const updateResult = await updateDocument(
      testCollection,
      testConverter,
      modelToUpdate,
    );

    expect(updateResult).toMatchObject({
      status: "success",
      data: null,
    });

    const getResult = await getDocumentById(
      testCollection,
      testConverter,
      modelToUpdate.id as string,
    );
    expect(getResult).toMatchObject({
      status: "success",
      data: expect.objectContaining({
        ...modelToUpdate,
        id: result.data,
      }),
    });
  });

  test("Should return an error if missing id", async () => {
    const modelToSave: TestModel = {
      lastUpdate: new Date("2024-01-01"),
      name: "Test Document",
    };
    const result = await updateDocument(
      testCollection,
      testConverter,
      modelToSave,
    );
    expect(result).toMatchObject({
      status: "error",
      data: {
        code: `${testCollection}/update-error:missing-id`,
        message: "Document ID is required",
      },
    });
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
    const modelToSave: TestModel = {
      lastUpdate: new Date("2024-01-01"),
      name: "Test Document",
    };

    const result = await createDocument(
      testCollection,
      testConverter,
      modelToSave,
      defaultLanguage,
    );

    const modelToUpdate = {
      id: result.data as string,
      ...modelToSave,
      name: "Updated Document",
    };

    const updateResult = await updateDocument(
      testCollection,
      fakeConverter,
      modelToUpdate,
    );

    expect(updateResult).toMatchObject({
      status: "error",
      data: {
        code: `${testCollection}/update-error`,
        message: `Error updating document ${result.data as string}`,
      },
    });
  });
});
