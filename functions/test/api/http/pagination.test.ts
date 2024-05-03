import fastify, { FastifyInstance } from "fastify";
import { before, describe, test } from "mocha";
import Pagination from "../../../src/api/http/pagination/pagination-plugin";
import { expect } from "chai";
import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";
import { $sharedSchemaRef } from "../../../src/api/http/shared/shared.schema";

/* eslint-disable max-len */
/* eslint-disable quote-props */

const params = z.object({
  orderBy: z.string(),
});

const response = z.object({
  data: z.array(z.unknown()),
});

const { schemas: paginationSchemas, $ref } = buildJsonSchemas(
  {
    params,
    response,
  },
  { $id: "PaginationSchema" },
);

describe("pagination plugin", () => {
  let fastifyApp: FastifyInstance;

  before(async () => {
    fastifyApp = fastify().register(Pagination, {
      paginationSchemas,
      paginationParams: $ref("params"),
      paginationResponse: $ref("response"),
      errorResponseSchema: $sharedSchemaRef("errorResponse"),
    });

    await fastifyApp.ready();
  });

  test("WHEN call paginationSchemas EXPECT the schema as result", async () => {
    const paginationSchemas = fastifyApp.paginationSchemas();
    expect(paginationSchemas).to.deep.equal({
      querystring: $ref("params"),
      response: {
        200: $ref("response"),
        400: $sharedSchemaRef("errorResponse"),
        401: $sharedSchemaRef("errorResponse"),
        403: $sharedSchemaRef("errorResponse"),
        404: $sharedSchemaRef("errorResponse"),
      },
    });
  });
});
