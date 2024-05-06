import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const paginationParams = z.object({
  orderBy: z.string(),
  orderDirection: z.enum(["asc", "desc"]),
  offset: z.number(),
  limit: z.number(),
});

const paginationResponse = z.object({
  data: z.array(z.unknown()),
  total: z.number(),
  limit: z.number(),
  offset: z.number(),
  totalPages: z.number(),
});

const { schemas: paginationSchemas, $ref: $paginationSchemasRef } =
  buildJsonSchemas(
    {
      paginationParams,
      paginationResponse,
    },
    { $id: "PaginationSchema" },
  );

export {
  paginationSchemas,
  $paginationSchemasRef,
  paginationParams,
};
