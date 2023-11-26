import request from "@/utils/RequestUtils";
const PATH = "appointments-user";

export default {
    getList(
        params: IBaseQueryParams
    ): Promise<IDataResponse<IAppointmentResponse>> {
        return request({
            url: `${PATH}/list`,
            method: "GET",
            params,
        });
    },
};
