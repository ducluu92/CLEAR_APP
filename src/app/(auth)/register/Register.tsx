"use client";
import CatalogConstant from "@/app/catalog/constants/CatalogConstant";
import useCatalogSWR from "@/app/catalog/hook/useCatalogSWR";
import ButtonBack from "@/components/Button/ButtonBack";
import ButtonFill from "@/components/Button/ButtonFill";
import {} from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Select, message } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import AuthApi from "../login/services/AuthApi";
import { useRouter } from "next/navigation";
import MessageUtils from "@/utils/MessageUtils";
import { DATE_SERVER_FORMAT } from "@/utils/DateTimeUtils";

export default function Register() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { data: countries } = useCatalogSWR(CatalogConstant.TYPE_COUNTRIES);
    const { data: states } = useCatalogSWR(CatalogConstant.TYPE_STATES);
    const { data: genderIdentities } = useCatalogSWR(
        CatalogConstant.TYPE_GENDER_IDENTITIES
    );
    const { data: sexes } = useCatalogSWR(CatalogConstant.TYPE_SEXES);
    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };
    const onFinished = async (params: any) => {
        try {
            if (isLoading) return;
            setIsLoading(true);
            const data = {...params, dob: params.dob.format(DATE_SERVER_FORMAT)}
            const loginRes = await AuthApi.register(data);
            console.log({ loginRes });
            if (loginRes && loginRes.success) {
                message.success(
                    "Registration successful, please check your email for verification!"
                );
                router.push("/");
            } else {
                MessageUtils.showResponseError(loginRes?.errors)
            }
        } catch (err: any) {
            MessageUtils.showResponseError(err)
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="flex flex-col space-y-8 pb-6">
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
                <h2 className="text-primary text-2xl">Create Your Account</h2>
                <div className="flex min-h-full flex-1 flex-col justify-center ">
                    <div className="w-full ">
                        <Form
                            name="basic"
                            className="space-y-3 sm:w-[500px] max-w-xl w-auto"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            initialValues={{ remember: true }}
                            onFinish={onFinished}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                            layout={"vertical"}
                        >
                            <Form.Item<IAuthRegisterRequest>
                                label="First Name"
                                name="first_name"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please input your first name!",
                                    },
                                ]}
                            >
                                <Input size="large" />
                            </Form.Item>
                            
                            <Form.Item<IAuthRegisterRequest>
                                label={
                                    <span className="text-sm">
                                        Middle Name Initial
                                    </span>
                                }
                                name="middle_name_initial"
                            >
                                <Input placeholder="Middle initial name" />
                            </Form.Item>
                            <Form.Item<IAuthRegisterRequest>
                                label={
                                    <span className="text-sm">Last Name</span>
                                }
                                name="last_name"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input last name!",
                                    },
                                ]}
                            >
                                <Input placeholder="last name" />
                            </Form.Item>

                            <Form.Item<IAuthRegisterRequest>
                                label={
                                    <span className="text-sm">
                                        Date of Birth
                                    </span>
                                }
                                name="dob"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input date of birth!",
                                    },
                                ]}
                            >
                                {/* <Input /> */}
                                <DatePicker
                                    className="w-full"
                                    format={"MM/DD/YYYY"}
                                />
                            </Form.Item>

                            <Form.Item<IAuthRegisterRequest>
                                label={
                                    <span className="text-sm">Pronouns</span>
                                }
                                name="pronouns"
                                // rules={[
                                //     {
                                //         required: true,
                                //         message: "Please input pronouns!",
                                //     },
                                // ]}
                            >
                                <Input placeholder="Pronouns" />
                            </Form.Item>

                            <Form.Item<IAuthRegisterRequest>
                                label={<span className="text-sm">Sex</span>}
                                name="sex_id"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please select sex!",
                                    },
                                ]}
                            >
                                <Select
                                    options={sexes?.data?.map((it) => ({
                                        label: it.name,
                                        value: it.id,
                                    }))}
                                    placeholder="Sex"
                                />
                            </Form.Item>
                            <Form.Item<IAuthRegisterRequest>
                                label={
                                    <span className="text-sm">
                                        Gender Identity
                                    </span>
                                }
                                name="gender_identity_id"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please select Gender Identity!",
                                    },
                                ]}
                            >
                                <Select
                                    options={genderIdentities?.data?.map(
                                        (it) => ({
                                            label: it.name,
                                            value: it.id,
                                        })
                                    )}
                                    placeholder="Gender"
                                />
                            </Form.Item>
                            <Form.Item<IAuthRegisterRequest>
                                label={<span className="text-sm">Country</span>}
                                name="country_id"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please select Country!",
                                    },
                                ]}
                            >
                                <Select
                                    options={countries?.data?.map((it) => ({
                                        label: it.name,
                                        value: it.id,
                                    }))}
                                    placeholder="Country"
                                />
                            </Form.Item>

                            <Form.Item<IAuthRegisterRequest>
                                label={
                                    <span className="text-sm">
                                        Address Line 1
                                    </span>
                                }
                                name="address_line_1"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input Address Line 1!",
                                    },
                                ]}
                            >
                                <Input placeholder="Address Line 1" />
                            </Form.Item>
                            <Form.Item<IAuthRegisterRequest>
                                label={
                                    <span className="text-sm">
                                        Address Line 2 (apt, suite, etc)
                                    </span>
                                }
                                name="address_line_2"
                            >
                                <Input placeholder="Address Line 2" />
                            </Form.Item>
                            <Form.Item<IAuthRegisterRequest>
                                label={
                                    <span className="text-sm">Zip Code</span>
                                }
                                name="zipcode"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input zip code!",
                                    },
                                ]}
                            >
                                <Input placeholder="Zip Code" />
                            </Form.Item>
                            <Form.Item<IAuthRegisterRequest>
                                label={<span className="text-sm">City</span>}
                                name="city"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input city!",
                                    },
                                ]}
                            >
                                <Input placeholder="City" />
                            </Form.Item>

                            <Form.Item<IAuthRegisterRequest>
                                label={<span className="text-sm">State</span>}
                                name="state"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input State!",
                                    },
                                ]}
                            >
                                <Select
                                    options={states?.data?.map((it) => ({
                                        label: it.name,
                                        value: it.name,
                                    }))}
                                    placeholder="Country"
                                />
                            </Form.Item>

                            <Form.Item<IAuthRegisterRequest>
                                label={<span className="text-sm"> Email</span>}
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input email!",
                                    },
                                ]}
                            >
                                <Input placeholder="Please input email" />
                            </Form.Item>

                            <Form.Item<IAuthRegisterRequest>
                                label={<span className="text-sm"> Phone</span>}
                                name="phone"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input phone number!",
                                    },
                                ]}
                            >
                                <Input placeholder="Please input phone number" />
                            </Form.Item>

                            <Form.Item<IAuthRegisterRequest>
                                label={
                                    <span className="text-sm">
                                        Stage Name 1
                                    </span>
                                }
                                name="stage_name_1"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input Stage Name 1!",
                                    },
                                ]}
                            >
                                <Input placeholder="Stage Name 1" />
                            </Form.Item>
                            <Form.Item<IAuthRegisterRequest>
                                label={
                                    <span className="text-sm">
                                        Stage Name 2
                                    </span>
                                }
                                name="stage_name_2"
                            >
                                <Input placeholder="Stage Name 2" />
                            </Form.Item>
                            <Form.Item<IAuthRegisterRequest>
                                label={
                                    <span className="text-sm">
                                        Stage Name 3
                                    </span>
                                }
                                name="stage_name_3"
                            >
                                <Input placeholder="Stage Name 3" />
                            </Form.Item>

                            <Form.Item<IAuthRegisterRequest>
                                label={<span className="text-sm">Twitter</span>}
                                name="twitter"
                            >
                                <Input placeholder="@" />
                            </Form.Item>
                            <Form.Item<IAuthRegisterRequest>
                                label={
                                    <span className="text-sm">Instagram</span>
                                }
                                name="instagram"
                            >
                                <Input placeholder="@" />
                            </Form.Item>
                            <Form.Item<IAuthRegisterRequest>
                                label={<span className="text-sm">Tiktok</span>}
                                name="tiktok"
                            >
                                <Input placeholder="@" />
                            </Form.Item>

                            <Form.Item<IAuthRegisterRequest>
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
                            <Form.Item<IAuthRegisterRequest>
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
                                    title="Create Account"
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
