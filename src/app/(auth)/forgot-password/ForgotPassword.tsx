"use client";
import ButtonBack from "@/components/Button/ButtonBack";
import ButtonFill from "@/components/Button/ButtonFill";
import {} from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
type FieldType = {
    email?: string;
    password?: string;
    // remember?: string;
};
export default function ForgotPassword() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };
    const onFinished = async (params: any) => {
        // try {
        //     setIsLoading(true);
        //     const loginRes = await AuthApi.login({ ...params });
        //     console.log({loginRes})
        //     if (loginRes && loginRes.success) {
        //         CookieUtils.setToken(loginRes.data.access_token)
        //         await signIn("credentials", { ...params, password: loginRes.data.access_token , redirect: false});
        //         message.success("Welcome!");
        //         router.push('/')
        //     }else{
        //         message.error("User credentials are not valid");
        //     }
        // } catch (err: any) {
        //     message.error("User credentials are not valid");
        // } finally {
        //     setIsLoading(false);
        // }
    };
    return (
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
                <h2 className="text-primary text-2xl">Reset Password</h2>
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
                            <Form.Item<FieldType>
                                label="Email or Phone #"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your email!",
                                    },
                                ]}
                            >
                                <Input size="large" />
                            </Form.Item>

                            <Form.Item className="text-center">
                                <ButtonFill
                                    htmlType={"submit"}
                                    loading={isLoading}
                                    className="bg-gradient-to-r from-primary from-30% to-secondary mt-2 !px-14 !py-3 !rounded-3xl "
                                    labelClassName="!text-xl"
                                    title="Send Verification Code"
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
    );
}
