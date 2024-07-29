import { z } from "astro/zod";

const PartnerSchema = z.object({
    id: z.string(),
    name: z.string(),
    logo: z.string(),
    position: z.number(),
    link: z.string(),
});

const PartnershipSchema = z.object({
    id: z.string(),
    name: z.string(),
    position: z.number(),
    partners: z.array(PartnerSchema),
});

export { PartnerSchema, PartnershipSchema };