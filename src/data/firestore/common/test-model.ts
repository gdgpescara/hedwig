import type {LocalizedFirestoreDocument} from "~/data/firestore/docs/model-document-mapper";
import {type FirestoreDataConverter, type QueryDocumentSnapshot, Timestamp} from "firebase-admin/firestore";
import {
  localizedFieldFromFirestore,
  localizedFieldToFirestore
} from "~/data/firestore/docs/converters/localization-converter.ts";
import omit from "~/data/firestore/docs/utils.ts";

export type TestModel = {
  id?: string;
  name: string;
  description?: string;
  lastUpdate: Date;
};

type TestDocLocalizedFields = "description";

export type TestDoc = LocalizedFirestoreDocument<TestModel, TestDocLocalizedFields>

export const testConverter: FirestoreDataConverter<TestModel, TestDoc> = {
  toFirestore: (model: TestModel): TestDoc => {
    const rest = omit(model, ["id", "description"]);
    const doc: TestDoc = {
      ...rest,
      lastUpdate: Timestamp.fromDate(model.lastUpdate),
    };
    return localizedFieldToFirestore(model, "en", ["description"], doc);
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot): TestModel => {
    const data = snapshot.data();
    const model = localizedFieldFromFirestore<TestModel, TestDocLocalizedFields>(snapshot, "en", ["description"]);
    return {
      ...model,
      lastUpdate: data.lastUpdate.toDate(),
    };
  },
};