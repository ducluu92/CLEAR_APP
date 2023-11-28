"use client";
import React, { useMemo, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Skeleton } from "antd";
import useScheduleSRW from "./hooks/useScheduleSRW";
import ScheduleItem from "./components/ScheduleItem";
import Link from "next/link";
export const PATH_SCHEDULE = "/schedule";
export default function Schedule() {
    const [tabIndex, setTabIndex] = useState(1);
    const [filter, setFilter] = useState<IBaseQueryParams>({});
    const { data, isLoading, isValidating } = useScheduleSRW(filter);
    const appointments = useMemo(() => {
        return tabIndex === 1 ? data?.data?.upcoming : data?.data?.past;
    }, [data, tabIndex]);
    return (
        <>
            <div className="space-y-2">
                <div className="flex flex-row justify-between">
                    <h3 className="text-primary text-xl">Appointments</h3>
                    <Link href={"schedule-create"}>
                        <Button
                            className="!text-xs"
                            size="small"
                            type="link"
                            icon={<PlusOutlined />}
                        >
                            Book Appointment
                        </Button>
                    </Link>
                </div>
                <div className="flex flex-row justify-between gap-2">
                    <Button
                        onClick={() => {
                            setTabIndex(1);
                        }}
                        className={`!bg-primary !text-white flex-1 ${
                            tabIndex !== 1 && "opacity-70"
                        }`}
                    >
                        Upcoming
                    </Button>
                    <Button
                        onClick={() => {
                            setTabIndex(2);
                        }}
                        className={`!bg-primary !text-white flex-1 ${
                            tabIndex !== 2 && "opacity-70"
                        }`}
                    >
                        Past
                    </Button>
                </div>
                {isLoading ? (
                    <Skeleton active />
                ) : (
                    <>
                        <div className="space-y-3">
                            {appointments?.map((item) => (
                                <ScheduleItem key={item.id} item={item} />
                            ))}
                        </div>
                    </>
                )}
            </div>
            {!appointments ||
                (appointments.length < 1 && (
                    <div className="flex flex-1 items-center justify-center text-sm text-gray-text">
                        No appointments to display
                    </div>
                ))}
        </>
    );
}
