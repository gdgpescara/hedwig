import { FastifyInstance } from "fastify";
import { getPartnerships } from "../../../services/partnership";
import { $partnershipSchemaRef, partnershipSchemas } from "./partnership.schema";

const prefix = "/partnership";

const partnershipRoutes = async (fastify: FastifyInstance) => {
    for (const schema of partnershipSchemas) {
        fastify.addSchema(schema);
      }
  
    fastify.get(
        `${prefix}`,
        {
            schema: {
                response: {
                    200: $partnershipSchemaRef("partnershipListResponse"),
                }
            },
        },
        async (request, reply) => {
            const partnerships = await getPartnerships();
            return reply.send(partnerships);
        }
    );
};

export default partnershipRoutes;