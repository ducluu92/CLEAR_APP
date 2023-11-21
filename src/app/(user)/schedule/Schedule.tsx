"use client";
import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import useScheduleSRW from "./hooks/useScheduleSRW";
import ScheduleItem from "./components/ScheduleItem";
import Link from "next/link";
export default function Schedule() {
    const [tabIndex, setTabIndex] = useState(1);
    const [filter, setFilter] = useState<IBaseQueryParams>({})
    const {data, isLoading, isValidating} = useScheduleSRW(filter)
    return (
        <div className="space-y-2">
            <div className="flex flex-row justify-between">
                <h3 className="text-primary text-xl">Appointments</h3>
                <Link href={'schedule-create'}>
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
                    Book Appointment
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
            <div className="space-y-3">
                  {data?.map(item => <ScheduleItem key={item.id} item={item} />)}
            </div>
        </div>
    );
}
