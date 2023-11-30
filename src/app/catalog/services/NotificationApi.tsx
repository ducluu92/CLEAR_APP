import BaseConstant from "@/constants/BaseConstant";
import request from "@/utils/RequestUtils";
const PATH = "notification";
// GET /api/catalog/list/{type}
// gender_identities
// sexes
// states
// countries
export default {
    getList(
        params: IBaseQueryParams
    ): Promise<IDataResponse<INotificationData>> {
        return request({
            url: `${PATH}/list`,
            method: "GET",
            params
        });
    },
    getUnReadCount(
        params: IBaseQueryParams
    ): Promise<IDataResponse<any>> {
        return request({
            url: `${PATH}/unread-count`,
            method: "GET",
            params
        });
    },
    read(
        notificationId: number
    ): Promise<IDataResponse<any>> {
        return request({
            url: `${PATH}/read/${notificationId}`,
            method: "PUT",
        });
    },
};
