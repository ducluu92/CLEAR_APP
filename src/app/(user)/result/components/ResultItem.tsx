import { Tag, message } from "antd";
import Image from "next/image";
import nProgress from "nprogress";
import React from "react";
import ResultApi from "../services/ResultApi";
import { useRouter } from "next/navigation";
import { PATH_RESULT } from "../Result";

type Props = {
    item: IResult;
};
export default function ResultItem(props: Props) {
    const { item } = props;
   const router = useRouter()
    return (
        <div
            onClick={() => {
                router.push(`${PATH_RESULT}/${item.id}`)
            }}
            className="bg-white rounded-xl shadow-lg py-3 relative overflow-hidden pr-2 cursor-pointer"
        >
            <div className="absolute top-3 bottom-3 w-[5px] bg-primary rounded-r-xl" />
            <div className=" flex flex-row justify-between items-center">
                <div className="pl-4">
                    {/* <div className="text-primary text-[16px]">
                    {item?.created_at}
                </div> */}

                    <div className="card-info-body space-y-1">
                        <div className="flex flex-row items-center text-sm space-x-1">
                            <Image
                                src="/drop-green.png"
                                width={11}
                                height={15}
                                alt=""
                            />

                            <div className="text-[13px] text-black-text">
                                {" "}
                                November 21, 2023{" "}
                            </div>
                        </div>

                        <div className="flex flex-row items-center text-sm">
                            <div className="text-[13px] text-black-text">
                                {item?.name}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row items-center gap-4">
                    <Tag color="#28a745" className="rounded-xl text-xs !px-3 ">
                        Final
                    </Tag>
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
            </div>
        </div>
    );
}
