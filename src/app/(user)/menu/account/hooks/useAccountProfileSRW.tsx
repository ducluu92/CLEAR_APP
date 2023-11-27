import useSWR, { Fetcher } from "swr";
import AccountApi from "../services/AccountApi";
export const SWR_ACCOUNT_PROFILE = "ACCOUNT_PROFILE";
export default function useAccountProfileSRW() {
    const fetcher: Fetcher<IDataResponse<IAccountProfileResponse>, string> = (url: string) => {
        return AccountApi.getProfile();
    };
    return useSWR(SWR_ACCOUNT_PROFILE , fetcher);
}
