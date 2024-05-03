import { FastifyInstance, RawServerDefault } from "fastify";
import { Request } from "firebase-functions/lib/v2/providers/https";
import { RawReplyDefaultExpression } from "fastify/types/utils";
import { FastifyBaseLogger } from "fastify/types/logger";
import { FastifyTypeProviderDefault } from "fastify/types/type-provider";

type FunctionFastifyInstance = FastifyInstance<
  RawServerDefault,
  Request,
  RawReplyDefaultExpression,
  FastifyBaseLogger,
  FastifyTypeProviderDefault
>;

declare module "fastify" {
  interface FastifyInstance {
    authenticated: (
      request: FastifyRequest,
      reply: FastifyReply,
      done: (error?: Error) => void,
    ) => Promise<void>;
    isOrganizer: (
      request: FastifyRequest,
      reply: FastifyReply,
      done: (error?: Error) => void,
    ) => Promise<void>;
    paginationSchemas: () => FastifySchema;
    paginate: (
      collection: string,
      request: FastifyRequest,
      reply: FastifyReply,
    ) => Promise<void>;
  }
}

export { FunctionFastifyInstance };
