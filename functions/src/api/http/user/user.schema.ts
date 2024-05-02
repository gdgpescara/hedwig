import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const patchRequest = z.object({
  organizer: z.boolean().optional(),
});

export const { schemas: userSchemas, $ref: $userSchemasRef } = buildJsonSchemas(
  {
    patchRequest,
  },
  { $id: "UserSchema" },
);
