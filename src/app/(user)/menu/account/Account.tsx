"use client";
import { useAccountContext } from "@/contexts/AccountContext";
import { Button, Divider, Skeleton } from "antd";
import React from "react";
import {
    LogoutOutlined,
    EditOutlined,
    MailOutlined,
    PhoneOutlined,
} from "@ant-design/icons";
import DateTimeUtils from "@/utils/DateTimeUtils";
import { signOut } from "next-auth/react";
import { PATH_ACCOUNT_EDIT } from "./edit/AccountEdit";
import Link from "next/link";
import { PATH_ACCOUNT_EDIT_PASSWORD } from "./edit-password/EditPassword";
import { PATH_ACCOUNT_EDIT_EMAIL } from "./edit-email/EditEmail";
import { PATH_ACCOUNT_EDIT_PHONE } from "./edit-phone/EditPhone";
export const PATH_ACCOUNT = "/menu/account";
export default function MyAccount() {
    const { profile }: { profile: IAccountProfile } = useAccountContext();
    return (
        <>
            {profile ? (
                <div className="space-y-2">
                    <div className="flex flex-row justify-between">
                        <h3 className="text-primary text-xl">My Account</h3>
                        <Button
                            onClick={() => signOut()}
                            className="!text-xs !text-rose-500"
                            size="small"
                            type="link"
                            icon={<LogoutOutlined />}
                        >
                            Logout
                        </Button>
                    </div>

                    <div className="space-y-1">
                        <div className="text-sm text-primary">
                            {profile?.first_name} {profile?.last_name}
                        </div>
                        <div className="text-xs text-[#72809c]">
                            DOB:{" "}
                            {DateTimeUtils.getDateTimeFull(profile?.dob, false)}
                        </div>
                        <div className="text-xs text-[#72809c]">
                            Address: {profile?.address_line_1}
                        </div>
                        <div className="text-xs text-[#72809c]">
                            Country: {profile?.country?.name}
                        </div>
                        <div className="text-xs text-[#72809c]">
                            Sex: {profile?.sex?.name}
                        </div>
                        <div className="text-xs text-[#72809c]">
                            Gender Identity: {profile?.gender_identity?.name}
                        </div>
                        <div className="text-xs text-[#72809c]">
                            Pronouns: {profile?.pronouns}
                        </div>
                        <div className="text-xs text-[#72809c]">
                            Twitter: {profile?.twitter}
                        </div>
                        <div className="text-xs text-[#72809c]">
                            Instagram: {profile?.instagram}
                        </div>
                        <div className="text-xs text-[#72809c]">
                            TikTok: {profile?.tiktok}
                        </div>
                        <div className="text-xs text-[#72809c]">
                            Stage Name 1: {profile?.stage_name_1}
                        </div>
                        <div className="text-xs text-[#72809c]">
                            Stage Name 2: {profile?.stage_name_2}
                        </div>
                        <div className="text-xs text-[#72809c]">
                            Stage Name 3: {profile?.stage_name_3}
                        </div>
                    </div>
                    <div>
                        <Link href={PATH_ACCOUNT_EDIT} className="">
                            <Button
                                className="!text-xs !text-rose-500 !p-0"
                                size="small"
                                type="link"
                                icon={<EditOutlined />}
                            >
                                Edit account information
                            </Button>
                        </Link>
                    </div>
                    <Divider />
                    <div>
                        <Link href={PATH_ACCOUNT_EDIT_PASSWORD} className="">
                            <Button
                                className="!text-xs !text-rose-500 !p-0 flex items-center"
                                size="small"
                                type="link"
                                icon={
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-3 h-3"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                                        />
                                    </svg>
                                }
                            >
                                Change password
                            </Button>
                        </Link>
                    </div>
                    <Divider />
                    <div className="flex justify-between">
                        <Button
                            className="!text-xs !text-[#72809c] !p-0 flex items-center"
                            size="small"
                            type="link"
                            icon={<MailOutlined />}
                        >
                            {profile?.email}
                        </Button>
                        <Link href={PATH_ACCOUNT_EDIT_EMAIL} className="">
                            <Button
                                className="!text-xs !text-rose-500 !p-0 flex items-center"
                                size="small"
                                type="link"
                                icon={<EditOutlined />}
                            >
                                Edit
                            </Button>
                        </Link>
                    </div>
                    <Divider />
                    <div className="flex justify-between">
                        <Button
                            className="!text-xs !text-[#72809c] !p-0 flex items-center"
                            size="small"
                            type="link"
                            icon={<PhoneOutlined />}
                        >
                            {profile?.phone}
                        </Button>
                        <Link href={PATH_ACCOUNT_EDIT_PHONE} className="">
                            <Button
                                className="!text-xs !text-rose-500 !p-0 flex items-center"
                                size="small"
                                type="link"
                                icon={<EditOutlined />}
                            >
                                Edit
                            </Button>
                        </Link>
                    </div>
                    <Divider />
                </div>
            ) : (
                <Skeleton active />
            )}
        </>
    );
}
