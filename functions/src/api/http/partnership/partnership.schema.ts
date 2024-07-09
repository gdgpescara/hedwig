import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const partnershipListResponse = z.array(z.object({
    id: z.string(),
    name: z.string(),
    position: z.number(),
    partners: z.array(z.object({
        id: z.string(),
        name: z.string(),
        logo: z.string(),
        position: z.number(),
        link: z.string(),
    })),
}));

export const { schemas: partnershipSchemas, $ref: $partnershipSchemaRef } = buildJsonSchemas(
    {
        partnershipListResponse,
    },
    {
        $id: "PartnershipSchema"
    },
);
