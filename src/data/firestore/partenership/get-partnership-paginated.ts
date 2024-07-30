import type { PaginationParams } from "~/models/pagination/pagination.type";
import type { Partner, Partnership } from "~/models/partnership/partnership.type";
import getDocsPaginated from "../common/get-docs-paginated";
import { partnerDataConverter, partnershipDataConverter } from "./models";
import { getFirestore } from "firebase-admin/firestore";

const collection = "partnerships" as const;


const getPartnershipsPaginated = async (params: PaginationParams<Partnership>) => {
    const result = await getDocsPaginated(collection, partnershipDataConverter, params);
    const db = getFirestore();

    if (result.status == "success") {
        result.data.data = await Promise.all(
            result.data.data.map(async (p) => {
                const snapshot = await db.collection(`${collection}/${p.id}/partners`)
                  .withConverter(partnerDataConverter)
                  .orderBy("position", "asc")
                  .get();
                
                p.partners = snapshot.docs.map((partnerDoc) => partnerDoc.data());

                return p;
            })
        );
    }

    return result;
}

export { getPartnershipsPaginated };