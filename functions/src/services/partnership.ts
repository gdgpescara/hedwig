import { getFirestore } from "firebase-admin/firestore";
import { Partnership } from "../models/partnership.types"

const getPartnerships = async () => {
    const firestore = getFirestore();
    const partnershipsCollection = firestore.collection("partnerships");
    const partnershipsSnaphot = await partnershipsCollection.get();

    const partnershipsPromises = partnershipsSnaphot.docs.map(async (partnershipDoc) => {
        const partnership = partnershipDoc.data() as Partnership;

        const partners = firestore.collection(`partnerships/${partnership.id}/partners`);
        const partnersSnapshot = await partners.get();

        partnership.partners = partnersSnapshot.docs.map((partnerDoc) => {
            return partnerDoc.data();
        }) as Partnership["partners"];

        return partnership;
    });

    return Promise.all(partnershipsPromises);
}

export { getPartnerships };