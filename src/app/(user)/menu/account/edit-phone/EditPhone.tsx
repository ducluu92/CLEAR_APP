"use client";
import { Button, Form, Input, Skeleton, message } from "antd";
import React, { useEffect, useState } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import DateTimeUtils, { DATE_SERVER_FORMAT } from "@/utils/DateTimeUtils";
import { useRouter } from "next/navigation";
import useCatalogSWR from "@/app/catalog/hook/useCatalogSWR";
import CatalogConstant from "@/app/catalog/constants/CatalogConstant";
import nProgress from "nprogress";
import MessageUtils from "@/utils/MessageUtils";
import Link from "next/link";
import ButtonFill from "@/components/Button/ButtonFill";
import moment from "moment";
import { PATH_ACCOUNT } from "../Account";
import AccountApi from "../services/AccountApi";
import OTPInput from "react-otp-input";
import { useAccountContext } from "@/contexts/AccountContext";
export const PATH_ACCOUNT_EDIT_PHONE = "/menu/account/edit-phone";
export default function EditPhone() {
    const { profile }: { profile: IAccountProfile } = useAccountContext();
    const [form] = Form.useForm();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isConfirm, setIsConfirm] = useState<boolean>(false);
    const [otp, setOtp] = useState("");
    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };
    const onFinished = async (params: any) => {
        try {
            if (isLoading) return;
            setIsLoading(true);
            nProgress.start();

            const apiRes = await AccountApi.requestEditPhone(params);
            console.log({ apiRes });
            if (apiRes && apiRes.success) {
                // message.success("Update profile success!");
                // router.back();
                setIsConfirm(true);
            } else {
                MessageUtils.showResponseError(apiRes?.errors);
            }
        } catch (err: any) {
            MessageUtils.showResponseError(err);
        } finally {
            nProgress.done();
            setIsLoading(false);
        }
    };

    const handleVerifyEdit = async () => {
        try {
            const data: IAccountEditPhoneVerifyRequest = {
                code: otp,
                new_phone: form.getFieldValue("new_phone"),
            };
            if (isLoading) return;
            setIsLoading(true);
            nProgress.start();

            const apiRes = await AccountApi.verifyEditPhone(data);
            console.log({ apiRes });
            if (apiRes && apiRes.success) {
                // message.success("Update profile success!");
                router.back();
                // setIsConfirm(true);
            } else {
                MessageUtils.showResponseError(apiRes?.errors);
            }
        } catch (err) {
            MessageUtils.showResponseError(err);
        } finally {
            nProgress.done();
            setIsLoading(true);
        }
    };

    return (
        <>
            {!!profile ? (
                <div className="flex flex-col space-y-2 pb-6">
                    <Link href={PATH_ACCOUNT}>
                        <Button
                            className="!text-xs !p-0 text-primary"
                            size="small"
                            type="link"
                            icon={<ArrowLeftOutlined />}
                        >
                            Back to account
                        </Button>
                    </Link>
                    {isConfirm ? (
                        <div className="flex flex-col space-y-6 items-center">
                            <h2 className="text-primary text-2xl ">
                                Change Phone
                            </h2>
                            <div className="space-y-1 flex flex-col items-center">
                                <h3 className="text-gray-text text-lg ">
                                    Enter verification code.
                                </h3>
                                <p className="text-xs text-gray-text">
                                    We sent an email and sms with a verification
                                    code to
                                </p>
                                <p className="text-xs text-gray-text">
                                    {profile?.email} and a text message with
                                </p>
                                <p className="text-xs text-gray-text">
                                    the same code to {profile?.phone}.
                                </p>
                            </div>
                            <div className="text-sm text-gray-text">
                                Enter 5 Digit Code:
                            </div>
                            <OTPInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={5}
                                renderSeparator={<span> </span>}
                                inputStyle={
                                    "rounded-sm border-gray-300 border-2 !w-12 !h-12 text-lg"
                                }
                                containerStyle={"space-x-2"}
                                renderInput={(props) => <input {...props} />}
                            />
                            <ButtonFill
                                onClick={handleVerifyEdit}
                                disabled={isLoading}
                                className="bg-gradient-to-r from-primary from-30% to-secondary !mt-10 !px-14 !py-3 !rounded-3xl "
                                labelClassName="!text-xl"
                                title="Continue"
                                showIcon={false}
                            />
                        </div>
                    ) : (
                        <div className="flex flex-col space-y-4 ">
                            <h2 className="text-primary text-2xl">
                                Request phone # change
                            </h2>
                            <div className="flex min-h-full flex-1 w-100 ">
                                <div className="w-full ">
                                    <Form
                                        form={form}
                                        name="basic"
                                        className="space-y-3  w-100"
                                        labelCol={{ span: 24 }}
                                        wrapperCol={{ span: 24 }}
                                        initialValues={{ remember: true }}
                                        onFinish={onFinished}
                                        onFinishFailed={onFinishFailed}
                                        autoComplete="off"
                                        layout={"vertical"}
                                    >
                                        <Form.Item<IAccountEditPhoneRequest>
                                            label={
                                                <span className="text-sm text-primary">
                                                    Please enter your new phone
                                                    #
                                                </span>
                                            }
                                            name="new_phone"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Please enter your new phone #",
                                                },
                                            ]}
                                        >
                                            <Input size="large" />
                                        </Form.Item>

                                        <Form.Item className="text-center">
                                            <ButtonFill
                                                htmlType={"submit"}
                                                disabled={isLoading}
                                                className="bg-gradient-to-r from-primary from-30% to-secondary mt-2 !px-14 !py-3 !rounded-3xl "
                                                labelClassName="!text-xl"
                                                title="Continue"
                                                showIcon={false}
                                            />
                                        </Form.Item>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <Skeleton active />
            )}
        </>
    );
}
