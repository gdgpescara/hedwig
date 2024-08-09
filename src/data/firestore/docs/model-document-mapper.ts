import { Timestamp } from "firebase-admin/firestore";
import type { LocalizedField } from "./localized-field";

type MapDateToTimestamp<PropType> = PropType extends Date
  ? Timestamp
  : PropType;

type OmitDate<T> = {
  [K in keyof T as T[K] extends Date ? never : K]: T[K]
};

type FirestoreDocument<T> = Omit<OmitDate<T>, "id"> & {
  [PropertyKey in keyof T]: MapDateToTimestamp<T[PropertyKey]>;
};


type LocalizedFirestoreDocument<T, K extends keyof T> = Omit<
  FirestoreDocument<T>,
  K
> & {
  [P in keyof T]: P extends K ? LocalizedField : MapDateToTimestamp<T[P]>;
};

export type { FirestoreDocument, LocalizedFirestoreDocument };
