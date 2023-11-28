import { Button } from "antd";
import type { Metadata } from "next";
import Image from "next/image";
import { QrcodeOutlined } from "@ant-design/icons";
import Menu from "@/components/Layout/Footer/Menu";
import { getServerSession } from "next-auth";
import { authConfig } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import ActionButtons from "@/components/Layout/Header/omponents/ActionButtons";
import backendRequest from "@/utils/BackendRequestUtils";
import BackendAccountApi from "./menu/account/services/BackendAccountApi";
import Providers from "@/contexts/Providers";
import { profile } from "console";
import UserLayoutCli from "@/components/Layout/UserLayoutCli";
import { signOut } from "next-auth/react";

export const metadata: Metadata = {
    title: "CLEAR App",
    description: "CLEAR App",
};

const UserLayout = async ({ children }: { children: React.ReactNode }) => {
    const session: any = await getServerSession(authConfig);
    // const headersList = headers();
    // const cookies = decodeURIComponent(headersList.get("cookie") || "");
    // const reqUrl = CookieUtils.getCookieParams(cookies, "next-auth.callback-url") || "";
    // const url = new URL(reqUrl);
    // const callback = url.pathname
    // console.log({ cookies, pathname, callback, a: JSON.stringify(headersList) });
    let profile = null;
    if (session) {
        profile = await BackendAccountApi.getProfile(session);
        if (!profile || !profile?.success) {
            signOut()
            redirect("/");
        }
    } else {
        redirect("/");
    }
    return (
        <main className="flex h-screen flex-col justify-between ">
            
            <UserLayoutCli accessToken={session?.jwt} profile={profile?.data?.user}>{children}</UserLayoutCli>
        </main>
    );
};
export default UserLayout;
