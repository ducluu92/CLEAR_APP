'use client'
import React from "react";
import { Button } from "antd";
import Image from "next/image";
import { QrcodeOutlined } from "@ant-design/icons";
import { signOut } from "next-auth/react";
export default function ActionButtons() {
    return (
        <header className="bg-[#374b73]">
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
                        onClick={() => {signOut()}}
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
        </header>
    );
}
