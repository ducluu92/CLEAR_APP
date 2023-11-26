"use client";
import React, { useEffect, useMemo, useState } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Divider, Input, Skeleton } from "antd";
import Link from "next/link";
import useLocationSRW from "@/app/catalog/hook/useLocationSWR";
import LocationItem from "./components/LocationItem";
import { useSearchParams } from "next/navigation";
import { useAccountContext } from "@/contexts/AccountContext";
import _ from "lodash";
import ButtonFill from "@/components/Button/ButtonFill";
import { PATH_SCHEDULE_ORDER_KIT } from "../schedule/order-kit/OrderKit";
export default function ScheduleCreate() {
    const { profile }: { profile: IAccountProfile } = useAccountContext();
    const [searchKey, setSearchKey] = useState("");
    const [url, setUrl] = useState("");
    const [filter, setFilter] = useState<IBaseQueryParams>({});
    const { data, isLoading, isValidating } = useLocationSRW(filter);
    const searchParams = useSearchParams();
    const locationId = searchParams.get("location_id");
    const mainLocations: any = useMemo(() => {
        console.log(data?.data);
        let filterData = data?.data;
        if (searchKey.length > 0) {
            const searchKeyLower = searchKey.toLocaleLowerCase();
            filterData = filterData?.filter(
                (item) =>
                    item.address.toLocaleLowerCase().includes(searchKeyLower) ||
                    item.name.toLocaleLowerCase().includes(searchKeyLower)
            );
        }
        const newData = _.groupBy(filterData, "belongs_to_clear");
        //  = _.chain(data?.data)
        //     .groupBy("belongs_to_clear")
        //     .map((value, key) => ({ key: key, list: value }))
        //     .value();
        console.log({ newData });
        return newData;
    }, [data, searchKey]);
    useEffect(() => {
        if (profile) {
            //if View appointment
            // if (this.currentModuleParams.appointmentId) {
            //     const appointment = await appointmentServer.get(
            //       this.currentModuleParams.appointmentId
            //     );
            //     this.url = appointment.viewUrl;
            //   } else {
            const newUrl = `https://app.squarespacescheduling.com/schedule.php?owner=26177856&firstName=${
                profile?.first_name
            }&lastName=${profile?.last_name}&email=${profile?.email}&phone=${
                profile?.phone
            }&calendarID=${locationId}
            ${
                ""
                //   this.currentModuleParams.category
                //     ? "&appointmentType=category:" +
                //       this.categoriesMap[this.currentModuleParams.category]
                //     : ""
            }
            `;
            setUrl(newUrl);
        }
    }, [profile, locationId]);
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
                    <div className="h-[calc(100vh-190px)]">
                        <iframe
                            src={url}
                            title="
          currentModuleParams && currentModuleParams.appointmentId
            ? 'View Appointment'
            : 'Schedule Appointment'
        "
                            width="100%"
                            frameBorder="0"
                            className="h-[calc(100vh-190px)]"
                        ></iframe>
                    </div>
                </div>
            ) : (
                <>
                    {isLoading ? (
                        <Skeleton active />
                    ) : (
                        <div className="space-y-3">
                            <div className="flex flex-row justify-between">
                                <h3 className="text-primary text-xl">
                                    Choose a location
                                </h3>
                            </div>
                            <div className="flex flex-row justify-between gap-2">
                                <Input.Search
                                    placeholder="Search location"
                                    allowClear
                                    value={searchKey}
                                    onChange={(e) => {
                                        setSearchKey(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="space-y-3 pb-3">
                                {mainLocations["1"]?.map((item: ILocation) => (
                                    <LocationItem key={item.id} item={item} />
                                ))}
                            </div>
                            <Divider />
                            <h4 className="text-primary text-lg">Partners</h4>
                            <div className="space-y-3">
                                {mainLocations["0"]?.map((item: ILocation) => (
                                    <LocationItem key={item.id} item={item} />
                                ))}
                            </div>
                        </div>
                    )}
                </>
            )}

            <div className="bg-white rounded-xl space-y-4 shadow-lg py-5 px-8 relative overflow-hidden pr-2 cursor-pointer items-center flex flex-col">
                <div className="text-primary text-[16px]">
                    Can't find a location near you?
                </div>
                <div className="text-center">
                    <p className="text-xs text-primary">
                        Order a CLEAR Ship Kit and walk into any of over 250
                        partner
                    </p>
                    <p className="text-xs text-primary">
                        locations around the country to get tested.
                    </p>
                </div>
                <ButtonFill
                    href={PATH_SCHEDULE_ORDER_KIT}
                    className="bg-gradient-to-r from-primary from-30% to-secondary mt-2 !px-8 !py-2 !rounded-3xl "
                    labelClassName="!text-sm"
                    title="ORDER SHIP KIT"
                    showIcon={false}
                />
            </div>
        </div>
    );
}
