import { z } from "astro/zod";

const serverResponseSchema = z.object({
  data: z.unknown(),
  message: z.string(),
  status: z.enum(["success", "error"]),
});

export { serverResponseSchema };