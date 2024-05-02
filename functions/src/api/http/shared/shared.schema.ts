import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const idParamSchema = z.object({
  id: z.string(),
});

const genericResponse = z.object({
  message: z.string(),
});

const errorResponse = z.object({
  statusCode: z.number(),
  code: z.string().optional(),
  error: z.string(),
  message: z.string(),
});

export const { schemas: sharedSchemas, $ref: $sharedSchemaRef } =
  buildJsonSchemas(
    {
      idParamSchema,
      genericResponse,
      errorResponse,
    },
    { $id: "SharedSchema" },
  );
