import { Timestamp } from "firebase-admin/firestore";

type IdPathParam = {
  id: string;
};

type GenericResponse = {
  message: string;
};

type ErrorResponse = {
  statusCode: number;
  code?: string;
  error: string;
  message: string;
};

type MapDateToTimestamp<PropType> = PropType extends Date
  ? Timestamp
  : PropType;

export type FirestoreDocument<T> = {
  [PropertyKey in keyof T]: MapDateToTimestamp<T[PropertyKey]>;
};

export { IdPathParam, GenericResponse, ErrorResponse };
