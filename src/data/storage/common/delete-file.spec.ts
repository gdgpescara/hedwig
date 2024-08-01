import { describe, test, expect } from "vitest";
import uploadFile from "~/data/storage/common/upload-file.ts";
import deleteFile from "./delete-file";

describe("Delete file", () => {
  test("Delete file", async () => {
    const file = new File(["Hello, world!"], "hello.txt");
    await uploadFile(file, "test/success/hello.txt");
    const response = await deleteFile("test/success/hello.txt");
    expect(response).toMatchObject({
      status: "success",
      data: true,
    });
  });

  test("Delete file not found", async () => {
    const response = await deleteFile("test/success/hello.txt");
    expect(response).toMatchObject({
      status: "error",
      data: {
        code: "hedwig-storage/delete-file:error",
        message: "Error deleting file",
      },
    });
  });

  test("Delete file error", async () => {
    const response = await deleteFile("test/fails/hello.txt");
    expect(response).toMatchObject({
      status: "error",
      data: {
        code: "hedwig-storage/delete-file:error",
        message: "Error deleting file",
      },
    });
  });
});
