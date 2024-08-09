import { defaultLanguage, type SupportedLanguages } from "~/constants/i18n";
import type { QueryDocumentSnapshot } from "firebase-admin/firestore";
import type { BaseModel } from "~/models/base-model";
import type { LocalizedFirestoreDocument } from "~/data/firestore/docs/model-document-mapper.ts";
import {
  isLocalizedField,
  type LocalizedField,
} from "~/data/firestore/docs/localized-field.ts";

const localizedFieldToFirestore = <
  M extends BaseModel,
  K extends keyof M,
  D extends LocalizedFirestoreDocument<M, K>,
>(
  model: M,
  currentLanguage: SupportedLanguages,
  localizedFields: K[],
  currentDocument: D,
): LocalizedFirestoreDocument<M, K> => {
  const result = { ...model } as unknown as D;

  localizedFields.forEach((field) => {
    let localizedValue = {
      ...(currentDocument[field] as LocalizedField),
    };
    const modelValue = model[field];
    if (!modelValue && currentLanguage === defaultLanguage) {
      throw new Error(
        `Cannot set default language (${defaultLanguage}) to an empty string for field ${String(field)}`,
      );
    }

    if (modelValue) {
      if (typeof modelValue !== "string") {
        throw new Error(`Field ${String(field)} must be a string in the model`);
      }

      if (currentLanguage === defaultLanguage && modelValue.trim() === "") {
        throw new Error(
          `Cannot set default language (${defaultLanguage}) to an empty string for field ${String(field)}`,
        );
      }

      localizedValue[currentLanguage] = modelValue;
    }

    result[field] = localizedValue as any;
  });

  return result;
};

const localizedFieldFromFirestore = <M extends BaseModel, K extends keyof M>(
  snapshot: QueryDocumentSnapshot,
  currentLanguage: SupportedLanguages,
  localizedFields: ReadonlyArray<K>,
): M => {
  const data = snapshot.data() as LocalizedFirestoreDocument<M, K>;
  const result = { ...data, id: snapshot.id } as M;

  localizedFields.forEach((field) => {
    const value = data[field];
    if (isLocalizedField(value)) {
      result[field] = value[currentLanguage] as M[K];
    } else {
      result[field] = value as M[K];
    }
  });

  return result;
};

export { localizedFieldToFirestore, localizedFieldFromFirestore };
