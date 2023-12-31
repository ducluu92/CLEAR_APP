import React from "react";
import { Session } from "next-auth";

import { AccountProvider } from "./AccountContext";
// import { FullProfileResource } from "@/src/data/auth/models/types";
import { SWRConfig } from "swr";

interface ProvidersProps {
    children: React.ReactNode;
    profile: IAccountProfile | null;
    accessToken: string | null
}

function Providers(props: ProvidersProps) {

    return (
        <SWRConfig
            value={{
                dedupingInterval: 2000,
                refreshInterval: 0,
                fallback: { a: 1, b: 1 },
                errorRetryCount: 0,
                revalidateOnFocus: true,
                revalidateIfStale: false,
                // revalidateIfStale: true,
                // provider: () => new Map()
            }}
        >
            <AccountProvider profile={props.profile} accessToken={props.accessToken}> 
                {props.children}
            </AccountProvider>
        </SWRConfig>
    );
}

export default Providers;
