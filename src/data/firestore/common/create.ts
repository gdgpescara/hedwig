import type {
  DocumentData,
  FirestoreDataConverter,
} from "firebase-admin/firestore";
import { firestoreInstance } from "~/firebase/server";
import type { BaseModel } from "~/models/base-model";
import type { ServerResponse } from "~/models/server-response/server-response.type";

export const createDocument = async <
  M extends BaseModel,
  D extends DocumentData,
  C extends string,
>(
  collection: C,
  converter: FirestoreDataConverter<M, D>,
  model: M,
): Promise<
  ServerResponse<
    string,
    `${C}/create-error` | `${C}/create-error:id-is-present`
  >
> => {
  try {
    if (model.id) {
      return {
        status: "error",
        data: {
          code: `${collection}/create-error:id-is-present`,
          message: "Document ID is required",
        },
      };
    }
    const result = await firestoreInstance
      .collection(collection)
      .withConverter<M, D>(converter)
      .add(model);
    return {
      status: "success",
      data: result.id,
    };
  } catch (error) {
    console.error(`Error creating document in collection ${collection}`, error);
    return {
      status: "error",
      data: {
        code: `${collection}/create-error`,
        message: `Error creating document in collection ${collection}`,
      },
    };
  }
};
