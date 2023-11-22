import request from "@/utils/RequestUtils";
const PATH = "auth";

export default {
    login(data: IAuthLoginRequest): Promise<IDataResponse<any>> {
        // return new Promise((resolve, reject) => {
            return request({
                url: `${PATH}/login-app`,
                method: "POST",
                data,
            })
                // .then((res) => {
                //     const data: IDataResponse<IAuthResponseData> = res.data;
                //     resolve(data);
                // })
                // .catch(reject);
        // });
    },

    register(data: IAuthRegisterRequest): Promise<IDataResponse<any>> {
        // return new Promise((resolve, reject) => {
            return request({
                url: `${PATH}/register-app`,
                method: "POST",
                data,
            })
                // .then((res) => {
                //     const data: IDataResponse<IAuthResponseData> = res.data;
                //     resolve(data);
                // })
                // .catch(reject);
        // });
    },
    verify(data: IAuthVerifyRequest): Promise<IDataResponse<any>>{
        return request({
            url: `${PATH}/verify`,
            method: "POST",
            data,
        })
    },
    forgotPassword(data: IAuthForgotPasswordRequest): Promise<IDataResponse<any>>{
        return request({
            url: `${PATH}/forgot`,
            method: "POST",
            data,
        })
    },
    changePassword(data: IAuthChangePasswordRequest): Promise<IDataResponse<any>>{
        return request({
            url: `${PATH}/new-pass`,
            method: "POST",
            data,
        })
    }

};
