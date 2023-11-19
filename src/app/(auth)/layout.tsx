import { Button } from "antd";
import type { Metadata } from "next";
import Image from "next/image";
import { QrcodeOutlined } from "@ant-design/icons";
import Menu from "@/components/Layout/Footer/Menu";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authConfig } from "../api/auth/[...nextauth]/route";

export const metadata: Metadata = {
    title: "CLEAR App",
    description: "CLEAR App",
};
const AuthLayout = async({
    children,
}: {
    children: React.ReactNode;
}) => {
    const session = await getServerSession(authConfig);
    // const headersList = headers();
    // const cookies = decodeURIComponent(headersList.get("cookie") || "");
    // const reqUrl = CookieUtils.getCookieParams(cookies, "next-auth.callback-url") || "";
    // const url = new URL(reqUrl);
    // const callback = url.pathname
    // console.log({ cookies, pathname, callback, a: JSON.stringify(headersList) });

    if (session) {
        // redirect("/auth/login");
        redirect("/home");
    }
    return (
        <main className="flex h-screen flex-col justify-between ">
            {/* <header className="bg-[#374b73]">
                <nav
                    className="flex max-w-lg items-center justify-between p-5"
                    aria-label="Global"
                >
                    <div className="flex flex-row space-x-2">
                        <Image
                            width={22}
                            height={30}
                            src={"/drop-logo.png"}
                            alt="Clear"
                        />
                        <Image
                            width={100}
                            height={30}
                            src={"/clear-white-text.png"}
                            alt="Clear"
                        />
                    </div>

                    <div className="flex flex-row space-x-2">
                        <Button
                            icon={<QrcodeOutlined />}
                            shape="round"
                            className="bg-white aspect-square !p-0"
                        />
                        <Button
                            className="bg-white aspect-square !p-0 !pt-[2px]"
                            icon={
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                                    />
                                </svg>
                            }
                            shape="round"
                        />
                    </div>
                </nav>
            </header> */}

            {/* <div className="flex-1 bg-[#f5faff] p-3 overflow-y-scroll">{children}</div>
            <Menu /> */}
            {children}
        </main>
    );
}
export default AuthLayout