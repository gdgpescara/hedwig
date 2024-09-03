import type { BaseModel } from "../base-model";

type User = BaseModel & {
  displayName: string;
  email: string;
  customClaims?: CustomClaims;
};

type CustomClaims = {
  organizer?: boolean;
};

type Roles = keyof CustomClaims;

export type { User, CustomClaims, Roles };
