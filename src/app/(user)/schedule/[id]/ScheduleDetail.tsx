"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Divider, Input, Skeleton } from "antd";
import Link from "next/link";
import useLocationSRW from "@/app/catalog/hook/useLocationSWR";
import { useParams, useSearchParams } from "next/navigation";
import { useAccountContext } from "@/contexts/AccountContext";
import _ from "lodash";
import ButtonFill from "@/components/Button/ButtonFill";
export default function ScheduleDetail() {
    const { profile }: { profile: IAccountProfile } = useAccountContext();
    const [url, setUrl] = useState("");
    const params = useParams();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    useEffect(() => {
        if (profile && params.id) {
            //if View appointment
            // if (this.currentModuleParams.appointmentId) {
            //     const appointment = await appointmentServer.get(
            //       this.currentModuleParams.appointmentId
            //     );
            //     this.url = appointment.viewUrl;
            //   } else {

            const newUrl = `https://app.acuityscheduling.com/schedule.php?owner=26177856&action=appt&id=${params.id}`;
            setUrl(newUrl);
        }
    }, [profile, params]);
    const onLoadIframe = useCallback(
        (e: any) => {
            setIsLoading(false);
            console.log(123);
        },
        [isLoading, url]
    );
    return (
        <div className="space-y-2">
            <Link href={"/schedule"}>
                <Button
                    className="!text-xs"
                    size="small"
                    type="link"
                    icon={<ArrowLeftOutlined />}
                >
                    Back to appointments
                </Button>
            </Link>

            {!!url ? (
                <div className="space-y-3">
                    {isLoading && <Skeleton active />}
                    <div className="h-[calc(100vh-190px)]">
                        <iframe
                            src={url}
                            title="Schedule Appointment"
                            width="100%"
                            frameBorder="0"
                            className="h-[calc(100vh-190px)]"
                            onLoad={onLoadIframe}
                        ></iframe>
                    </div>
                </div>
            ) : (
                <Skeleton active />
            )}
        </div>
    );
}
