import { FastifyInstance } from "fastify/types/instance";
import { decodeIdToken, isOrganizer } from "../../services/auth";
import { addUserRole, removeUserRole } from "../../services/user";

const basePath = "/user";

const userRoutes = async (fastify: FastifyInstance) => {
  fastify.patch(`${basePath}/:uid`, async (request, reply) => {
    type Params = {
      uid: string;
    };
    type Body = {
      role?: string;
    };

    const params = request.params as Params;
    const body = request.body as Body;
    if (!request.headers.authorization) {
      return reply.unauthorized();
    }
    const callerUserUID = await decodeIdToken(request.headers.authorization);
    if (!callerUserUID) {
      return reply.unauthorized();
    }
    if (callerUserUID === params.uid) {
      return reply.forbidden("You cannot update your own user data");
    }
    if (!(await isOrganizer(callerUserUID))) {
      return reply.unauthorized();
    }

    if (body.role === "organizer") {
      await addUserRole(params.uid, "organizer");
      return reply.send({
        message: `User with uid ${params.uid} is now an organizer`,
      });
    }

    if (body.role !== "organizer") {
      await removeUserRole(params.uid, "organizer");
      return reply.send({
        message: `User with uid ${params.uid} is no longer an organizer`,
      });
    }
  });
};

export default userRoutes;
