import {
  QueryDocumentSnapshot,
  Timestamp,
  type FirestoreDataConverter,
} from "firebase-admin/firestore";
import type { FirestoreDocument } from "~/data/model-document-mapper";

export type TestModel = {
  id?: string;
  name: string;
  lastUpdate: Date;
};

export type TestDoc = FirestoreDocument<TestModel>;

export const testConverter: FirestoreDataConverter<TestModel, TestDoc> = {
  toFirestore: (company: TestModel): TestDoc => {
    return {
      ...company,
      lastUpdate: Timestamp.fromDate(company.lastUpdate),
    };
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot): TestModel => {
    const data = snapshot.data();
    return {
      id: snapshot.id,
      ...data,
      lastUpdate: data.lastUpdate.toDate(),
    } as TestModel;
  },
};
