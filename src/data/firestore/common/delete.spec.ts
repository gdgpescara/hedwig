import { describe, expect, test } from "vitest";
import { deleteDocument } from "./delete";
import { createDocument } from "./create";
import { getDocumentById } from "./get-by-id";
import { testConverter, type TestModel } from "./test-model";

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

    const deleteResult = await deleteDocument(
      testCollection,
      result.data as string,
    );

    expect(deleteResult).toMatchObject({
      status: "success",
      data: null,
    });

    const getAfterDelete = await getDocumentById(
      testCollection,
      testConverter,
      result.data as string,
    );

    expect(getAfterDelete).toMatchObject({
      status: "error",
      data: {
        code: `${testCollection}/get-by-id-error:not-found`,
        message: `Document with id ${
          result.data as string
        } not found in collection delete-test`,
      },
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
