"use client";
import { Button, Input, message } from "antd";
import Link from "next/link";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { ArrowLeftOutlined, QrcodeOutlined } from "@ant-design/icons";
import ShareResultPopup from "../components/ShareResultPopup";
import Guide from "../components/Guide";
import { PATH_RESULT } from "../Result";
import { useRouter } from "next/navigation";
import ResultConstant from "../constants/ResultConstant";
import QRGuide from "../components/QRGuide";
import ButtonFill from "@/components/Button/ButtonFill";
import useResultShareUserListSRW from "../hooks/useResultShareUserListSRW";
import nProgress from "nprogress";
import ResultApi from "../services/ResultApi";
import MessageUtils from "@/utils/MessageUtils";
import SWRUtils from "@/utils/SWRUtils";
export const PATH_RESULT_SHARE = "/result/sharing";
export default function ResultSharing() {
    const [tabIndex, setTabIndex] = useState(1);
    const router = useRouter();
    const [filter, setFilter] = useState<IBaseQueryParams>({});
    const [isLoadingAction, setIsLoadingAction] = useState(false);
    const [deletedList, setDeletedList] = useState<number[]>([]);
    const { data, isLoading, isValidating, mutate } = useResultShareUserListSRW();
    const goToSharingSearch = useCallback((type: number) => {
        router.push(`${PATH_RESULT_SHARE}/${type}`);
    }, []);
    const handleSave = useCallback(() => {
        setIsLoadingAction(true);
        nProgress.start();
        ResultApi.revokeShare({ revoke_ids: deletedList })
            .then((res) => {
                message.success("Success!");
                mutate()
            })
            .catch((err) => {
                MessageUtils.showResponseError(err);
            })
            .finally(() => {
                nProgress.done();
                setIsLoadingAction(false);
            });
    }, [deletedList]);
    const handleRemoveUser = useCallback(
        (item: IResultUserForShare) => {
            setDeletedList([...deletedList, item.id]);
        },
        [deletedList]
    );

    const shareUsers: IResultUserForShare[] = useMemo(() => {
        return data?.data
            ? data?.data?.filter((item) => !deletedList.includes(item.id))
            : [];
    }, [data, deletedList]);

    return (
        <div className="space-y-4 pb-[200px]">
            <Link href={PATH_RESULT}>
                <Button
                    className="!text-xs !p-0 text-primary"
                    size="small"
                    type="link"
                    icon={<ArrowLeftOutlined />}
                >
                    Back to result
                </Button>
            </Link>
            <div className="flex flex-row justify-between">
                <h3 className="text-primary text-xl">Sharing</h3>
            </div>
            <div className="flex flex-row justify-between  gap-4">
                <div
                    onClick={() =>
                        goToSharingSearch(ResultConstant.SHARING_ONE_TIME)
                    }
                    className="rounded-xl shadow-lg p-4 flex flex-row items-center gap-1 cursor-pointer flex-1 border-slate-50 border-[1px] hover:bg-red-100"
                >
                    <div className="space-y-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 text-red-400"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"
                            />
                        </svg>

                        <div className="flex flex-col space-y-3  ">
                            <div className="text-red-400 text-semibold font-lg">
                                One-Time Share
                            </div>
                            <p className="text-xs text-gray-text">
                                Great way to share your results with a performer
                                you are shooting a scene with.
                            </p>
                        </div>
                    </div>
                    <div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={3}
                            stroke="currentColor"
                            className="w-6 h-6 text-red-400"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8.25 4.5l7.5 7.5-7.5 7.5"
                            />
                        </svg>
                    </div>
                </div>
                <div
                    onClick={() =>
                        goToSharingSearch(ResultConstant.SHARING_CONTINUOUS)
                    }
                    className="rounded-xl shadow-lg p-4 flex flex-row items-center gap-1 cursor-pointer flex-1 border-slate-50 border-[1px] hover:bg-blue-100"
                >
                    <div className="space-y-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 text-primary"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m0-3l-3-3m0 0l-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75"
                            />
                        </svg>

                        <div className="flex flex-col space-y-3  ">
                            <div className="text-primary text-semibold font-lg">
                                Continuous Share
                            </div>
                            <p className="text-xs text-gray-text">
                                A good way to share with agents and producers
                                you work with often.
                            </p>
                        </div>
                    </div>
                    <div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={3}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8.25 4.5l7.5 7.5-7.5 7.5"
                            />
                        </svg>
                    </div>
                </div>
            </div>
            <QRGuide />
            <div className="flex flex-col justify-between">
                <h3 className="text-primary text-xl">Revoke Sharing</h3>
                <div className="mt-4">
                    {shareUsers.map((item) => (
                        <div key={item.id} className="py-1">
                            <div className="flex flex-row justify-between items-center">
                                <div className="text-sm text-primary flex flex-row items-center gap-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={3}
                                        stroke="currentColor"
                                        className="w-4 h-4 stroke-primary"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
                                        />
                                    </svg>
                                    <span className="text-sm text-primary">
                                        {item.name}
                                    </span>
                                </div>
                                <div
                                    onClick={() => handleRemoveUser(item)}
                                    className="text-sm text-red-400 italic cursor-pointer"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={4}
                                        stroke="currentColor"
                                        className="w-4 h-4 stroke-red-400"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {(deletedList.length > 0 || shareUsers.length > 0) && (
                    <div className="mt-4 mb-8 pb-8">
                        <ButtonFill
                            onClick={handleSave}
                            disabled={isLoadingAction}
                            className={` bg-gradient-to-r from-primary from-30% to-secondary mt-2 !px-7 !py-2 !rounded-3xl `}
                            labelClassName="!text-sm"
                            title={"Save"}
                            showIcon={false}
                        />
                    </div>
                )}
            </div>
            <Guide />
        </div>
    );
}
