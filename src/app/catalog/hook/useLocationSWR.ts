import useSWR, { Fetcher } from "swr";
import LocationApi from "../services/LocationApi";
export const SWR_LOCATION = "LOCATION_";
export default function useLocationSRW(filter: IBaseQueryParams) {
    const fetcher: Fetcher<IDataResponse<ILocation[]>, string> = (url: string) => {
        return LocationApi.getList()
        
    };
    return useSWR(SWR_LOCATION + JSON.stringify(filter), fetcher);
}
