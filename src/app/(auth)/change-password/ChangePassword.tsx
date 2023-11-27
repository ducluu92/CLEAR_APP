"use client";
import ButtonBack from "@/components/Button/ButtonBack";
import ButtonFill from "@/components/Button/ButtonFill";
import {} from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import AuthApi from "../login/services/AuthApi";
import MessageUtils from "@/utils/MessageUtils";

export default function ChangePassword() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };
    const onFinished = (params: any) => {
        setIsLoading(true);
        const data: IAuthChangePasswordRequest = {
            ...params,
            code: searchParams.get("code") || "",
            email: searchParams.get("email") || "",
        };
        AuthApi.changePassword(data)
            .then((res) => {
                console.log(res);
                message.success("Change password success");
                router.push("/login");
            })
            .catch((err) => {
                console.log(err);
                // message.error(err?.message || 'Error');
            })
            .finally(() => {
                setIsLoading(false);
            });
    };
    const canView = useMemo(() => {
        return searchParams.get('email') && searchParams.get('code')
    }, [searchParams])
    
    useEffect(() => {

    },[])
    return (
        <>
            {canView ? (
                <div className="flex flex-col space-y-12 pb-6">
                    <div className="flex flex-row justify-between items-center mt-24">
                        <ButtonBack />
                        <div className="flex flex-row space-x-2 items-center ">
                            <Image
                                width={50}
                                height={65}
                                src={"/drop-logo.png"}
                                alt="Clear"
                            />
                            <Image
                                width={200}
                                height={60}
                                src={"/clear-text.png"}
                                alt="Clear"
                            />
                        </div>
                        <div className="w-10" />
                    </div>

                    <div className="flex flex-col space-y-4 items-center">
                        <h2 className="text-primary text-2xl">
                            Enter you new password
                        </h2>
                        <div className="flex min-h-full flex-1 flex-col justify-center ">
                            <div className="w-full ">
                                <Form
                                    name="basic"
                                    className="space-y-2 w-96"
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                    style={{ maxWidth: 600 }}
                                    initialValues={{ remember: true }}
                                    onFinish={onFinished}
                                    onFinishFailed={onFinishFailed}
                                    autoComplete="off"
                                    layout={"vertical"}
                                >
                                    <Form.Item<IAuthChangePasswordRequest>
                                        label="New Password"
                                        name="password"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Please input your new password!",
                                            },
                                        ]}
                                    >
                                        <Input.Password size="large" />
                                    </Form.Item>
                                    <Form.Item<IAuthChangePasswordRequest>
                                        label="Confirm New Password"
                                        name="password_confirmation"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Please confirm your password!",
                                            },
                                            ({ getFieldValue }) => ({
                                                validator(_, value) {
                                                    if (
                                                        !value ||
                                                        getFieldValue(
                                                            "password"
                                                        ) === value
                                                    ) {
                                                        return Promise.resolve();
                                                    }
                                                    return Promise.reject(
                                                        new Error(
                                                            "The new password that you entered do not match!"
                                                        )
                                                    );
                                                },
                                            }),
                                        ]}
                                        dependencies={["password"]}
                                    >
                                        <Input.Password size="large" />
                                    </Form.Item>

                                    <Form.Item className="text-center">
                                        <ButtonFill
                                            htmlType={"submit"}
                                            loading={isLoading}
                                            className="bg-gradient-to-r from-primary from-30% to-secondary mt-2 !px-14 !py-3 !rounded-3xl "
                                            labelClassName="!text-xl"
                                            title="Update Password"
                                            showIcon={false}
                                        />
                                        {/* <Button
                                    htmlType={"submit"}
                                    loading={isLoading}
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Sign in
                                </Button> */}
                                    </Form.Item>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-1 justify-center items-center">
                    <Link href={'/'}>Back to Home</Link>
                </div>
            )}
        </>
    );
}
