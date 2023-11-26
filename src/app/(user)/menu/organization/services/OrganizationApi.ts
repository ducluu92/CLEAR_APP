import request from "@/utils/RequestUtils";
const PATH = "organization-user";

export default {
    create(data: IOrganizationSaveRequest): Promise<IDataResponse<any>> {
        return request({
            url: `${PATH}/store`,
            method: "POST",
            data,
        });
    },
    getList(): Promise<IDataResponse<IOrganization[]>> {
        return request({
            url: `${PATH}/list-organization`,
            method: "GET",
        });
    },
    detail(organizationId: number): Promise<IDataResponse<IOrganization>> {
        return request({
            url: `${PATH}/users/${organizationId}`,
            method: "get",
        });
    },
    

    edit(
        id: number,
        data: IOrganizationSaveRequest
    ): Promise<IDataResponse<any>> {
        return request({
            url: `${PATH}/edit/${id}`,
            method: "PUT",
            data,
        });
    },
    createUser(
        organizationId: number,
        data: IOrganizationSaveUserRequest
    ): Promise<IDataResponse<any>> {
        return request({
            url: `${PATH}/add-user/${organizationId}`,
            method: "POST",
            data,
        });
    },
    responseInvitation(organizationId: number, data: IOrganizationUserResponseInvitationRequest): Promise<IDataResponse<any>>{
        return request({
            url: `${PATH}/accept-invite/${organizationId}`,
            method: "POST",
            data,
        })
    },

    getUserList(organizationId: number): Promise<IDataResponse<IOrganizationUser[]>> {
        return request({
            url: `${PATH}/users/${organizationId}`,
            method: "GET",
        });
    },
    removeUser(userId: number): Promise<IDataResponse<any>> {
        return request({
            url: `${PATH}/remove-user/${userId}`,
            method: "DELETE",
        });
    },
    editUser(userId: number, data: IOrganizationSaveUserRequest): Promise<IDataResponse<any>> {
        return request({
            url: `${PATH}/user-update/${userId}`,
            method: "PUT",
            data
        });
    },
    getUserDetail(userId: number, ): Promise<IDataResponse<IOrganizationUser>> {
        return request({
            url: `${PATH}/user-detail/${userId}`,
            method: "GET",
        });
    },
};
