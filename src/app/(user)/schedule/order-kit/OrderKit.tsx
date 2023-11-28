"use client";
import React, { useEffect, useState } from "react";
import { Button, Skeleton } from "antd";
import { useSearchParams } from "next/navigation";
import { useAccountContext } from "@/contexts/AccountContext";
import _ from "lodash";
import useOrderKit from "./hooks/useOrderKit";
import OrderKitItem from "./components/OrderKitItem";
import Link from "next/link";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { PATH_HOME } from "../../home/Home";
export const PATH_SCHEDULE_ORDER_KIT = "/schedule/order-kit";

export default function ScheduleCreate() {
    const { profile }: { profile: IAccountProfile } = useAccountContext();
    const searchPrams = useSearchParams();
    const { orderKits } = useOrderKit();
    const [url, setUrl] = useState("");
    useEffect(() => {
        if (searchPrams.has("slug")) {
            if (profile) {
                const slug = searchPrams.get("slug");
                const newUrl = `https://www.getclrd.com/test-kit-payment?CLEARParProductSlug=${slug}&CLEARParFirstName=${profile.first_name}&CLEARParLastName=${profile.last_name}&CLEARParEmail=${profile.email}&CLEARParPhone=${profile.phone}`;
                setUrl(newUrl);
            }
        } else {
            setUrl("");
        }
    }, [profile, searchPrams, url]);
    return (
        <>
            {profile ? (
                <>
                    {url ? (
                        <div className="space-y-3">
                            <Link href={PATH_SCHEDULE_ORDER_KIT}>
                                <Button
                                    className="!text-xs !p-0 text-primary"
                                    size="small"
                                    type="link"
                                    icon={<ArrowLeftOutlined />}
                                >
                                    Back to kits order
                                </Button>
                            </Link>
                            <div className="h-[calc(100vh-200px)]">
                                <iframe
                                    src={url}
                                    title="OrderKit"
                                    width="100%"
                                    frameBorder="0"
                                    className="h-[calc(100vh-200px)]"
                                ></iframe>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            <Link href={PATH_HOME}>
                                <Button
                                    className="!text-xs !p-0 text-primary"
                                    size="small"
                                    type="link"
                                    icon={<ArrowLeftOutlined />}
                                >
                                    Back to home
                                </Button>
                            </Link>
                            <div className="flex flex-row justify-between">
                                <h3 className="text-primary text-xl">
                                    Select your test kit
                                </h3>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                {orderKits.map((item) => (
                                    <OrderKitItem key={item.slug} item={item} />
                                ))}
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <Skeleton active />
            )}
        </>
    );
}
