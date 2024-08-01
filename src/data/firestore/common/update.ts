import type {
  DocumentData,
  FirestoreDataConverter,
} from "firebase-admin/firestore";
import { firestoreInstance } from "~/firebase/server";
import type { BaseModel } from "~/models/base-model";
import type { ServerResponse } from "~/models/server-response/server-response.type";

export const updateDocument = async <
  M extends BaseModel,
  D extends DocumentData,
  C extends string,
>(
  collection: C,
  converter: FirestoreDataConverter<M, D>,
  model: M,
): Promise<
  ServerResponse<null, `${C}/update-error` | `${C}/update-error:missing-id`>
> => {
  if (!model.id || model.id.trim() === "") {
    return {
      status: "error",
      data: {
        code: `${collection}/update-error:missing-id`,
        message: "Document ID is required",
      },
    };
  }
  try {
    await firestoreInstance
      .collection(collection)
      .withConverter<M, D>(converter)
      .doc(model.id)
      .set(model, { merge: true });
    return {
      status: "success",
      data: null,
    };
  } catch (error) {
    console.error(`Error updating document ${model.id}`, error);
    return {
      status: "error",
      data: {
        code: `${collection}/update-error`,
        message: `Error updating document ${model.id}`,
      },
    };
  }
};
