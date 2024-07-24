import type { User } from "~/models/user/user.type";
import type { FirestoreDocument } from "../model-document-mapper";
import type { FirestoreDataConverter } from "firebase-admin/firestore";
import type { PaginationParams } from "~/models/pagination/pagination.type";
import getDocsPaginated from "./common/get-docs-paginated";

const collection = "users" as const;

type UserDoc = FirestoreDocument<User>;

const converter: FirestoreDataConverter<User, UserDoc> = {
  toFirestore: (doc: User): UserDoc => {
    delete doc.id;
    return {
      ...doc,
    };
  },
  fromFirestore: (snapshot: FirebaseFirestore.QueryDocumentSnapshot): User => {
    const data = snapshot.data();
    return {
      id: snapshot.id,
      ...data,
    } as User;
  },
};

const getUsersPaginated = async (params: PaginationParams<User>) => {
  return getDocsPaginated(collection, converter, params);
};

export { getUsersPaginated };
