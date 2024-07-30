import { describe, test, expect } from "vitest";
import uploadFile from "~/data/storage/common/upload-file.ts";

describe("Upload file", () => {
  test("Empty file error", async () => {
    const file = new File([], "empty.txt");
    const result = await uploadFile(file, "test/success/empty.txt");
    expect(result).toMatchObject({
      status: "error",
      data: {
        code: "hedwig-storage/upload-file:error-no-file",
        message: "File is required",
      },
    });
  });

  test("Upload file", async () => {
    const file = new File(["Hello, world!"], "hello.txt");
    const result = await uploadFile(file, "test/success/hello.txt");
    expect(result).toMatchObject({
      status: "success",
      data: expect.any(String),
    });
  });

  test("Upload failure", async () => {
    const file = new File(["Hello, world!"], "hello.txt");
    const result = await uploadFile(file, "test/fails/hello.png");
    expect(result).toMatchObject({
      status: "error",
      data: {
        code: "hedwig-storage/upload-file:error",
        message: "Error uploading file",
      },
    });
  });
});
