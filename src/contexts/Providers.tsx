import React from "react";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

import { AccountProvider } from "./AccountContext";
// import { FullProfileResource } from "@/src/data/auth/models/types";
import { SWRConfig } from "swr";

interface ProvidersProps {
    account: {
        profile: any | null;
        accessToken: string | null;
    };
    children: React.ReactNode;
    nextAuthSession: Session|null;
}

function Providers(props: ProvidersProps) {
    const { account } = props;

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
            <SessionProvider session={props.nextAuthSession}>
                <AccountProvider account={account}>
                    {props.children}
                </AccountProvider>
            </SessionProvider>
        </SWRConfig>
    );
}

export default Providers;
