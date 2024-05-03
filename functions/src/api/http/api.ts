import fastify, { FastifyRequest, FastifyServerFactoryHandler } from "fastify";
import Sensible from "@fastify/sensible";
import Cors from "@fastify/cors";
import Auth from "@fastify/auth";
import { onRequest } from "firebase-functions/v2/https";
import { createServer } from "http";
import { functionsRegion } from "../../config";
import { decodeIdToken, isOrganizer } from "../../services/auth";
import { FunctionFastifyInstance } from "./fastify-config";
import userRoutes from "./user/user.route";

import { $sharedSchemaRef, sharedSchemas } from "./shared/shared.schema";
import Pagination from "./pagination/pagination-plugin";
import {
  $paginationSchemasRef,
  paginationSchemas,
} from "./pagination/pagination.schema";

let requestHandler: FastifyServerFactoryHandler;

const serverFactory = (handler: FastifyServerFactoryHandler) => {
  requestHandler = handler;
  return createServer();
};

const app: FunctionFastifyInstance = fastify({
  logger: true,
  serverFactory,
});

app
  .register(Sensible)
  .register(Cors, { origin: false })
  .register(Auth, { defaultRelation: "and" })
  .register(Pagination, {
    paginationSchemas: paginationSchemas,
    paginationParams: $paginationSchemasRef("paginationParams"),
    paginationResponse: $paginationSchemasRef("paginationResponse"),
    errorResponseSchema: $sharedSchemaRef("errorResponse"),
  })
  .decorate("authenticated", async (request: FastifyRequest, _, done) => {
    if (!request.headers.authorization) {
      done(new Error("Unauthorized"));
      return;
    }
    const callerUserUID = await decodeIdToken(request.headers.authorization);
    if (!callerUserUID) {
      done(new Error("Unauthorized"));
      return;
    }
    request.headers["callerUID"] = callerUserUID;
    done();
  })
  .decorate("isOrganizer", async (request: FastifyRequest, _, done) => {
    const callerUserUID = request.headers["callerUID"];
    if (!callerUserUID || typeof callerUserUID !== "string") {
      done(new Error("Unauthorized"));
      return;
    }
    if (!(await isOrganizer(callerUserUID))) {
      done(new Error("Unauthorized"));
      return;
    }
    done();
  })
  .addContentTypeParser("application/json", (_, payload, done) => {
    done(null, payload.body);
  });

for (const schema of sharedSchemas) {
  app.addSchema(schema);
}

app.register(userRoutes);

export default onRequest({ region: functionsRegion }, (req, res) => {
  app.ready((err) => {
    if (err) throw err;
    requestHandler(req, res);
  });
});
