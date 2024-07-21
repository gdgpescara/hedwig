import { FastifyInstance } from "fastify";
import { getPartnerships } from "../../../services/partnership";
import { $partnershipSchemaRef, partnershipSchemas } from "./partnership.schema";
import { $paginationSchemasRef } from "../pagination/pagination.schema";
import { PaginationParams } from "../pagination/pagination.type";

const prefix = "/partnership";

const partnershipRoutes = async (fastify: FastifyInstance) => {
    for (const schema of partnershipSchemas) {
        fastify.addSchema(schema);
      }
  
    fastify.get(
        `${prefix}`,
        {
            schema: {
                querystring: $paginationSchemasRef("paginationParams"),
                response: {
                    200: $partnershipSchemaRef("parnershipPaginatedResponse"),
                }
            },
        },
        async (request, reply) => {
            const paginationParams = request.query as PaginationParams;
            const partnerships = await getPartnerships(paginationParams);
            return reply.send(partnerships);
        }
    );
};

export default partnershipRoutes;