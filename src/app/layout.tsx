import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
import RootLayoutCli from "@/components/Layout/RootLayoutCli";
import { getServerSession } from "next-auth";
import { authConfig } from "./api/auth/[...nextauth]/route";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "CLEAR App",
    description: "CLEAR App",
};

const RootLayout = async({
    children,
}: {
    children: React.ReactNode;
}) => {
    const session: any = await getServerSession(authConfig);
    return (
        <html lang="en">
            <body suppressHydrationWarning={true}>
                <RootLayoutCli>{children}</RootLayoutCli>
            </body>
        </html>
    );
}

export default RootLayout
