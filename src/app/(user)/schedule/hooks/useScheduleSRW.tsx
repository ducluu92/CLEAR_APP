import useSWR, { Fetcher } from "swr";
import ScheduleApi from "../services/ScheduleApi";
export const SWR_SCHEDULE = "SCHEDULE_";
export default function useScheduleSRW(filter: IBaseQueryParams) {
    const fetcher: Fetcher<IDataResponse<IAppointmentResponse>, string> = (
        url: string
    ) => {
        return ScheduleApi.getList(filter);
    };
    return useSWR(SWR_SCHEDULE + JSON.stringify(filter), fetcher);
}
