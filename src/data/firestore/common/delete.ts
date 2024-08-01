import { firestoreInstance } from "~/firebase/server";
import type { ServerResponse } from "~/models/server-response/server-response.type";

export const deleteDocument = async <C extends string>(
  collection: C,
  docId: string,
): Promise<
  ServerResponse<null, `${C}/delete-error` | `${C}/delete-error:missing-id`>
> => {
  if (!docId || docId.trim() === "") {
    return {
      status: "error",
      data: {
        code: `${collection}/delete-error:missing-id`,
        message: "Document ID is required",
      },
    };
  }
  try {
    await firestoreInstance.collection(collection).doc(docId).delete();
    return {
      status: "success",
      data: null,
    };
  } catch (error) {
    console.error(
      `Error deleting document with id ${docId} from collection ${collection}`,
      error,
    );
    return {
      status: "error",
      data: {
        code: `${collection}/delete-error`,
        message: `Error deleting document with id ${docId} from collection ${collection}`,
      },
    };
  }
};
