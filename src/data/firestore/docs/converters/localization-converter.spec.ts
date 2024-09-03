import { beforeEach, describe, expect, it, vi } from "vitest";
import { defaultLanguage, type SupportedLanguages } from "~/constants/i18n";
import type { BaseModel } from "~/models/base-model";
import type { LocalizedFirestoreDocument } from "~/data/firestore/docs/model-document-mapper";
import type {
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase-admin/firestore";

import type { LocalizedField } from "~/data/firestore/docs/localized-field";
import {
  localizedFieldFromFirestore,
  localizedFieldToFirestore,
} from "~/data/firestore/docs/converters/localization-converter.ts";

type TestModel = BaseModel & {
  title: string;
  description: string;
  subtitle?: string;
};

type TestLocalizedFields = "title" | "subtitle";

type TestDocument = LocalizedFirestoreDocument<TestModel, TestLocalizedFields>;

function createSimpleMockQueryDocumentSnapshot<T extends DocumentData>(
  id: string,
  data: T,
): QueryDocumentSnapshot<T> {
  return {
    id,
    data: vi.fn(() => data),
    ref: { id } as any,
    metadata: { hasPendingWrites: false, fromCache: false },
  } as unknown as QueryDocumentSnapshot<T>;
}

describe("localizedFieldToFirestore", () => {
  let model: TestModel;
  let currentDocument: TestDocument;
  const localizedFields: TestLocalizedFields[] = ["title"];

  beforeEach(() => {
    model = {
      id: "123",
      title: "New Title",
      description: "New Description",
    };
    currentDocument = {
      id: "123",
      title: { en: "Old Title", it: "Titolo Vecchio" } as LocalizedField,
      description: "Old Description",
    };
  });

  it("should correctly convert a model to a Firestore document", () => {
    const result = localizedFieldToFirestore(
      model,
      "en",
      localizedFields,
      currentDocument,
    );
    expect(result).toEqual({
      id: "123",
      title: { en: "New Title", it: "Titolo Vecchio" },
      description: "New Description",
    });
  });

  it("should add a new language if it does not exist in the current document", () => {
    const result = localizedFieldToFirestore(
      model,
      "fr" as SupportedLanguages,
      localizedFields,
      currentDocument,
    );
    expect(result.title as LocalizedField).toHaveProperty("fr", "New Title");
  });

  it("should throw an error when trying to set default language to empty string", () => {
    model.title = "";
    expect(() =>
      localizedFieldToFirestore(
        model,
        defaultLanguage,
        localizedFields,
        currentDocument,
      ),
    ).toThrow(
      `Cannot set default language (${defaultLanguage}) to an empty string for field title`,
    );
  });

  it("should throw an error when a localized field in the model is not a string", () => {
    (model as any).title = 42;
    expect(() =>
      localizedFieldToFirestore(model, "en", localizedFields, currentDocument),
    ).toThrow("Field title must be a string in the model");
  });

  it("should handle multiple localized fields", () => {
    const multiModel: TestModel = { ...model, subtitle: "New Subtitle" };
    const multiDocument: TestDocument = {
      ...currentDocument,
      subtitle: {
        en: "Old Subtitle",
        it: "Sottotitolo Vecchio",
      } as LocalizedField,
    };
    const multiLocalizedFields: TestLocalizedFields[] = ["title", "subtitle"];

    const result = localizedFieldToFirestore(
      multiModel,
      "en",
      multiLocalizedFields,
      multiDocument,
    );
    expect(result).toEqual({
      id: "123",
      title: { en: "New Title", it: "Titolo Vecchio" },
      subtitle: { en: "New Subtitle", it: "Sottotitolo Vecchio" },
      description: "New Description",
    });
  });

  it("should not modify non-localized fields", () => {
    const result = localizedFieldToFirestore(
      model,
      "en",
      localizedFields,
      currentDocument,
    );
    expect(result.description).toBe("New Description");
  });
});

describe("localizedFieldFromFirestore", () => {
  const localizedFields: TestLocalizedFields[] = ["title"];

  it("should correctly convert a Firestore document to a model", async () => {
    const firestoreData = {
      id: "123",
      title: { en: "English Title", it: "Titolo Italiano" } as LocalizedField,
      description: "Some Description",
    };

    const mockSnapshot = createSimpleMockQueryDocumentSnapshot(
      "123",
      firestoreData,
    );

    const result = localizedFieldFromFirestore<TestModel, TestLocalizedFields>(
      mockSnapshot,
      "en",
      localizedFields,
    );
    expect(result).toEqual({
      id: "123",
      title: "English Title",
      description: "Some Description",
    });
  });

  it("should use the current language value if available", () => {
    const firestoreData = {
      id: "123",
      title: { en: "English Title", it: "Titolo Italiano" } as LocalizedField,
      description: "Some Description",
    };
    const mockSnapshot = createSimpleMockQueryDocumentSnapshot(
      "123",
      firestoreData,
    );

    const result = localizedFieldFromFirestore<TestModel, TestLocalizedFields>(
      mockSnapshot,
      "it",
      localizedFields,
    );
    expect(result.title).toBe("Titolo Italiano");
  });

  it("should handle non-localized fields correctly", () => {
    const firestoreData = {
      id: "123",
      title: { en: "English Title", it: "Titolo Italiano" } as LocalizedField,
      description: "Some Description",
    };
    const mockSnapshot = createSimpleMockQueryDocumentSnapshot(
      "123",
      firestoreData,
    );

    const result = localizedFieldFromFirestore<TestModel, TestLocalizedFields>(
      mockSnapshot,
      "en",
      localizedFields,
    );
    expect(result.description).toBe("Some Description");
  });

  it("should return undefined for a language that does not exist in the localized field", () => {
    const firestoreData = {
      id: "123",
      title: { en: "English Title" } as LocalizedField,
      description: "Some Description",
    };
    const mockSnapshot = createSimpleMockQueryDocumentSnapshot(
      "123",
      firestoreData,
    );

    const result = localizedFieldFromFirestore<TestModel, TestLocalizedFields>(
      mockSnapshot,
      "it" as SupportedLanguages,
      localizedFields,
    );
    expect(result.title).toBeUndefined();
  });

  it("should handle multiple localized fields", () => {
    const firestoreData = {
      id: "123",
      title: { en: "English Title", it: "Titolo Italiano" } as LocalizedField,
      description: "Some Description",
    };
    const multiData: TestDocument = {
      ...firestoreData,
      subtitle: {
        en: "English Subtitle",
        it: "Sottotitolo Italiano",
      } as LocalizedField,
    };
    const mockSnapshot = createSimpleMockQueryDocumentSnapshot(
      "123",
      multiData,
    );
    const multiLocalizedFields: TestLocalizedFields[] = ["title", "subtitle"];

    const result = localizedFieldFromFirestore<TestModel, TestLocalizedFields>(
      mockSnapshot,
      "it",
      multiLocalizedFields,
    );
    expect(result).toEqual({
      id: "123",
      title: "Titolo Italiano",
      subtitle: "Sottotitolo Italiano",
      description: "Some Description",
    });
  });
});
