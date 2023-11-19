import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
import RootLayoutCli from "@/components/Layout/RootLayoutCli";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "CLEAR App",
    description: "CLEAR App",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body suppressHydrationWarning={true}>
                <RootLayoutCli>{children}</RootLayoutCli>
            </body>
        </html>
    );
}
