"use client";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import "nprogress/nprogress.css";
import { ConfigProvider } from "antd";
import themeConfig from "../../theme/themeConfig";
import { useEffect } from "react";
import Providers from "@/contexts/Providers";
import Cookies from "js-cookie";
import StyledComponentsRegistry from "../../../lib/AntdRegistry";
import BaseConstant from "@/constants/BaseConstant";
import nProgress from "nprogress";
import { usePathname, useSearchParams } from "next/navigation";
import { SessionProvider } from "next-auth/react";
const inter = Inter({ subsets: ["latin"] });

const RootLayoutCli = ({
    children,
    ...props
}: {
    children: React.ReactNode;
}) => {
    nProgress.configure({ showSpinner: false });
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (typeof window !== "undefined") {
            const loader = document.getElementById("globalLoader");
            if (loader) loader.remove();
        }
    }, []);
    const accessToken = Cookies.get(BaseConstant.TOKEN_KEY) || null; //CookieUtils.getAccessTokenFromServerContext(context);
    const profile = { a: 1 }; //await new BackendAuthServices(context).getFullInfo();
    useEffect(() => {
        const handleStart = () => {
            nProgress.start();
        };
        const handleStop = () => {
            nProgress.done();
        };

        handleStop();

        return () => {
            handleStart();
        };
    }, [searchParams, pathname]);
    return (
        <div className="max-w-lg mx-auto">
            <div id="globalLoader">
                <img src="/image/spinner.gif" alt="" />
            </div>
            <SessionProvider session={null}>
                <StyledComponentsRegistry>
                    <ConfigProvider theme={themeConfig}>
                        <Providers
                            account={{
                                profile: profile,
                                accessToken: accessToken,
                            }}
                            nextAuthSession={null}
                        >
                            {children}
                        </Providers>
                    </ConfigProvider>
                </StyledComponentsRegistry>
            </SessionProvider>
        </div>
    );
};
export default RootLayoutCli;
