import {
  DocumentData,
  FirestoreDataConverter,
  getFirestore,
  Query,
} from "firebase-admin/firestore";
import {
  OrderDirection,
  PaginatedResponse,
  PaginationParams,
} from "../../api/http/pagination/pagination.type";

const orderBy = <M, D extends DocumentData>(
  query: Query<M, D>,
  orderBy: string,
  orderDirection: OrderDirection,
): Query<M, D> => {
  if (!orderBy) return query;
  return query.orderBy(orderBy, orderDirection);
};

const addPageFilters = <M, D extends DocumentData>(
  query: Query<M, D>,
  params: PaginationParams,
): Query<M, D> => {
  if (params.offset > 0) {
    query = query.offset(params.offset);
  }

  return query.limit(params.limit);
};

const getPaginated = async <M, D extends DocumentData>(
  collection: string,
  converter: FirestoreDataConverter<M, D>,
  params: PaginationParams,
): Promise<PaginatedResponse<M>> => {
  try {
    let query: Query<M, D> = getFirestore()
      .collection(collection)
      .withConverter<M, D>(converter);
    query = orderBy(query, params.orderBy, params.orderDirection);

    const count = (await query.count().get()).data().count;
    const totalPages = Math.ceil(count / params.limit);
    if (count === 0) {
      return {
        data: [],
        total: 0,
        limit: params.limit,
        offset: params.offset,
        totalPages: 0,
      };
    }

    query = addPageFilters(query, params);

    const result = await query.get();
    const items = result.docs.map((doc) => doc.data());
    return {
      data: items,
      total: count,
      limit: params.limit,
      offset: params.offset,
      totalPages,
    };
  } catch (error) {
    console.error(`Error getting documents from ${collection}`, error);
    throw error;
  }
};

export default getPaginated;
