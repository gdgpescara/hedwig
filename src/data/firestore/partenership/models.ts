import type { FirestoreDataConverter, QueryDocumentSnapshot } from "firebase-admin/firestore";
import type { FirestoreDocument } from "~/data/model-document-mapper";
import type { Partner, Partnership } from "~/models/partnership/partnership.type";

type PartnershipDoc = FirestoreDocument<Partnership>;
type PartnerDoc = FirestoreDocument<Partner>;

const partnerDataConverter: FirestoreDataConverter<Partner, PartnerDoc> = {
    toFirestore: (model: Partner) => {
        delete model.id;
        return { ...model };
    },
    
    fromFirestore: (snapshot: QueryDocumentSnapshot) => {
        const data = snapshot.data() as PartnerDoc;
        data.id = snapshot.id;

        return { ...data };
    }
}

const partnershipDataConverter: FirestoreDataConverter<Partnership, PartnershipDoc> = {
    toFirestore: (model: Partnership): PartnershipDoc => {
        delete model.id
        delete model.partners

        return { ...model };
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot): Partnership => {
        const data = snapshot.data();
        return {
            id: snapshot.id,
            ...data,
        } as Partnership;
    },
};

export { partnerDataConverter, partnershipDataConverter }