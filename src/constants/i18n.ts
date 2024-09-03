export const defaultLanguage = "en" as const;

export const supportedLanguages = ["it", "en"] as const;

export type SupportedLanguages = (typeof supportedLanguages)[number];
