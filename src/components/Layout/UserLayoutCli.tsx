"use client";
import React from "react";
import Menu from "./Footer/Menu";
import Image from "next/image";
import { Button } from "antd";
import { QrcodeOutlined } from "@ant-design/icons";
import { signOut } from "next-auth/react";
import Providers from "@/contexts/Providers";
import ActionButtons from "./Header/omponents/ActionButtons";

type Props = {
    children: React.ReactNode;
    profile: IAccountProfile | null;
    accessToken: string | null;
};
export default function UserLayoutCli({
    children,
    profile,
    accessToken,
}: Props) {
    return (
        <>
            <Providers profile={profile} accessToken={accessToken}>
                <ActionButtons />

                <div className="flex-1 bg-[#f5faff] p-3 overflow-auto">
                    {children}
                </div>
            </Providers>
            <Menu />
            <script src="//code.jivosite.com/widget/ELMMCKvWKE" async></script>
        </>
    );
}
