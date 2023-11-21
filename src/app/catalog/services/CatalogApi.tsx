import BaseConstant from "@/constants/BaseConstant";
import request from "@/utils/RequestUtils";
const PATH = "catalog";
// GET /api/catalog/list/{type}
// gender_identities
// sexes
// states
// countries
export default {
    getList(
        type: string = BaseConstant.TYPE_ALL,
    ): Promise<IDataResponse<ICatalog[]>> {
        return request({
            url: `${PATH}/list/${type}`,
            method: "GET",
        });
    },
};
