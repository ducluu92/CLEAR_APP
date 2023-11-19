import { mutate } from "swr";

export default class SWRUtils {
    static mutatePagination(basePath: string) {
        mutate(
            (key) => typeof key === "string" && key.startsWith(basePath),
            undefined,
            { revalidate: true },
        );
    }

    static clearAllCache = () =>
        mutate(() => true, undefined, { revalidate: false });
}
