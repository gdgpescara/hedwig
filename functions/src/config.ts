import {
  cert,
  getApps,
  initializeApp,
  ServiceAccount,
} from "firebase-admin/app";
import * as dotenv from "dotenv";
import { FastifyInstance, RawServerDefault } from "fastify";
import { Request } from "firebase-functions/lib/v2/providers/https";
import { RawReplyDefaultExpression } from "fastify/types/utils";
import { FastifyBaseLogger } from "fastify/types/logger";
import { FastifyTypeProviderDefault } from "fastify/types/type-provider";

// load environment variables
dotenv.config({ path: "../.env" });
const serviceAccount = JSON.parse(
  process.env.PUBLIC_FIREBASE_SERVICE_ACCOUNT || "{}",
);

// initialize firebase app
export const initializeFirebaseApp = () => {
  if (getApps().length === 0) {
    initializeApp({
      credential: cert(serviceAccount as ServiceAccount),
      databaseURL: process.env.FIREBASE_DATABASE_URL,
    });
  }
};

export const projectId = serviceAccount.project_id;

export const functionsRegion = process.env.PUBLIC_FIREBASE_FUNCTIONS_REGION || "";

export type FunctionFastifyInstance = FastifyInstance<
  RawServerDefault,
  Request,
  RawReplyDefaultExpression,
  FastifyBaseLogger,
  FastifyTypeProviderDefault
>;
