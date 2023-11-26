"use client";
import ButtonFill from "@/components/Button/ButtonFill";
import { Image } from "antd";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

type Props = {
    item: ITestKit;
    onClick?: () => void;
};
export default function OrderKitItem(props: Props) {
    const { item, onClick } = props;
    const router = useRouter();
    const pathname = usePathname();
    const handleChoose = () => {
        const params = new URLSearchParams();
        params.set('slug', item.slug)
        router.push(`${pathname}?${params}`);
    };
    return (
        <div
            className={`bg-white rounded-xl shadow-md p-4 relative overflow-hidden cursor-pointer flex flex-col justify-between ${
                item.is_best_choice &&
                "shadow-pink-400 border-pink-400 border-[1px]"
            }`}
        >
            <div>
                <Image
                    preview={false}
                    src={item.image}
                    alt=""
                    className="w-100"
                />
                <div className="text-primary text-sm mt-2">{item?.name}</div>

                <div className="text-[13px] text-primary my-6">
                    {item.description}
                </div>
            </div>
            <div>
                <div className="text-[13px] text-primary">${item.price}</div>
                <ButtonFill
                    onClick={() => {
                        handleChoose();
                    }}
                    className={`  mt-2 !px-4 !py-2 !rounded-3xl ${
                        item.is_best_choice
                            ? "bg-pink-400"
                            : "from-primary  to-secondary bg-gradient-to-r from-30%"
                    }`}
                    labelClassName="!text-sm"
                    title="ORDER KIT"
                />
            </div>
        </div>
    );
}
