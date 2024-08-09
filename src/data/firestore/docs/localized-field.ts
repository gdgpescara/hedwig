import { defaultLanguage, type supportedLanguages } from "~/constants/i18n";

type SupportedLanguage = typeof supportedLanguages[number];

type LocalizedField = Partial<Record<SupportedLanguage, string | null>>;

const isLocalizedField = (value: unknown): value is LocalizedField => {
  return (
    typeof value === "object" && value !== null && defaultLanguage in value
  );
};

export type { LocalizedField };
export { isLocalizedField };
