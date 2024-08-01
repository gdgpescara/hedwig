import {
  PaginationParams,
  PaginatedResponse,
} from "../api/http/pagination/pagination.type";
import getDocsPaginated from "./generic/get-docs-paginated";
import { User, UserDoc } from "../api/http/user/user.type";

const collection = "users";

const userConverter = {
  toFirestore: (user: User): UserDoc => {
    return user as UserDoc;
  },
  fromFirestore: (snapshot: FirebaseFirestore.QueryDocumentSnapshot): User => {
    const data = snapshot.data();
    return {
      id: snapshot.id,
      displayName: data.displayName,
      email: data.email,
    };
  },
};

const getUsers = async (
  params: PaginationParams,
): Promise<PaginatedResponse<User>> => {
  return getDocsPaginated<User, UserDoc, PaginationParams>(
    collection,
    userConverter,
    params,
  );
};

export { getUsers };
