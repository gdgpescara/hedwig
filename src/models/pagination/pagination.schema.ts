import {z} from "astro/zod";

const paginationParamsSchema = z.object({
  orderBy: z.string(),
  orderDirection: z.enum(["asc", "desc"]),
  offset: z.number(),
  limit: z.number(),
});

const paginationResponseSchema = z.object({
  data: z.array(z.unknown()),
  total: z.number(),
  limit: z.number(),
  offset: z.number(),
  totalPages: z.number(),
});

export {paginationParamsSchema, paginationResponseSchema};
