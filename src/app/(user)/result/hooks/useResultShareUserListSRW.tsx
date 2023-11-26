import useSWR, { Fetcher } from "swr";
import ResultApi from "../services/ResultApi";
export const SWR_RESULT_SHARE_USER_LIST = "RESULT_SHARE_USER_LIST";
export default function useResultShareUserListSRW() {
    const fetcher: Fetcher<IDataResponse<IResultUserForShare[]>, string> = (url: string) => {
        return ResultApi.getListUserShare();
    };
    return useSWR(SWR_RESULT_SHARE_USER_LIST , fetcher);
}
