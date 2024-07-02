import {
  DocumentData,
  FirestoreDataConverter,
  Query,
  getFirestore,
} from "firebase-admin/firestore";
import {
  PaginatedResponse,
  PaginationParams,
} from "../../api/http/pagination/pagination.type";

/**
 * A callback function to modify the query before executing it.
 * @param {Query} query  The query to modify.
 * @return {Query} The modified query.
 * @template M  The model type.
 * @template D  The document type. This type should extend DocumentData.
 */
type QueryCallback<M, D extends DocumentData> = (
  query: Query<M, D>,
) => Query<M, D>;

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
 * @return {Promise<PaginatedResponse>}
 *    A PaginatedResponse instance containing the paginated list of documents.
 * @template M  The model type.
 * @template D  The document type. This type should extend DocumentData.
 * @template PP  The pagination parameters type.
 *    This type should extend PaginationParams.
 */
const getDocsPaginated = async <
  M,
  D extends DocumentData,
  PP extends PaginationParams,
>(
  collection: string,
  converter: FirestoreDataConverter<M, D>,
  params: PP,
  queryCallback?: QueryCallback<M, D>,
): Promise<PaginatedResponse<M>> => {
  const collectionRef = getFirestore().collection(collection);
  let query = collectionRef
    .withConverter(converter)
    .orderBy(params.orderBy, params.orderDirection);

  if (queryCallback) {
    query = queryCallback(query);
  }

  const count = (await query.count().get()).data().count;
  const totalPages = Math.ceil(count / params.limit);

  query = query.offset(params.offset).limit(params.limit);

  const snapshot = await query.get();

  const data = snapshot.docs.map((doc) => doc.data());

  return {
    data,
    total: count,
    limit: params.limit,
    offset: params.offset,
    totalPages,
  };
};

export default getDocsPaginated;
