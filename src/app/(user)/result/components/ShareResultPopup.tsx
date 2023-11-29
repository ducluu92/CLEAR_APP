"use client";
import { useAccountContext } from "@/contexts/AccountContext";
import { Modal, QRCode, Skeleton, message } from "antd";
import moment from "moment";
import React, {
    useCallback,
    useEffect,
    useImperativeHandle,
    useMemo,
    useState,
} from "react";
import Image from "next/image";
import DateTimeUtils from "@/utils/DateTimeUtils";
import BaseConstant from "@/constants/BaseConstant";
import UrlUtils from "@/utils/UrlUtils";
import ResultApi from "../services/ResultApi";
import MessageUtils from "@/utils/MessageUtils";

type Props = {
    item: any | null;
};
const ShareResultPopup = React.forwardRef((props: Props, ref) => {
    const { item } = props;
    const { profile } = useAccountContext();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [detail, setDetail] = useState<IResult | null>(null);

    const getLastResult = () => {
        setIsLoading(true);
        ResultApi.getLast({})
            .then((res) => {
                console.log(res);
                if (res.success) {
                    setDetail(res.data);
                } else {
                    message.error(res.errors?.message || "Error");
                }
            })
            .catch((err) => {
                MessageUtils.showResponseError(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };
    useEffect(() => {
        if (isOpen) {
            getLastResult();
        }
    }, [isOpen]);
    const isClear = useMemo(() => {
        if (detail) {
            const lastResult = detail;
            return (
                moment(lastResult?.created_at)
                    .add(14, "days")
                    .format("YYYY-MM-DD") >= moment().format("YYYY-MM-DD") &&
                lastResult?.value?.name == "Safe"
            );
        }
        return false;
    }, [detail]);
    const lastResultValidUntil = useMemo(() => {
        if (detail) {
            const lastResult = detail;
            return DateTimeUtils.getDateTimeFull(
                moment(lastResult.created_at).add(14, "days"),
                false
            );
        }
        return "";
    }, [detail]);

    const present = useCallback(() => {
        setIsOpen(true);
    }, [isOpen]);
    const dismiss = useCallback(() => {
        setIsOpen(false);
    }, [isOpen]);

    useImperativeHandle(
        ref,
        useCallback(() => ({ present, dismiss }), [present, dismiss])
    );

    return (
        <Modal
            width={400}
            open={isOpen}
            onOk={dismiss}
            onCancel={dismiss}
            footer={false}
        >
            {!isLoading ? (
                <div className="text-center space-y-6">
                    <div className="text-gray-text">
                        <div className="text-lg ">
                            First Name: {profile?.first_name}
                        </div>
                        <div className="text-xs ">
                            Birth Year: {moment(profile?.dob).year()}
                        </div>
                    </div>
                    <div className="rounded-xl shadow-lg p-5 flex flex-col justify-center items-center gap-2 cursor-pointer w-[200px] border-slate-50 border-[1px] m-auto">
                        {/* <QrcodeOutlined className="text-[120px]" /> */}
                        {!!detail ? (
                            <QRCode
                                value={`${UrlUtils.getCurrentDomain()}/public-result/${
                                    detail?.id
                                }`}
                            />
                        ) : (
                            <p className="text-xs text-gray-text py-6">
                                No recent results to share
                            </p>
                        )}
                        <div className="flex flex-row space-x-2 items-center justify-center ">
                            <Image
                                width={38}
                                height={30}
                                className="h-7 w-5"
                                src={"/drop-logo.png"}
                                alt="Clear"
                            />
                            <Image
                                width={100}
                                height={30}
                                className="h-7"
                                src={"/clear-text.png"}
                                alt="Clear"
                            />
                        </div>
                    </div>
                    {!!detail && (
                        <>
                            {isClear ? (
                                <div className="text-green-500">
                                    <p className="text-md">CLEARED UNTIL</p>
                                    <p className="text-sm">
                                        {lastResultValidUntil}
                                    </p>
                                </div>
                            ) : (
                                <div className="text-red-500">
                                    <p className="text-md">NOT CLEARED</p>
                                </div>
                            )}

                            <div>
                                <p className="text-sm text-gray-text">
                                    LAST TEST:
                                </p>
                                <p className="text-xs text-gray-text">
                                    {detail
                                        ? DateTimeUtils.getDateTimeFull(
                                              detail.created_at,
                                              false
                                          )
                                        : ""}
                                </p>
                            </div>
                        </>
                    )}

                    <a
                        className="text-blue-400 text-sm block"
                        href="https://www.getclrd.com/faq?questionId=af5102a9-4e4b-47a8-abd9-9e25ea12092b&appDefId=14c92d28-031e-7910-c9a8-a670011e062d"
                    >
                        How does this work?
                    </a>
                </div>
            ) : (
                <Skeleton active />
            )}
        </Modal>
    );
});
export default ShareResultPopup;
