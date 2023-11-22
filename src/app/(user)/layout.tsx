import { Button } from "antd";
import type { Metadata } from "next";
import Image from "next/image";
import { QrcodeOutlined } from "@ant-design/icons";
import Menu from "@/components/Layout/Footer/Menu";
import { getServerSession } from "next-auth";
import { authConfig } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import ActionButtons from "@/components/Layout/Header/omponents/ActionButtons";

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

    if (!session) {
        redirect("/");
    }
    return (
        <main className="flex h-screen flex-col justify-between ">
            <ActionButtons/>

            <div className="flex-1 bg-[#f5faff] p-3 overflow-y-scroll">
                {children}
            </div>
            <Menu />
            {/* <UserLayout>{children}</UserLayout> */}
        </main>
    );
};
export default UserLayout;
