import type {
  DocumentData,
  FirestoreDataConverter,
} from "firebase-admin/firestore";
import { firestoreInstance } from "~/firebase/server";
import type { BaseModel } from "~/models/base-model";
import type { ServerResponse } from "~/models/server-response/server-response.type";
import type { GetAllDocumentsParam } from "~/models/get-all/get-all-document.type.ts";

export const getAllDocuments = async <
  M extends BaseModel,
  D extends DocumentData,
  P extends GetAllDocumentsParam<M>,
  C extends string,
>(
  collection: C,
  converter: FirestoreDataConverter<M, D>,
  params: P,
): Promise<
  ServerResponse<
    M[],
    | `${C}/get-all-error`
  >
> => {
  try {
    const snapshot = await firestoreInstance
      .collection(collection)
      .withConverter<M, D>(converter)
      .orderBy(params.orderBy, params.orderDirection)
      .get();
    const data =  snapshot.docs.map((doc) => doc.data());
    return {
      status: "success",
      data: data,
    };
  } catch (error) {
    console.error(
      `Error getting documents from collection: ${collection}`,
      error,
    );
    return {
      status: "error",
      data: {
        code: `${collection}/get-all-error`,
        message: `Error getting documents from collection: ${collection}`,
      },
    };
  }
};
