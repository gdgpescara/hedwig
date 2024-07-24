import type { BaseModel } from "../base-model";

type User = BaseModel & {
  displayName: string;
  email: string;
  organizer?: boolean;
};

export type { User };
