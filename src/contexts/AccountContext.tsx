"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
// import { FullProfileResource } from '../data/auth/models/types';
import _ from "lodash";
import BaseConstant from "@/constants/BaseConstant";
import AccountApi from "@/app/(user)/menu/account/services/AccountApi";
import { useSession } from "next-auth/react";
import CookieUtils from "@/utils/CookieUtils";
import { message } from "antd";

interface AccountContext {
    profile: any;
    setProfile: React.Dispatch<React.SetStateAction<string | null>>;
    isLoggedIn: boolean;
}

interface AccountProviderProps {
    children?: React.ReactNode;
}

const AccountContext = createContext<AccountContext | null>(null);

export const AccountProvider = (props: AccountProviderProps) => {
    const [profile, setProfile] = useState<any>();

    const session: any = useSession();

    const getProfile = async () => {
        try {
            const profile = await AccountApi.getProfile();
            console.log({ profile });
            if (profile?.success) {
                setProfile(profile?.data?.user);
            } else {
                message.error("Error when get usr profile");
            }
        } catch (err) {}
    };
    useEffect(() => {
        if (session?.data?.jwt) {
            console.log("has token");
            CookieUtils.setToken(session?.data?.jwt);
            getProfile();
        }
    }, [session]);

    return (
        <AccountContext.Provider
            value={{
                profile,
                setProfile,
                isLoggedIn: !_.isNull(profile),
            }}
        >
            {props.children}
        </AccountContext.Provider>
    );
};

export const useAccountContext = () => {
    const context = useContext(AccountContext);
    if (context === null)
        throw new Error(
            "useAccountContext must be used within a AccountProvider"
        );

    return context;
};
