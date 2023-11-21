'use client'
import { usePathname, useRouter } from "next/navigation";
import React from "react";

type Props = {
    item: ILocation;
    onClick?: () => void;
};
export default function LocationItem(props: Props) {
    const { item, onClick } = props;
    const router = useRouter()
    const pathname = usePathname()
    const handleChooseLocation = () => {
        const params = new URLSearchParams()
        params.set('location_id', item.id + '')
        router.push(`${pathname}?${params}`)
    }
    return (
        <div
            className="bg-white rounded-xl shadow-lg py-3 relative overflow-hidden pr-2 cursor-pointer"
            onClick={() => {
                // onClick?.();
                handleChooseLocation()
            }}
        >
            <div className="absolute top-3 bottom-3 w-[5px] bg-primary rounded-r-xl" />
            <div className="pl-4">
                <div className="text-primary text-[16px]">{item?.name}</div>

                <div className="card-info-body space-y-1">
                    <div className="flex flex-row items-center text-sm space-x-1">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4 text-black-text"
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

                        <div className="text-[13px] text-black-text">
                            {item.address}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
