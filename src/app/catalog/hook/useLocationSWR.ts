import useSWR, { Fetcher } from "swr";
export const SWR_LOCATION = "LOCATION_";
export default function useLocationSRW(filter: IBaseQueryParams) {
    const fetcher: Fetcher<ILocation[], string> = (url: string) => {
        // return AgencyApi.getList(type, filter);
        return new Promise((resolve, reject) => {
            const data: ILocation[] = [
                {
                    id:1,
                    name: "Accupoint Labs - Mobile, AL",
                    calendar_id: "8604636",
                    belongs_to_clear: false,
                    address: "620 Hwy 43 S, Saraland, AL 36571, USA",
                },
                {
                    id:2,
                    name: "AFC Urgent Care - Hillsdale, NJ",
                    calendar_id: "8684182",
                    belongs_to_clear: false,
                    address: "2 Broadway Hillsdale, NJ 07642",
                },
                {
                    id:3,
                    name: "AFC Urgent Care - Paramus, NJ",
                    calendar_id: "8684178",
                    belongs_to_clear: false,
                    address: "67C East Ridgewood Avenue Paramus, NJ 07652",
                },
                {
                    id:14,
                    name: "Affordable Rapid Testing - Phoenix, AZ",
                    calendar_id: "8570955",
                    belongs_to_clear: false,
                    address: "700 E Baseline Rd d2, Tempe, AZ 85283, USA",
                },
            ];
            resolve(data);
        });
    };
    return useSWR(SWR_LOCATION + JSON.stringify(filter), fetcher);
}
