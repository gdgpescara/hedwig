import { FastifyInstance } from "fastify";
import { $sharedSchemaRef } from "../shared/shared.schema";
import { IdPathParam } from "../shared/shared.type";
import { $userSchemasRef, userSchemas } from "./user.schema";
import { updateUserRoles, userExists } from "../../../services/user";
import { CustomClaims } from "../../../models/user.types";

const prefix = "/user";

const userRoutes = async (fastify: FastifyInstance) => {
  for (const schema of userSchemas) {
    fastify.addSchema(schema);
  }

  fastify.patch(
    `${prefix}/:id`,
    {
      schema: {
        params: $sharedSchemaRef("idParamSchema"),
        body: $userSchemasRef("patchRequest"),
        response: {
          200: $sharedSchemaRef("genericResponse"),
          400: $sharedSchemaRef("errorResponse"),
          403: $sharedSchemaRef("errorResponse"),
          401: $sharedSchemaRef("errorResponse"),
          404: $sharedSchemaRef("errorResponse"),
        },
      },
      preHandler: fastify.auth([fastify.authenticated, fastify.isOrganizer]),
    },
    async (request, reply) => {
      const params = request.params as IdPathParam;
      const body = request.body as CustomClaims;

      if (request.headers.callerUID === params.id) {
        return reply.forbidden("You cannot update your own user data");
      }

      if (!(await userExists(params.id))) {
        return reply.notFound("User not found");
      }

      await updateUserRoles(params.id, body);

      return reply.send({ message: "User roles updated" });
    },
  );

  fastify.get(
    prefix,
    {
      schema: fastify.paginationSchemas(),
    },
    (request, reply) => fastify.paginate("users", request, reply),
  );
};

export default userRoutes;
