import fastify, { FastifyServerFactoryHandler } from "fastify";
import Sensible from "@fastify/sensible";
import Cors from "@fastify/cors";
import { onRequest } from "firebase-functions/v2/https";
import userRoutes from "./user";
import { createServer } from "http";
import { FunctionFastifyInstance, functionsRegion } from "../../config";

let requestHandler: FastifyServerFactoryHandler;

const serverFactory = (handler: FastifyServerFactoryHandler) => {
  requestHandler = handler;
  return createServer();
};

const app: FunctionFastifyInstance = fastify({
  logger: true,
  serverFactory,
});

app.register(Sensible);
app.register(Cors, { origin: false });
app.addContentTypeParser("application/json", (_, payload, done) => {
  done(null, payload.body);
});

app.register(userRoutes);

export default onRequest({ region: functionsRegion }, (req, res) => {
  app.ready((err) => {
    if (err) throw err;
    requestHandler(req, res);
  });
});
