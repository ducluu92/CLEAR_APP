'use client'
import React, { createContext, useContext, useState } from 'react';
import Cookies from 'js-cookie';
// import { FullProfileResource } from '../data/auth/models/types';
import _ from 'lodash';
import BaseConstant from '@/constants/BaseConstant';

interface AccountContext {
    accessToken: string | null,
    setAccessToken: React.Dispatch<React.SetStateAction<string | null>>
    auth: any | null,
    isLoggedIn: boolean,
}

interface AccountProviderProps {
    account: {
        profile: any | null;
        accessToken: string | null;
    };
    children?: React.ReactNode;
}

const AccountContext = createContext<AccountContext | null>(null);

export const AccountProvider = (props: AccountProviderProps) => {

    const { account } = props;
    const [accessToken, setAccessToken] = useState<string | null>(Cookies.get(BaseConstant.TOKEN_KEY) || null);

    return (
        <AccountContext.Provider
            value={{
                accessToken: accessToken,
                setAccessToken: setAccessToken,
                auth: account.profile,
                isLoggedIn: !_.isNull(account.profile),
            }}
        >
            {props.children}
        </AccountContext.Provider>
    );

};


export const useAccountContext = () => {
    const context = useContext(AccountContext);
    if (context === null) throw new Error('useAccountContext must be used within a AccountProvider');

    return context;
};
