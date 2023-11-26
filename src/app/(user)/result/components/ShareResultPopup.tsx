"use client";
import { useAccountContext } from "@/contexts/AccountContext";
import { Modal, QRCode, Skeleton } from "antd";
import moment from "moment";
import React, {
    useCallback,
    useImperativeHandle,
    useMemo,
    useState,
} from "react";
import Image from "next/image";
import DateTimeUtils from "@/utils/DateTimeUtils";
import BaseConstant from "@/constants/BaseConstant";
import UrlUtils from "@/utils/UrlUtils";

type Props = {
    item: any | null;
};
const ShareResultPopup = React.forwardRef((props: Props, ref) => {
    const { profile }: { profile: IAccountProfile } = useAccountContext();
    const { item } = props;
    const [isOpen, setIsOpen] = useState(false);

    const isClear = useMemo(() => {
        if (profile?.result_latest) {
            const lastResult = profile?.result_latest;
            return (
                moment(lastResult?.created_at)
                    .add(14, "days")
                    .format("YYYY-MM-DD") >= moment().format("YYYY-MM-DD") &&
                lastResult?.value?.name == "Safe"
            );
        }
        return false;
    }, [profile]);
    const lastResultValidUntil = useMemo(() => {
        if (profile?.result_latest) {
            const lastResult = profile?.result_latest;
            return DateTimeUtils.getDateTimeFull(
                moment(lastResult.created_at).add(14, "days")
            );
        }
        return "";
    }, [profile]);

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
            {profile ? (
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
                        {!!profile?.result_latest && (
                            <QRCode value={`${UrlUtils.getCurrentDomain()}/public-result/${profile?.result_latest?.id}`} />
                        )}
                        <div className="flex flex-row space-y-2 items-center ">
                            <Image
                                width={30}
                                height={38}
                                src={"/drop-logo.png"}
                                alt="Clear"
                            />
                            <Image
                                width={100}
                                height={30}
                                src={"/clear-text.png"}
                                alt="Clear"
                            />
                        </div>
                    </div>
                    {isClear ? (
                        <div className="text-green-500">
                            <p className="text-md">CLEARED UNTIL</p>
                            <p className="text-sm">{lastResultValidUntil}</p>
                        </div>
                    ) : (
                        <div className="text-red-500">
                            <p className="text-md">NOT CLEARED</p>
                        </div>
                    )}
                    {!!profile.result_latest && (
                        <div>
                            <p className="text-sm text-gray-text">LAST TEST:</p>
                            <p className="text-xs text-gray-text">
                                {profile.result_latest
                                    ? DateTimeUtils.getDateTimeFull(
                                          profile.result_latest.created_at,
                                          false
                                      )
                                    : ""}
                            </p>
                        </div>
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
