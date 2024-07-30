import { getDownloadURL } from "firebase-admin/storage";
import { File as FileRef } from "@google-cloud/storage";
import type { ServerResponse } from "~/models/server-response/server-response.type";
import { bucket } from "~/firebase/server";

const saveFile = (
  inputFile: File,
  imageBuffer: Buffer,
  destination: string,
): Promise<FileRef> => {
  return new Promise((resolve, reject) => {
    const fileRef = bucket.file(destination);
    fileRef.save(
      imageBuffer,
      {
        public: true,
        private: false,
        gzip: true,
        resumable: false,
        contentType: inputFile.type,
        metadata: {
          contentType: inputFile.type,
          contentLength: inputFile.size,
        },
        validation: "md5",
      },
      async (err) => {
        if (err) {
          console.error("Error uploading file:", err);
          reject();
          return;
        }
        resolve(fileRef);
      },
    );
  });
};

const uploadFile = async (
  inputFile: File,
  destination: string,
): Promise<
  ServerResponse<
    string,
    | "hedwig-storage/upload-file:error"
    | "hedwig-storage/upload-file:error-no-file"
  >
> => {
  try {
    if (!inputFile || !inputFile.size) {
      return {
        status: "error",
        data: {
          code: "hedwig-storage/upload-file:error-no-file",
          message: "File is required",
        },
      };
    }
    const imageBuffer = Buffer.from(await inputFile.arrayBuffer());
    const fileRef = await saveFile(inputFile, imageBuffer, destination);
    const downloadURL = await getDownloadURL(fileRef);
    return {
      status: "success",
      data: downloadURL,
    };
  } catch (error) {
    console.error("Error uploading file:", error);
    return {
      status: "error",
      data: {
        code: "hedwig-storage/upload-file:error",
        message: "Error uploading file",
      },
    };
  }
};

export default uploadFile;
