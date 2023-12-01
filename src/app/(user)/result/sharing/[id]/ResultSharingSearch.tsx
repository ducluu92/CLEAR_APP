"use client";
import { Button, Divider, Input, List, message } from "antd";
import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeftOutlined, QrcodeOutlined } from "@ant-design/icons";
import ShareResultPopup from "../../components/ShareResultPopup";
import Guide from "../../components/Guide";
import { useParams, useRouter } from "next/navigation";
import ResultConstant from "../../constants/ResultConstant";
import useResultSearchForShareSRW from "../../hooks/useResultSearchForShareSRW";
import ButtonFill from "@/components/Button/ButtonFill";
import useDebounce from "@/hooks/useDebounce";
import QRGuide from "../../components/QRGuide";
import ResultApi from "../../services/ResultApi";
import MessageUtils from "@/utils/MessageUtils";
import nProgress from "nprogress";
import SWRUtils from "@/utils/SWRUtils";
import { SWR_RESULT_SHARE_USER_LIST } from "../../hooks/useResultShareUserListSRW";

export const PATH_RESULT_SHARE = "/result/sharing";
export default function ResultSharingSearch() {
    const params = useParams();
    const router = useRouter();
    const [isLoadingAction, setIsLoadingAction] = useState(false)
    const [searchKey, setSearchKey] = useState<string>("");
    const searchKeyDebounce = useDebounce(searchKey, 100);
    const [filter, setFilter] = useState<IBaseQueryParams>({});

    const [selectedUsers, setSelectedUsers] = useState<IResultUserForShare[]>(
        []
    );
    const { data, isLoading, isValidating } =
        useResultSearchForShareSRW(filter);
    const debounceLoadData = useCallback(() => {
        if (searchKeyDebounce.length > 2 || searchKeyDebounce.length === 0) {
            setFilter({ ...filter, keyword: searchKeyDebounce });
        }
    }, [searchKeyDebounce]);
    useEffect(() => {
        debounceLoadData();
    }, [searchKeyDebounce]);
    const handleSelectUser = useCallback(
        (item: IResultUserForShare) => {
            const exist = selectedUsers.findIndex((i) => i.id === item.id);
            if (exist < 0) {
                setSelectedUsers([...selectedUsers, item]);
            }
            setSearchKey("");
        },
        [selectedUsers, searchKey]
    );
    const handleRemoveUser = useCallback(
        (item: IResultUserForShare) => {
            const newList = selectedUsers.filter((i) => i.id !== item.id);
            setSelectedUsers(newList);
        },
        [selectedUsers]
    );
    const handleSave = useCallback(() => {
        if (selectedUsers.length > 0) {
            setIsLoadingAction(true)
            nProgress.start();
            const receivers: IResultShareReceiver[] = selectedUsers.map(
                (item) => ({
                    id: item.id,
                    type: item.type_user === 'Performer' ? "performer" : 'organization',
                })
            );
            const data: IResultShareUserRequest = {
                receiver: receivers,
                share_type_id: +params.id,
            };
            ResultApi.saveForShare(data)
                .then((res) => {
                    console.log(res);
                    message.success("Success");
                    SWRUtils.mutatePagination(SWR_RESULT_SHARE_USER_LIST)
                    router.back();
                })
                .catch((err) => {
                    MessageUtils.showResponseError(err);
                })
                .finally(() => {
                    nProgress.done();
                    setIsLoadingAction(false)
                });
        }
    }, [isLoadingAction, params, selectedUsers]);
    return (
        <div className="space-y-4 pb-[200px]">
            <Link href={PATH_RESULT_SHARE}>
                <Button
                    className="!text-xs !p-0 text-primary"
                    size="small"
                    type="link"
                    icon={<ArrowLeftOutlined />}
                >
                    Back to Sharing
                </Button>
            </Link>
            <div className="flex flex-row justify-between">
                <h3 className="text-primary text-xl">
                    {+params?.id === ResultConstant.SHARING_ONE_TIME
                        ? "One-Time Sharing"
                        : "Continuous Sharing"}
                </h3>
            </div>
            <div className="flex flex-col relative">
                <Input.Search
                    value={searchKey}
                    onChange={(e) => {
                        setSearchKey(e.target.value);
                    }}
                    placeholder="Start typing to search..."
                    className="text-xs placeholder:text-xs"
                    loading={isLoading}
                />
                <div className="absolute top-9 left-0 right-0 max-h-52 overflow-auto bg-white z-10">
                    {data?.data?.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => handleSelectUser(item)}
                            className="p-2 border-b-[1px] border-gray-text cursor-pointer hover:bg-gray-100"
                        >
                            <div className="flex flex-row justify-between items-center">
                                <div className="text-sm text-gray-text">
                                    {item.name}
                                </div>
                                <div className="text-sm text-red-400 italic">
                                    {item.type_user}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <p className="text-xs text-gray-text">
                Search by agency or producer name, performer stage or Twitter
                handle...
            </p>
            <div className="space-y-3 mt-4">
                {selectedUsers?.map((item) => (
                    <div
                        key={item.id}
                        className="py-4 border-b-[1px] border-gray-text"
                    >
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
            <div className="mt-4 mb-8 pb-8">
                <ButtonFill
                    onClick={handleSave}
                    disabled={isLoading || isLoadingAction || selectedUsers?.length < 1}
                    className={`${
                        selectedUsers?.length < 1 && "opacity-70"
                    } bg-gradient-to-r from-primary from-30% to-secondary mt-2 !px-7 !py-2 !rounded-3xl `}
                    labelClassName="!text-sm"
                    title={"Save"}
                    showIcon={false}
                />
            </div>
            <QRGuide />
            <Guide />
        </div>
    );
}
