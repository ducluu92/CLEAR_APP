"use client";
import DateTimeUtils from "@/utils/DateTimeUtils";
import { Button, Skeleton } from "antd";
import Image from "next/image";
import {
    QrcodeOutlined,
    QuestionCircleFilled,
    CalendarOutlined,
    RightOutlined,
    PhoneOutlined,
    MailOutlined,
    MessageOutlined,
} from "@ant-design/icons";
import ButtonFill from "@/components/Button/ButtonFill";
import { signOut, useSession } from "next-auth/react";
import { PATH_SCHEDULE_ORDER_KIT } from "../schedule/order-kit/OrderKit";
import { PATH_SCHEDULE_QUICK } from "../schedule/quick/QuickSchedule";
import { useAccountContext } from "@/contexts/AccountContext";
import { useRef } from "react";
import ShareResultPopup from "../result/components/ShareResultPopup";
import Link from "next/link";
import { PATH_RESULT } from "../result/Result";
import useResultShareUserListSRW from "../result/hooks/useResultShareUserListSRW";
export const PATH_HOME = "/home";
export default function Home() {
    const session = useSession();
    const { profile }: { profile: IAccountProfile } = useAccountContext();
    const { data, isLoading, isValidating, mutate } =
        useResultShareUserListSRW();
    const resultModalRef = useRef<ModalRefProp>(null);
    return (
        <>
            {profile ? (
                <>
                    <span className="text-sm  text-primary">
                        {DateTimeUtils.getDateTimeFull(
                            new Date().getTime(),
                            false
                        )}
                    </span>
                    <h3 className="text-xl my-3  text-primary">Howdy, Test!</h3>
                    <div className="space-y-3">
                        <div className="flex flex-row justify-between items-center shadow-md border-red-400 border-2 shadow-red-400 rounded-2xl p-4 bg-white">
                            <div>
                                <div className="text-sm font-normal text-red-400">
                                    Get tested anywhere with next day results.
                                </div>
                                <div className="text-[9px]">
                                    Order a CLEAR Ship Kit and walk-in to get
                                    tested at over 250 patner locations.
                                </div>
                                <ButtonFill
                                    href={PATH_SCHEDULE_ORDER_KIT}
                                    title="ORDER KIT"
                                    className="bg-red-300 mt-2 inline-block !px-3"
                                />
                            </div>
                            <Image
                                className="w-11 h-11"
                                width={45}
                                height={45}
                                alt="charity"
                                src={"/image/charity.png"}
                            />
                        </div>

                        <div className="flex flex-row justify-between items-center shadow-md border-black-100 border-[1px] shadow-black-100 rounded-2xl p-4 bg-white">
                            <div>
                                <div className="text-sm font-normal  text-primary">
                                    Get the results you need fast.
                                </div>
                                <div className="text-[9px]  text-primary">
                                    Schedule your appointment today.
                                </div>
                                <ButtonFill
                                    href="/schedule-create"
                                    title="BOOK AN APPOINTMENT"
                                    className="bg-gradient-to-r from-[#374b73] from-30% to-[#1d92ff] mt-2"
                                />
                            </div>
                            <Image
                                className="w-8 h-11"
                                width={45}
                                height={45}
                                alt="charity"
                                src={"/drop-logo.png"}
                            />
                        </div>

                        <div className="flex flex-row justify-between items-center shadow-md border-black-100 border-[1px] shadow-black-100 rounded-2xl p-4 bg-white">
                            <div>
                                <div className="text-sm font-normal text-primary">
                                    Get unlimited testing with CLEAR Pass
                                    <span className="text-xs align-super">
                                        TM
                                    </span>
                                    .
                                </div>
                                <div className="text-[9px]  text-primary">
                                    All the testing you need + perks just $399.
                                </div>
                                <ButtonFill
                                    href={PATH_SCHEDULE_QUICK}
                                    title="SIGN UP NOW"
                                    className="bg-gradient-to-r from-[#374b73] from-30% to-[#1d92ff] mt-2 !inline-block !px-3"
                                />
                            </div>
                            <Image
                                className="w-11 h-11"
                                width={45}
                                height={45}
                                alt="charity"
                                src={"/image/credit.png"}
                            />
                        </div>
                        <div
                            onClick={() => {
                                resultModalRef?.current?.present();
                            }}
                            className="flex cursor-pointer flex-row justify-between items-center shadow-md border-black-100 border-[1px] shadow-black-100 rounded-2xl p-4 bg-white"
                        >
                            <div>
                                <div className="text-sm font-normal  text-primary">
                                    {profile?.result_latest
                                        ? "Get unlimited testing with CLEAR Pass"
                                        : "Share verified results with anyone"}
                                    {!profile?.result_latest && (
                                        <span className="text-xs align-super">
                                            TM
                                        </span>
                                    )}
                                    .
                                </div>
                                <div className="text-[9px]  text-primary">
                                    {profile?.result_latest
                                        ? "Click to share your most recent result with anyone - no login necessary"
                                        : "All the testing you need + perks just $399."}
                                </div>
                            </div>
                            <QrcodeOutlined size={45} className="text-[45px]" />
                        </div>
                        {!!profile?.result_latest && (
                            <div className="flex flex-row justify-between items-center shadow-md border-black-100 border-[1px] shadow-black-100 rounded-2xl p-4 bg-white">
                                <div className="space-y-2">
                                    <div className="text-sm font-normal  text-primary">
                                        My latest results:
                                    </div>
                                    <div className="text-xs  text-primary flex flex-row items-center gap-2">
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
                                                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                                            />
                                        </svg>

                                        <span>
                                            {DateTimeUtils.getDateTimeFull(
                                                profile.result_latest
                                                    .created_at,
                                                false
                                            )}
                                        </span>
                                        <Link
                                            className="text-xs text-red-400"
                                            href={`${PATH_RESULT}/${profile.result_latest.id}`}
                                        >
                                            View
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}
                        {!!data?.data && (
                            <div className="flex flex-col shadow-md border-black-100 border-[1px] shadow-black-100 rounded-2xl p-4 bg-white">
                                <div className="">
                                    <div className="text-sm font-normal  text-primary">
                                        Sharing my results with:
                                    </div>
                                    <div className=" flex flex-col mt-3 gap-2">
                                        {data?.data?.map((item) => (
                                            <div key={item.id}>
                                                <div className="flex flex-row justify-between items-center">
                                                    <div className="text-sm text-primary flex flex-row items-center gap-2">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={3}
                                                            stroke="currentColor"
                                                            className="w-3 h-3 stroke-primary"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
                                                            />
                                                        </svg>
                                                        <span className="text-xs text-primary">
                                                            {item.name}
                                                        </span>
                                                    </div>
                                                    <div className="text-xs text-red-400 italic capitalize">
                                                        {item.type}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                        {!!profile?.appointment_latest && (
                            <div
                                onClick={() => {
                                    window.open("https://www.getclrd.com/faq");
                                }}
                                className="flex cursor-pointer flex-row justify-between items-center shadow-md border-black-100 border-[1px] shadow-black-100 rounded-2xl p-4 bg-white"
                            >
                                <div>
                                    <div className="text-sm font-normal  text-primary">
                                        My next appointment:
                                    </div>
                                    <div className=" flex flex-col mt-3 gap-2">
                                        <div className="flex flex-row items-center text-sm space-x-1  ">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-4 h-4 text-primary"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                                                />
                                            </svg>

                                            <div className="text-[13px] text-gray-text">
                                                {DateTimeUtils.getDateTimeFull(
                                                    profile?.appointment_latest
                                                        ?.start_date_time
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex flex-row items-center text-sm space-x-1">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-4 h-4 text-primary"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>

                                            <div className="text-[13px] text-gray-text">
                                                {DateTimeUtils.getTime(
                                                    profile?.appointment_latest
                                                        ?.start_date_time
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex flex-row items-center text-sm space-x-1">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-4 h-4 text-primary"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                                                />
                                            </svg>

                                            <div className="text-[13px] text-gray-text">
                                                {
                                                    profile?.appointment_latest
                                                        .location.name
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={3}
                                    stroke="currentColor"
                                    className="w-5 h-5 text-primary"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                    />
                                </svg>
                            </div>
                        )}
                        <div
                            onClick={() => {
                                window.open("https://www.getclrd.com/faq");
                            }}
                            className="flex cursor-pointer flex-row justify-between items-center shadow-md border-black-100 border-[1px] shadow-black-100 rounded-2xl p-4 bg-white"
                        >
                            <div>
                                <div className="text-sm font-normal  text-primary">
                                    Questions
                                </div>
                                <div className="text-[9px]  text-primary">
                                    We are here to help
                                </div>
                                <div className="text-xs mt-1  text-primary">
                                    <QuestionCircleFilled /> FAQ - Frequently
                                    Asked Questions
                                </div>
                            </div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={3}
                                stroke="currentColor"
                                className="w-5 h-5 text-primary"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                />
                            </svg>
                        </div>
                        <div className="flex flex-row justify-between items-center shadow-md border-black-100 border-[1px] shadow-black-100 rounded-2xl p-4 bg-white">
                            <div>
                                <div className="text-sm font-normal  text-primary">
                                    Contact US
                                </div>
                                <div className="text-xs mt-1  text-primary">
                                    <CalendarOutlined /> M-F 6 AM - 6 PM Sat &
                                    Sun 6 AM - 2 PM ET
                                </div>
                                <a
                                    className="text-xs mt-1 block text-primary"
                                    href="tel:+18664382573"
                                >
                                    <PhoneOutlined /> (866) GET-CLRD
                                </a>
                                <a
                                    href="mailto:help@getclrd.com"
                                    className="text-xs mt-1 block text-primary"
                                >
                                    <MailOutlined /> help@getclrd.com
                                </a>
                            </div>
                            {/* <div className="w-12 shadow-md shadow-black-100 drop-shadow-md bg-red-400 aspect-square rounded-full flex items-center justify-center">
                        <MessageOutlined className="text-2xl text-white" />
                    </div> */}
                        </div>
                    </div>
                    <ShareResultPopup item={{}} ref={resultModalRef} />
                </>
            ) : (
                <Skeleton active />
            )}
        </>
    );
}
