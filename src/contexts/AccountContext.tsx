"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
// import { FullProfileResource } from '../data/auth/models/types';
import _ from "lodash";
import BaseConstant from "@/constants/BaseConstant";
import AccountApi from "@/app/(user)/menu/account/services/AccountApi";
// import { useSession } from "next-auth/react";
import CookieUtils from "@/utils/CookieUtils";
import { message } from "antd";
import useAccountProfileSRW from "@/app/(user)/menu/account/hooks/useAccountProfileSRW";
import MessageUtils from "@/utils/MessageUtils";

interface AccountContext {
    profile: any;
    reloadProfile: () => void;
    // setProfile: React.Dispatch<React.SetStateAction<string | null>>;
    isLoggedIn: boolean;
}

interface AccountProviderProps {
    children?: React.ReactNode;
    profile: IAccountProfile | null;
    accessToken: string | null;
}

const AccountContext = createContext<AccountContext | null>(null);

export const AccountProvider = (props: AccountProviderProps) => {
    const [profileInFo, setProfileInfo] = useState<IAccountProfile | null>(
        null
    );
    // const session: any = useSession();
    const { profile, accessToken } = props;

    const reloadProfile = async () => {
        try {
            const profile = await AccountApi.getProfile();
            console.log({ profile });
            if (profile?.success) {
                setProfileInfo(profile?.data?.user);
            } else {
                message.error("Error when get usr profile");
            }
        } catch (err) {
            MessageUtils.showResponseError(err);
        }
    };

    useEffect(() => {
        if (accessToken) {
            console.log("has token");
            CookieUtils.setToken(accessToken);
            // getProfile();
        }
    }, [accessToken]);
    useEffect(() => {
        if (profile) {
            setProfileInfo(profile);
        }else{
            reloadProfile()
        }
    }, [profile]);
    // useEffect(() => {
    //     console.log(data, error)
    //     // if (data) {
    //     //     setProfile(data?.data?.user)
    //     // }
    // }, [data, error]);

    return (
        <AccountContext.Provider
            value={{
                profile: profileInFo,
                reloadProfile,
                // setProfile,
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
