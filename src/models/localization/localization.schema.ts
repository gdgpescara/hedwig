import { z } from "astro/zod";
import { supportedLanguages } from "~/constants/i18n";

const localizationParamSchema = z.object({
  language: z.enum(supportedLanguages),
});

export { localizationParamSchema };
