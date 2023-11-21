"use client";
import React, { useEffect, useState } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import Link from "next/link";
import useLocationSRW from "@/app/catalog/hook/useLocationSWR";
import LocationItem from "./components/LocationItem";
import { useSearchParams } from "next/navigation";
export default function ScheduleCreate() {
    const [tabIndex, setTabIndex] = useState(1);
    const [url, setUrl] = useState("");
    const [filter, setFilter] = useState<IBaseQueryParams>({});
    const { data, isLoading, isValidating } = useLocationSRW(filter);
    const searchParams = useSearchParams();
    const locationId = searchParams.get("location_id");

    useEffect(() => {
        //if View appointment
        // if (this.currentModuleParams.appointmentId) {
        //     const appointment = await appointmentServer.get(
        //       this.currentModuleParams.appointmentId
        //     );
        //     this.url = appointment.viewUrl;
        //   } else {
            const newUrl = `https://app.squarespacescheduling.com/schedule.php?owner=26177856&firstName=${
              'Luu'
            }&lastName=${'Duc'}&email=${
              'luu@askkpop.com'
            }&phone=${'0387443495'}&calendarID=${'000'}
            ${
                ''
            //   this.currentModuleParams.category
            //     ? "&appointmentType=category:" +
            //       this.categoriesMap[this.currentModuleParams.category]
            //     : ""
            }
            `;
            setUrl(newUrl)
    }, [])
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

            {locationId ? (
                <div className="space-y-3">
                    <div className="h-[400px]">
                        <iframe
                            src={url}
                            title="
          currentModuleParams && currentModuleParams.appointmentId
            ? 'View Appointment'
            : 'Schedule Appointment'
        "
                            width="100%"
                            frameBorder="0"
                            className="h-[400px]"
                        ></iframe>
                    </div>
                </div>
            ) : (
                <>
                    <div className="flex flex-row justify-between">
                        <h3 className="text-primary text-xl">
                            Choose a location
                        </h3>
                    </div>
                    <div className="flex flex-row justify-between gap-2">
                        <Input.Search
                            placeholder="Search location"
                            allowClear
                        />
                    </div>
                    <div className="space-y-3">
                        {data?.map((item) => (
                            <LocationItem key={item.id} item={item} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
