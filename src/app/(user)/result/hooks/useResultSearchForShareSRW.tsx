import useSWR, { Fetcher } from "swr";
import ResultApi from "../services/ResultApi";
export const SWR_RESULT_SEARCH_FOR_SHARE = "RESULT_SEARCH_FOR_SHARE_";
export default function useResultSearchForShareSRW(filter: IBaseQueryParams) {
    const fetcher: Fetcher<IDataResponse<IResultUserForShare[]>, string> = (
        url: string
    ) => {
        return ResultApi.searchForShare(filter);
    };
    return useSWR(
        SWR_RESULT_SEARCH_FOR_SHARE + JSON.stringify(filter),
        fetcher
    );
}
