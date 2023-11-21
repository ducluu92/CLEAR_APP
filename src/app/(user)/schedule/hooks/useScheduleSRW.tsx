import useSWR, { Fetcher } from "swr";
export const SWR_SCHEDULE = "SCHEDULE_";
export default function useScheduleSRW(filter: IBaseQueryParams) {
    const fetcher: Fetcher<IAppointment[], string> = (url: string) => {
        // return AgencyApi.getList(type, filter);
        return new Promise((resolve, reject) => {
            const data: IAppointment[] = [
                {
                    id: 1,
                    end_date_time: "123",
                    location: "LA",
                    notes: "123",
                    price: 209,
                    start_date_time: "456",
                    test_panel: "CLEAR PANEL",
                    view_url: "",
                },
                {
                    id: 2,
                    end_date_time: "123",
                    location: "LA",
                    notes: "123",
                    price: 209,
                    start_date_time: "456",
                    test_panel: "CLEAR PANEL",
                    view_url: "",
                },
            ];
            resolve(data)
        });
    };
    return useSWR(SWR_SCHEDULE + JSON.stringify(filter), fetcher);
}
