import { describe, expect, test } from "vitest";
import createDocument from "./create";
import { defaultLanguage } from "~/constants/i18n";
import {testConverter, type TestDoc, type TestModel} from "./test-model";
import type { FirestoreDataConverter } from "firebase-admin/firestore";

const testCollection = "create-test";

describe("Create a new document", () => {
  test("Should create a document success", async () => {
    const modelToSave: TestModel = {
      lastUpdate: new Date("2024-01-01"),
      name: "Test Document",
      description: "Test description",
    };
    const result = await createDocument(
      testCollection,
      testConverter,
      modelToSave,
      defaultLanguage,
    );
    expect(result).toMatchObject({
      status: "success",
      data: expect.any(String),
    });
  });

  test("Should return an error if id is present", async () => {
    const modelToSave: TestModel = {
      id: "test-id",
      lastUpdate: new Date("2024-01-01"),
      name: "Test Document",
    };
    const result = await createDocument(
      testCollection,
      testConverter,
      modelToSave,
      defaultLanguage,
    );
    expect(result).toMatchObject({
      status: "error",
      data: {
        code: `${testCollection}/create-error:id-is-present`,
        message: "Document ID is required",
      },
    });
  });

  test("Should return an error if firestore error", async () => {
    const modelToSave: TestModel = {
      lastUpdate: new Date("2024-01-01"),
      name: "Test Document",
    };
    const fakeConverter: FirestoreDataConverter<TestModel, TestDoc> = {
      toFirestore: (): TestDoc => {
        throw new Error("Error converting to firestore");
      },
      fromFirestore: (): TestModel => {
        throw new Error("Error converting from firestore");
      },
    };
    const result = await createDocument(
      testCollection,
      fakeConverter,
      modelToSave,
      defaultLanguage,
    );
    expect(result).toMatchObject({
      status: "error",
      data: {
        code: `${testCollection}/create-error`,
        message: `Error creating document in collection ${testCollection}`,
      },
    });
  });

  test("Should return an error if id is present", async () => {
    const modelToSave: TestModel = {
      id: "test-id",
      lastUpdate: new Date("2024-01-01"),
      name: "Test Document",
    };
    const result = await createDocument(
      testCollection,
      testConverter,
      modelToSave,
      defaultLanguage,
    );
    expect(result).toMatchObject({
      status: "error",
      data: {
        code: `${testCollection}/create-error:id-is-present`,
        message: "Document ID is required",
      },
    });
  });

  test("Should return an error if passed language is not default one", async () => {
    const modelToSave: TestModel = {
      lastUpdate: new Date("2024-01-01"),
      name: "Test Document",
    };
    const result = await createDocument(
      testCollection,
      testConverter,
      modelToSave,
      "it",
    );
    expect(result).toMatchObject({
      status: "error",
      data: {
        code: `${testCollection}/create-error:default-language-is-required`,
        message: "Default language is required",
      },
    });
  });
});
