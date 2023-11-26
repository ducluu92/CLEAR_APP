import useSWR, { Fetcher } from "swr";
import ResultApi from "../services/ResultApi";
export const SWR_RESULT = "RESULT_";
export default function useResultSRW() {
    const fetcher: Fetcher<IDataResponse<IRresultData>, string> = (url: string) => {
        return ResultApi.getList({});
    };
    return useSWR(SWR_RESULT , fetcher);
}
