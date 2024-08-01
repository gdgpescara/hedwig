import type { ServerResponse } from "~/models/server-response/server-response.type";
import { bucket } from "~/firebase/server";

const deleteFile = async (
  path: string,
): Promise<ServerResponse<boolean, "hedwig-storage/delete-file:error">> => {
  try {
    const fileRef = bucket.file(path);
    await fileRef.delete();
    return {
      status: "success",
      data: true,
    };
  } catch (error) {
    console.error("Error deleting file:", error);
    return {
      status: "error",
      data: {
        code: "hedwig-storage/delete-file:error",
        message: "Error deleting file",
      },
    };
  }
};

export default deleteFile;
