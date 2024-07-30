import type { FirestoreDocument } from "../model-document-mapper";
import type {
    FirestoreDataConverter,
    QueryDocumentSnapshot,
} from "firebase-admin/firestore";
import type { PaginationParams } from "~/models/pagination/pagination.type";
import getDocsPaginated from "./common/get-docs-paginated";
import type { Partnership } from "~/models/partnership/partnership.type";

const collection = "partnerships" as const;
type PartnershipDoc = FirestoreDocument<Partnership>;

const partnershipDataConverter: FirestoreDataConverter<Partnership, PartnershipDoc> = {
    toFirestore: (model: Partnership): PartnershipDoc => {
    delete model.id;
    delete model.partners
        return {
            ...model,
        };
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot): Partnership => {
        const data = snapshot.data();
        return {
            id: snapshot.id,
            ...data,
        } as Partnership;
    },
};

const getPartnershipsPaginated = async (params: PaginationParams<Partnership>) => {
    return getDocsPaginated(collection, partnershipDataConverter, params);
}

export { getPartnershipsPaginated };