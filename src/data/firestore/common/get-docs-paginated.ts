import {
  type DocumentData,
  type FirestoreDataConverter,
} from "firebase-admin/firestore";
import { firestoreInstance } from "~/firebase/server";
import type {
  PaginatedResponse,
  PaginationParams,
} from "~/models/pagination/pagination.type";
import type { ServerResponse } from "~/models/server-response/server-response.type.ts";

/**
 * This function retrieves a paginated list of documents
 * from a Firestore collection.
 * @param {string} collection
 *    The name of the collection to retrieve documents from.
 * @param {FirestoreDataConverter} converter
 *    A FirestoreDataConverter instance to convert Firestore documents
 *    to model instances.
 * @param {PaginationParams} params
 *    The pagination parameters to use when retrieving documents.
 * @param {QueryCallback} queryCallback
 *    An optional callback function to modify the query before executing it.
 *    You can use this pasrameter to add additional filters to the query.
 * @return {Promise<ServerResponse<PaginatedResponse>>}
 *    A PaginatedResponse instance containing the paginated list of documents.
 * @template M  The model type.
 * @template D  The document type. This type should extend DocumentData.
 * @template PP  The pagination parameters type.
 *    This type should extend PaginationParams.
 */
const getDocsPaginated = async <
  M,
  D extends DocumentData,
  C extends string,
  PP extends PaginationParams<M>,
>(
  collection: C,
  converter: FirestoreDataConverter<M, D>,
  params: PP,
): Promise<
  ServerResponse<
    PaginatedResponse<M>,
    | `${C}/search-error`
    | `${C}/search-error:invalid-offset`
    | `${C}/search-error:invalid-limit`
  >
> => {
  try {
    if (params.offset < 0) {
      return {
        status: "error",
        data: {
          code: `${collection}/search-error:invalid-offset`,
          message: `Offset must be a positive integer`,
        },
      };
    }
    if (params.limit < 1) {
      return {
        status: "error",
        data: {
          code: `${collection}/search-error:invalid-limit`,
          message: "Limit must be a positive integer",
        },
      };
    }
    const collectionRef = firestoreInstance.collection(collection);
    let query = collectionRef
      .withConverter(converter)
      .orderBy(params.orderBy, params.orderDirection);

    const count = (await query.count().get()).data().count;

    if (params.offset > 0 && params.offset > count) {
      return {
        status: "error",
        data: {
          code: `${collection}/search-error:invalid-offset`,
          message: "Offset is greater than the total number of documents",
        },
      };
    }

    if (count === 0) {
      return {
        status: "success",
        data: {
          data: [],
          total: 0,
          offset: 0,
          limit: params.limit,
          totalPages: 0,
        },
      };
    }

    const totalPages = Math.ceil(count / params.limit);

    query = query.offset(params.offset).limit(params.limit);

    const snapshot = await query.get();

    const data = snapshot.docs.map((doc) => doc.data());

    return {
      status: "success",
      data: {
        data: data,
        total: count,
        offset: params.offset,
        limit: params.limit,
        totalPages: totalPages,
      },
    };
  } catch (error) {
    console.error(`Error getting documents from ${collection}`, error);
    return {
      status: "error",
      data: {
        code: `${collection}/search-error`,
        message: `Error getting documents from ${collection}`,
      },
    };
  }
};

export default getDocsPaginated;
