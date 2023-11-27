import request from "@/utils/RequestUtils";
const PATH = "profile";

export default {
    getProfile(): Promise<IDataResponse<IAccountProfileResponse>> {
        return request({
            url: `${PATH}`,
            method: "GET",
        });
    },
    updateProfile(data: IAccountUpdateRequest): Promise<IDataResponse<any>> {
        return request({
            url: `${PATH}/update`,
            method: "PUT",
            data
        });
    },
    requestEditEmail(data: IAccountEditEmailRequest): Promise<IDataResponse<any>> {
        return request({
            url: `${PATH}/email-code`,
            method: "POST",
            data
        });
    },
    verifyEditEmail(data: IAccountEditEmailVerifyRequest): Promise<IDataResponse<any>> {
        return request({
            url: `${PATH}/email`,
            method: "PUT",
            data
        });
    },
    requestEditPhone(data: IAccountEditPhoneRequest): Promise<IDataResponse<any>> {
        return request({
            url: `${PATH}/phone-code`,
            method: "POST",
            data
        });
    },
    verifyEditPhone(data: IAccountEditPhoneVerifyRequest): Promise<IDataResponse<any>> {
        return request({
            url: `${PATH}/phone`,
            method: "PUT",
            data
        });
    },
    editPassword(data: IAccountEditPasswordRequest): Promise<IDataResponse<any>> {
        return request({
            url: `${PATH}/change-pass`,
            method: "PUT",
            data
        });
    },
};
