import {z} from "astro/zod";

const getAllDocumentsParamsSchema = z.object({
  orderBy: z.string(),
  orderDirection: z.enum(["asc", "desc"]),
});

export {getAllDocumentsParamsSchema};