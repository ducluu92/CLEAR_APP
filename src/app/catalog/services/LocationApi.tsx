import BaseConstant from "@/constants/BaseConstant";
import request from "@/utils/RequestUtils";
import CatalogConstant from "../constants/CatalogConstant";
const PATH = "catalog";
// GET /api/catalog/list/{type}
// gender_identities
// sexes
// states
// countries
export default {
    getList(): Promise<IDataResponse<ILocation[]>> {
        return request({
            url: `${PATH}/list/${CatalogConstant.TYPE_LOCATIONS}`,
            method: "GET",
        });
    },
};
