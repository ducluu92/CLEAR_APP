import useSWR, { Fetcher } from "swr";
import OrganizationApi from "../services/OrganizationApi";
export const SWR_ORGANIZATION = "ORGANIZATION_";
export default function useOrganizationSRW() {
    const fetcher: Fetcher<IDataResponse<IOrganization[]>, string> = (url: string) => {
        return OrganizationApi.getList();
    };
    return useSWR(SWR_ORGANIZATION + 1, fetcher);
}
