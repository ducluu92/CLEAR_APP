import backendRequest from "@/utils/BackendRequestUtils";

const PATH = "profile";

export default {
    getProfile(sessionServer: any): Promise<IDataResponse<IAccountProfileResponse>> {
        return backendRequest(sessionServer, PATH)
    },
    
};
