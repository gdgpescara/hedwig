import { z } from "astro/zod";

const envSchema = z.object({
  siteUrl: z.string().url(),
});

export const env = envSchema.parse({
  siteUrl: import.meta.env.SITE,
});
