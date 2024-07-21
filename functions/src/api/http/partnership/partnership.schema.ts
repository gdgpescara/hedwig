import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const partnerSchema = z.object({
    id: z.string(),
    name: z.string(),
    logo: z.string(),
    position: z.number(),
    link: z.string(),
});

const partnershipResponse = z.object({
    id: z.string(),
    name: z.string(),
    position: z.number(),
    partners: z.array(partnerSchema),
});

const parnershipPaginatedResponse = z.object({
    data: z.array(partnershipResponse),
    total: z.number(),
    limit: z.number(),
    offset: z.number(),
    totalPages: z.number(),
});



export const { schemas: partnershipSchemas, $ref: $partnershipSchemaRef } = buildJsonSchemas(
    {
        parnershipPaginatedResponse: parnershipPaginatedResponse,
    },
    {
        $id: "PartnershipSchema"
    },
);
