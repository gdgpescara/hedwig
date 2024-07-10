import { FirestoreDataConverter, Timestamp } from "firebase-admin/firestore";
import { FirestoreDocument } from "../src/api/http/shared/shared.type";

export const testCollection = "test-collection" as const;

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
  fromFirestore: (
    snapshot: FirebaseFirestore.QueryDocumentSnapshot,
  ): TestModel => {
    const data = snapshot.data();
    return {
      id: snapshot.id,
      ...data,
      lastUpdate: data.lastUpdate.toDate(),
    } as TestModel;
  },
};
