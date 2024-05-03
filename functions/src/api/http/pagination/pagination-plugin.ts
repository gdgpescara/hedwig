import * as fastifyPlugin from "fastify-plugin";
import { PaginationParams } from "./pagination.type";
import { FastifyPluginOptions } from "fastify/types/plugin";

const Pagination = fastifyPlugin(
  async (fastify, opts: FastifyPluginOptions) => {
    const paginationSchemas = opts.paginationSchemas;
    const paginationParams = opts.paginationParams;
    const paginationResponse = opts.paginationResponse;
    const errorResponseSchema = opts.errorResponseSchema;
    for (const schema of paginationSchemas) {
      fastify.addSchema(schema);
    }

    fastify.decorate("paginationSchemas", () => {
      return {
        querystring: paginationParams,
        response: {
          200: paginationResponse,
          400: errorResponseSchema,
          401: errorResponseSchema,
          403: errorResponseSchema,
          404: errorResponseSchema,
        },
      };
    });

    fastify.decorate("paginate", async (collection, request, reply) => {
      const params = request.query as PaginationParams;

      // Pagination logic here
      console.log(params);
      console.log(collection);

      return reply.notImplemented();
    });
  },
);

export default Pagination;
