import useSWR, { Fetcher } from "swr";
import CatalogApi from "../services/CatalogApi";

export default function useCatalogSWR(type: string) {
    const fetcher: Fetcher<IDataResponse<ICatalog[]>, string> = (url: string) => {
        return CatalogApi.getList(type)
    };
    return useSWR("CATALOG" + type, fetcher);
}
