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
export const PATH_ACCOUNT_EDIT_PHONE = "/menu/account/edit-phone";
export default function EditPhone() {
    const [form] = Form.useForm();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { data: sexes } = useCatalogSWR(CatalogConstant.TYPE_SEXES);
    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };
    const onFinished = async (params: any) => {
        try {
            if (isLoading) return;
            setIsLoading(true);
            nProgress.start();
            const data = {
                ...params,
                dob: params.dob.format(DATE_SERVER_FORMAT),
            };
            const loginRes = await AccountApi.updateProfile(data);
            console.log({ loginRes });
            if (loginRes && loginRes.success) {
                message.success("Update profile success!");
                router.back();
            } else {
                MessageUtils.showResponseError(loginRes?.errors);
            }
        } catch (err: any) {
            MessageUtils.showResponseError(err);
        } finally {
            nProgress.done();
            setIsLoading(false);
        }
    };

    return (
        <>
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

                <div className="flex flex-col space-y-4 ">
                    <h2 className="text-primary text-2xl">Edit Profile</h2>
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
                                <Form.Item<IAccountEditPasswordRequest>
                                    label="Current Password"
                                    name="current_password"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please input your current password!",
                                        },
                                    ]}
                                >
                                    <Input.Password size="large" />
                                </Form.Item>
                                <Form.Item<IAccountEditPasswordRequest>
                                    label="Password"
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please input your password!",
                                        },
                                    ]}
                                >
                                    <Input.Password size="large" />
                                </Form.Item>
                                <Form.Item<IAccountEditPasswordRequest>
                                    label="Confirm Password"
                                    name="password_confirmation"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please input your confirm password!",
                                        },
                                    ]}
                                >
                                    <Input.Password size="large" />
                                </Form.Item>

                                <Form.Item className="text-center">
                                    <ButtonFill
                                        htmlType={"submit"}
                                        disabled={isLoading}
                                        className="bg-gradient-to-r from-primary from-30% to-secondary mt-2 !px-14 !py-3 !rounded-3xl "
                                        labelClassName="!text-xl"
                                        title="Save"
                                        showIcon={false}
                                    />
                                   
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
