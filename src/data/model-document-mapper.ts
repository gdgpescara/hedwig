import { Timestamp } from "firebase-admin/firestore";

type MapDateToTimestamp<PropType> = PropType extends Date
  ? Timestamp
  : PropType;

export type FirestoreDocument<T> = {
  [PropertyKey in keyof T]: MapDateToTimestamp<T[PropertyKey]>;
};
