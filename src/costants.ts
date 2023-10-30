import { z } from "zod";

const envSchema = z.object({
  siteUrl: z.string().url(),
});

export const env = envSchema.parse({
  siteUrl: import.meta.env.SITE,
});
