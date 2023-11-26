"use client";
import { Button, Input, Skeleton } from "antd";
import Link from "next/link";
import React, { useMemo, useRef, useState } from "react";
import { ExportOutlined, PlayCircleFilled } from "@ant-design/icons";
import useResultSRW from "./hooks/useResultSRW";
import ResultItem from "./components/ResultItem";
import Guide from "./components/Guide";
import ShareResultPopup from "./components/ShareResultPopup";
import useResultSearchForShareSRW from "./hooks/useResultSearchForShareSRW";
import { PATH_RESULT_SHARE } from "./sharing/ResultSharing";
import QRGuide from "./components/QRGuide";
import ShareResultItem from "./components/ShareResultItem";

export const PATH_RESULT = "/result";
export default function Result() {
    const [tabIndex, setTabIndex] = useState(1);
    const [filter, setFilter] = useState<IBaseQueryParams>({});
    const { data, isLoading, isValidating } = useResultSRW();
    const shareResults = useMemo(() => {
        const searchKey = filter.keyword || ''
        return data?.data?.shared?.filter(item => {
            return item.user?.first_name?.includes(searchKey) ||
            item.user?.last_name?.includes(searchKey) ||
            item.user?.stage_name_1?.includes(searchKey) ||
            item.user?.stage_name_2?.includes(searchKey) ||
            item.user?.stage_name_3?.includes(searchKey) ||
            item.user?.twitter?.includes(searchKey) ||
            item.user?.instagram?.includes(searchKey) ||
            item.user?.tiktok?.includes(searchKey) ||
            item.name.includes(searchKey)
        })
    }, [filter, data])
    return (
        <div className="space-y-4 pb-[200px]">
            <div className="flex flex-row justify-between">
                <h3 className="text-primary text-xl">Results</h3>
                <Link href={PATH_RESULT_SHARE}>
                    <Button
                        className="!text-xs"
                        size="small"
                        type="link"
                        icon={<ExportOutlined />}
                    >
                        Share your result
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
                    Share with me
                </Button>
                <Button
                    onClick={() => {
                        setTabIndex(2);
                    }}
                    className={`!bg-primary !text-white flex-1 ${
                        tabIndex !== 2 && "opacity-70"
                    }`}
                >
                    My results
                </Button>
            </div>
            {isLoading ? (
                <Skeleton active />
            ) : (
                <>
                    {tabIndex === 1 ? (
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-row justify-between gap-10 py-3">
                                <p className="text-gray-text text-sm ">
                                    Performers can share results with you and
                                    you will be notified when new results become
                                    available.
                                </p>
                                <a
                                    className="flex flex-col items-center gap-1"
                                    href="https://www.getclrd.com/faq?questionId=df8a7d10-835e-4d9c-9f92-c5a8d0ad4cc2&appDefId=14c92d28-031e-7910-c9a8-a670011e062d"
                                >
                                    <PlayCircleFilled className="text-2xl text-primary" />
                                    <p className="text-xs whitespace-nowrap text-gray-text">
                                        Learn how
                                    </p>
                                </a>
                            </div>
                            <Input.Search
                                value={filter.keyword}
                                onChange={(e) => {
                                    setFilter({
                                        ...filter,
                                        keyword: e.target.value,
                                    });
                                }}
                                placeholder="legal name, stage name, or twitter handle..."
                                className="text-xs placeholder:text-xs"
                            />
                            <div className="space-y-3 mt-4">
                                {shareResults?.map((item) => (
                                    <ShareResultItem key={item.id} item={item} />
                                ))}
                                <QRGuide />
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-3 mt-4">
                            {!!data?.data?.mine && (
                                <ResultItem item={data?.data?.mine} />
                            )}
                            <QRGuide />
                        </div>
                    )}
                </>
            )}

            <Guide />
        </div>
    );
}
