import { FirestoreDocument } from "../shared/shared.type";

type User = {
  id?: string;
  displayName: string;
  email: string;
};

type UserDoc = FirestoreDocument<User>;

export { User, UserDoc };
