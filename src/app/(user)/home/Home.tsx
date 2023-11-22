"use client";
import DateTimeUtils from "@/utils/DateTimeUtils";
import { Button } from "antd";
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

export default function Home() {
    const session = useSession()
    console.log({session})
    return (
        <>
            <span className="text-sm  text-primary">
                {DateTimeUtils.getDateTimeFull(new Date().getTime(), false)}
            </span>
            <h3 className="text-xl my-3  text-primary">Howdy, Test!</h3>
            <div className="space-y-3">
                <div className="flex flex-row justify-between items-center shadow-md border-red-400 border-2 shadow-red-400 rounded-2xl p-4 bg-white">
                    <div>
                        <div className="text-sm font-normal text-red-400">
                            Get tested anywhere with next day results.
                        </div>
                        <div className="text-[9px]">
                            Order a CLEAR Ship Kit and walk-in to get tested at
                            over 250 patner locations.
                        </div>
                        <ButtonFill
                            title="ORDER KIT"
                            className="bg-red-300 mt-2"
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
                            <span className="text-xs align-super">TM</span>.
                        </div>
                        <div className="text-[9px]  text-primary">
                            All the testing you need + perks just $399.
                        </div>
                        <ButtonFill
                            title="SIGN UP NOW"
                            className="bg-gradient-to-r from-[#374b73] from-30% to-[#1d92ff] mt-2"
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
                <div className="flex flex-row justify-between items-center shadow-md border-black-100 border-[1px] shadow-black-100 rounded-2xl p-4 bg-white">
                    <div>
                        <div className="text-sm font-normal  text-primary">
                            Get unlimited testing with CLEAR Pass
                            <span className="text-xs align-super">TM</span>.
                        </div>
                        <div className="text-[9px]  text-primary">
                            All the testing you need + perks just $399.
                        </div>
                    </div>
                    <QrcodeOutlined size={45} className="text-[45px]" />
                </div>
                <div className="flex flex-row justify-between items-center shadow-md border-black-100 border-[1px] shadow-black-100 rounded-2xl p-4 bg-white">
                    <div>
                        <div className="text-sm font-normal  text-primary">
                            Questions
                        </div>
                        <div className="text-[9px]  text-primary">
                            We are here to help
                        </div>
                        <div className="text-xs mt-1  text-primary">
                            <QuestionCircleFilled /> FAQ - Frequently Asked
                            Questions
                        </div>
                    </div>
                    <RightOutlined className="font-bold" />
                </div>
                <div className="flex flex-row justify-between items-center shadow-md border-black-100 border-[1px] shadow-black-100 rounded-2xl p-4 bg-white">
                    <div>
                        <div className="text-sm font-normal  text-primary">
                            Contact US
                        </div>
                        <div className="text-xs mt-1  text-primary">
                            <CalendarOutlined /> M-F 6 AM - 6 PM Sat & Sun 6 AM
                            - 2 PM ET
                        </div>
                        <div className="text-xs mt-1  text-primary">
                            <PhoneOutlined /> M-F 6 AM - 6 PM Sat & Sun 6 AM - 2
                            PM ET
                        </div>
                        <div className="text-xs mt-1  text-primary">
                            <MailOutlined /> M-F 6 AM - 6 PM Sat & Sun 6 AM - 2
                            PM ET
                        </div>
                    </div>
                    <div className="w-12 shadow-md shadow-black-100 drop-shadow-md bg-red-400 aspect-square rounded-full flex items-center justify-center">
                        <MessageOutlined className="text-2xl text-white" />
                    </div>
                </div>
            </div>
        </>
    );
}
