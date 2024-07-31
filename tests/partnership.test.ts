import { test, expect, } from "@playwright/test";
import { getPartnershipsPaginated } from "~/data/firestore/partenership/get-partnership-paginated";
import { partnerDataConverter, partnershipDataConverter } from "~/data/firestore/partenership/models";
import { firestoreInstance } from "~/firebase/server";
import type { PaginatedResponse } from "~/models/pagination/pagination.type";
import type { Partnership } from "~/models/partnership/partnership.type";

test("get partnership after creating it", async ({ page }) => {
    const partnership: Partnership = {
        id: "test-partnership",
        name: "test partnership",
        position: 1,
        partners: [{
            id: "test-partner",
            name: "test partner",
            logo: "test logo",
            link: "test url",
            position: 1,
        }],
    };

    await firestoreInstance
        .doc("partnerships/test-partnership")
        .withConverter(partnershipDataConverter)
        .set(partnership);

    await firestoreInstance.doc("partnerships/test-partnership/partners/test-partner")
        .withConverter(partnerDataConverter)
        .set(partnership.partners![0]);


    const result = await getPartnershipsPaginated({
        offset: 0,
        limit: 10,
        orderBy: "position",
        orderDirection: "asc"
    });

    const equivalentResultData : PaginatedResponse<Partnership> = {
        data: [partnership],
        total: 1,
        limit: 10,
        offset: 0,
        totalPages: 1,
    };

    await expect(result.status).toEqual("success");
    await expect(result.data).toEqual(equivalentResultData); 
});