import type {
  DocumentData,
  FirestoreDataConverter,
} from "firebase-admin/firestore";
import { firestoreInstance } from "~/firebase/server";
import type { BaseModel } from "~/models/base-model";
import type { ServerResponse } from "~/models/server-response/server-response.type";

export const getDocumentById = async <
  M extends BaseModel,
  D extends DocumentData,
  C extends string,
>(
  collection: C,
  converter: FirestoreDataConverter<M, D>,
  docId: string,
): Promise<
  ServerResponse<
    M,
    | `${C}/get-by-id-error`
    | `${C}/get-by-id-error:missing-id`
    | `${C}/get-by-id-error:not-found`
  >
> => {
  if (!docId || docId.trim() === "") {
    return {
      status: "error",
      data: {
        code: `${collection}/get-by-id-error:missing-id`,
        message: "Document ID is required",
      },
    };
  }
  try {
    const document = await firestoreInstance
      .collection(collection)
      .withConverter<M, D>(converter)
      .doc(docId)
      .get();
    const data = document.data();
    if (!data) {
      return {
        status: "error",
        data: {
          code: `${collection}/get-by-id-error:not-found`,
          message: `Document with id ${docId} not found in collection ${collection}`,
        },
      };
    }
    return {
      status: "success",
      data: data,
    };
  } catch (error) {
    console.error(
      `Error getting document with id ${docId} from collection ${collection}`,
      error,
    );
    return {
      status: "error",
      data: {
        code: `${collection}/get-by-id-error`,
        message: `Error getting document with id ${docId} from collection ${collection}`,
      },
    };
  }
};
