"use client";
import React, { useEffect, useState } from "react";
import { Button, Skeleton } from "antd";
import { useSearchParams } from "next/navigation";
import { useAccountContext } from "@/contexts/AccountContext";
import _ from "lodash";
import Link from "next/link";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { PATH_HOME } from "../../home/Home";
export const PATH_SCHEDULE_QUICK = "/schedule/quick";

export default function QuickSchedule() {
    const { profile }: { profile: IAccountProfile } = useAccountContext();
    const [url, setUrl] = useState("");
    useEffect(() => {
        if (profile) {
            const acuitySubscriptionId = 1380448;
            const newUrl = `https://app.squarespacescheduling.com/catalog.php?owner=26177856&action=addCart&id=${acuitySubscriptionId}&clear=1&firstName=${profile?.first_name}&lastName=${profile?.last_name}&email=${profile?.email}&phone=${profile?.phone}`;
            setUrl(newUrl);
        }
    }, [profile, url]);
    return (
        <>
            {profile ? (
                <>
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
                </>
            ) : (
                <Skeleton active />
            )}
        </>
    );
}
