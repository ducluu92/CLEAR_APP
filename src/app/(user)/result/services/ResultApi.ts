import request from "@/utils/RequestUtils";
const PATH_USER = "user";
const PATH = "results-user";

export default {
    searchForShare(
        params: IBaseQueryParams
    ): Promise<IDataResponse<IResultUserForShare[]>> {
        return request({
            url: `${PATH_USER}/search-for-share`,
            method: "GET",
            params,
        });
    },
    saveForShare(data: IResultShareUserRequest): Promise<IDataResponse<any>> {
        return request({
            url: `${PATH}/share`,
            method: "POST",
            data,
        });
    },
    revokeShare(data: IResultRevokeShareUserRequest): Promise<IDataResponse<any>> {
        return request({
            url: `${PATH}/revoke`,
            method: "POST",
            data,
        });
    },
    getListUserShare(): Promise<IDataResponse<IResultUserForShare[]>> {
        return request({
            url: `${PATH}/user-sharing`,
            method: "GET",
        });
    },
    getList(params: IBaseQueryParams): Promise<IDataResponse<IRresultData>> {
        return request({
            url: `${PATH}/list`,
            method: "GET",
            params,
        });
    },
    viewResult(resultId: number): Promise<any> {
        return request({
            url: `${PATH}/files/${resultId}`,
            method: "GET",
            responseType: "blob",
        });
    },
    viewResultPublic(resultId: number): Promise<any> {
        return request({
            url: `public/files/${resultId}`,
            method: "GET",
            responseType: "blob",
        });
    },
};
