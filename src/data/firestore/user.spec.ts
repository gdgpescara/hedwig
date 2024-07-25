import { afterEach, beforeEach, describe, expect, test } from "vitest";
import type {
  PaginatedResponse,
  PaginationParams,
} from "~/models/pagination/pagination.type";
import { firestoreInstance } from "~/firebase/server";
import { testConverter } from "./common/test-model";
import type { User } from "~/models/user/user.type";
import { getUsersPaginated } from "./user";

const testCollection = "users" as const;

describe("Get docs paginated", () => {
  const modelsToSave: User[] = [
    {
      displayName: "Name 1",
      email: "email@email.it",
      organizer: true,
    },
    {
      displayName: "Name 2",
      email: "email2@email.it",
    },
    {
      displayName: "Name 3",
      email: "email3@email.it",
      organizer: true,
    },
    {
      displayName: "Name 4",
      email: "email4@email.it",
    },
    {
      displayName: "Name 5",
      email: "email5@email.it",
    },
    {
      displayName: "Name 6",
      email: "email6@email.it",
    },
    {
      displayName: "Name 7",
      email: "email7@email.it",
    },
  ];

  beforeEach(async () => {
    const batch = firestoreInstance.batch();
    modelsToSave.forEach((model) => {
      batch.create(firestoreInstance.collection(testCollection).doc(), model);
    });
    await batch.commit();
  });

  afterEach(async () => {
    const docs = await firestoreInstance
      .collection(testCollection)
      .withConverter(testConverter)
      .listDocuments();
    const batch = firestoreInstance.batch();
    docs.forEach((doc) => {
      batch.delete(doc);
    });
    await batch.commit();
  });

  test("should get first offset ordered", async () => {
    const params: PaginationParams<User> = {
      offset: 0,
      limit: 2,
      orderBy: "displayName",
      orderDirection: "desc",
    };

    const result = await getUsersPaginated(params);

    expect(result).toMatchObject({
      status: "success",
      data: {
        data: expect.any(Array),
        total: modelsToSave.length,
        offset: 0,
        limit: 2,
        totalPages: Math.ceil(modelsToSave.length / params.limit),
      },
    });
    const response = result.data as PaginatedResponse<User>;
    expect(response.data).toHaveLength(params.limit);
  });

  test("should get second offset ordered", async () => {
    const params: PaginationParams<User> = {
      offset: 2,
      limit: 2,
      orderBy: "displayName",
      orderDirection: "desc",
    };

    const result = await getUsersPaginated(params);

    expect(result).toMatchObject({
      status: "success",
      data: {
        data: expect.any(Array),
        total: modelsToSave.length,
        offset: 2,
        limit: 2,
        totalPages: Math.ceil(modelsToSave.length / params.limit),
      },
    });
    const response = result.data as PaginatedResponse<User>;
    expect(response.data).toHaveLength(params.limit);
  });

  test("should get last page ordered", async () => {
    const params: PaginationParams<User> = {
      offset: 6,
      limit: 3,
      orderBy: "displayName",
      orderDirection: "desc",
    };

    const result = await getUsersPaginated(params);

    expect(result).toMatchObject({
      status: "success",
      data: {
        data: expect.any(Array),
        total: modelsToSave.length,
        offset: 6,
        limit: 3,
        totalPages: Math.ceil(modelsToSave.length / params.limit),
      },
    });
    const response = result.data as PaginatedResponse<User>;
    expect(response.data).toHaveLength(1);
    expect(response.data[0].displayName).toEqual(modelsToSave[0].displayName);
  });

  // *********** Error cases *********** //

  test("should return an error if offset is less than 1", async () => {
    const params: PaginationParams<User> = {
      offset: -1,
      limit: 2,
      orderBy: "displayName",
      orderDirection: "asc",
    };

    const result = await getUsersPaginated(params);

    expect(result).toMatchObject({
      status: "error",
      data: {
        code: `${testCollection}/search-error:invalid-offset`,
        message: `Offset must be a positive integer`,
      },
    });
  });

  test("should return an error if limit is less than 1", async () => {
    const params: PaginationParams<User> = {
      offset: 0,
      limit: 0,
      orderBy: "displayName",
      orderDirection: "asc",
    };

    const result = await getUsersPaginated(params);

    expect(result).toMatchObject({
      status: "error",
      data: {
        code: `${testCollection}/search-error:invalid-limit`,
        message: `Limit must be a positive integer`,
      },
    });
  });

  test("should return an error if offset is out of range", async () => {
    const params: PaginationParams<User> = {
      offset: 10,
      limit: 2,
      orderBy: "displayName",
      orderDirection: "asc",
    };

    const result = await getUsersPaginated(params);

    expect(result).toMatchObject({
      status: "error",
      data: {
        code: `${testCollection}/search-error:invalid-offset`,
        message: `Offset is greater than the total number of documents`,
      },
    });
  });
});
