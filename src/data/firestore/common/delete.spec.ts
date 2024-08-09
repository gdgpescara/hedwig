import { describe, expect, test } from "vitest";
import { deleteDocument } from "./delete";
import { testConverter, type TestModel } from "./test-model";
import createDocument from "./create";
import { defaultLanguage } from "~/constants/i18n";

const testCollection = "delete-test";

describe("deleteDocument", () => {
  test("should delete a document from the specified collection", async () => {
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

    const deleteResult = await deleteDocument(
      testCollection,
      result.data as string,
    );

    expect(deleteResult).toMatchObject({
      status: "success",
      data: null,
    });
  });

  test("should return an error if id is missing", async () => {
    const result = await deleteDocument(testCollection, "");

    expect(result).toMatchObject({
      status: "error",
      data: {
        code: `${testCollection}/delete-error:missing-id`,
        message: "Document ID is required",
      },
    });
  });

  test("should return an error if Firebase throw error", async () => {
    const result = await deleteDocument("", "fake-id");

    expect(result).toMatchObject({
      status: "error",
      data: {
        code: `/delete-error`,
        message: `Error deleting document with id fake-id from collection `,
      },
    });
  });
});
