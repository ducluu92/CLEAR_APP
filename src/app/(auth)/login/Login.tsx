"use client";
import ButtonFill from "@/components/Button/ButtonFill";
import CookieUtils from "@/utils/CookieUtils";
import {} from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import nProgress from "nprogress";
import { useState } from "react";
type FieldType = {
    email?: string;
    password?: string;
    // remember?: string;
};
export default function Login() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };
    const onFinished = async (params: any) => {
        try {
            setIsLoading(true);
            nProgress.start();
            // const loginRes = await AuthApi.login({ ...params });
            // console.log({loginRes})
            // if (loginRes && loginRes.success) {
            // CookieUtils.setToken(loginRes.data.access_token)
            const res: any = await signIn("credentials", {
                ...params,
                redirect: false,
            });
            console.log({ res });

            if (res.ok) {
                message.success("Welcome!");
                router.push("/home");
            } else {
                message.error("User credentials are not valid");
            }
        } catch (err: any) {
            message.error("User credentials are not valid");
        } finally {
            nProgress.done();
            setIsLoading(false);
        }
    };
    return (
        <div className="flex flex-col space-y-12 pb-6">
            <div className="flex flex-col space-y-2 items-center mt-24">
                <Image
                    width={60}
                    height={76}
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

            <div className="flex flex-col space-y-4 items-center">
                <h2 className="text-primary text-2xl">Sign in</h2>
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
                                        message: "Please input your email or phone!",
                                    },
                                ]}
                            >
                                <Input size="large" />
                            </Form.Item>

                            <Form.Item<FieldType>
                                label="Password"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your password!",
                                    },
                                ]}
                            >
                                <Input.Password size="large" />
                            </Form.Item>

                            <Form.Item className="text-center">
                                <ButtonFill
                                    htmlType={"submit"}
                                    loading={isLoading}
                                    className="bg-gradient-to-r from-primary from-30% to-secondary mt-2 !px-14 !py-3 !rounded-3xl "
                                    labelClassName="!text-xl"
                                    title="Sign In"
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
                        <div className="text-center py-5">
                            <Link
                                className="text-secondary"
                                href="/forgot-password"
                            >
                                Forgot Password
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col space-y-4 items-center">
                <p className="text-gray-500 text-lg ">Don't have an account?</p>
                <Link className="text-secondary" href="/register">
                    Create Your Account Here
                </Link>
            </div>
        </div>
    );
}
