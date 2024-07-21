import { FirestoreDataConverter, getFirestore } from "firebase-admin/firestore";
import { Partnership, PartnershipDoc } from "../models/partnership.types"
import getPaginated from "../utilities/firestore/get-paginated";
import { PaginationParams } from "../api/http/pagination/pagination.type";


const partnershipDataConverter: FirestoreDataConverter<Partnership, PartnershipDoc> = {
    toFirestore: (model: Partnership): PartnershipDoc => {
        return {
            id: model.id,
            name: model.name,
            position: model.position,
        };
    },
    fromFirestore: (snapshot: FirebaseFirestore.QueryDocumentSnapshot): Partnership => {
        const data = snapshot.data();
        return {
            id: snapshot.id,
            ...data,
        } as Partnership;
    },
};

const getPartnerships = async (paginationParams: PaginationParams) => {
    const firestore = getFirestore();
    const partnershipsPage = await getPaginated("partnerships", partnershipDataConverter, paginationParams);

    const partnershipsPromises = partnershipsPage.data.map(async (partnership) => {
        const partners = firestore.collection(`partnerships/${partnership.id}/partners`);
        const partnersSnapshot = await partners.get();

        partnership.partners = partnersSnapshot.docs.map((partnerDoc) => {
            return partnerDoc.data();
        }) as Partnership["partners"];

        return partnership;
    });

    partnershipsPage.data = await  Promise.all(partnershipsPromises);

    return partnershipsPage;
}

export { getPartnerships };