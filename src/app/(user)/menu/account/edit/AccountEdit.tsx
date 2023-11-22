"use client";
import { useAccountContext } from "@/contexts/AccountContext";
import {
    Button,
    DatePicker,
    Divider,
    Form,
    Input,
    Select,
    Skeleton,
    message,
} from "antd";
import React, { useEffect, useState } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import DateTimeUtils, { DATE_SERVER_FORMAT } from "@/utils/DateTimeUtils";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import useCatalogSWR from "@/app/catalog/hook/useCatalogSWR";
import CatalogConstant from "@/app/catalog/constants/CatalogConstant";
import nProgress from "nprogress";
import MessageUtils from "@/utils/MessageUtils";
import ButtonBack from "@/components/Button/ButtonBack";
import Link from "next/link";
import ButtonFill from "@/components/Button/ButtonFill";
import moment from "moment";
import { PATH_ACCOUNT } from "../Account";
import AccountApi from "../services/AccountApi";
export const PATH_ACCOUNT_EDIT = '/menu/account/edit'
export default function MyAccount() {
    const { profile }: { profile: IAccountProfile } = useAccountContext();
    const [form] = Form.useForm();
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
            nProgress.start();
            const data = {
                ...params,
                dob: params.dob.format(DATE_SERVER_FORMAT),
            };
            const loginRes = await AccountApi.updateProfile(data);
            console.log({ loginRes });
            if (loginRes && loginRes.success) {
                message.success(
                    "Update profile success!"
                );
                router.back()
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

    useEffect(() => {
        form.setFieldsValue({ ...profile, dob: moment(profile?.dob) });
    }, [profile]);
    return (
        <>
            {profile ? (
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
                                    <Form.Item<IAccountUpdateRequest>
                                        label="First Name"
                                        name="first_name"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Please input your first name!",
                                            },
                                        ]}
                                        className="w-full"
                                    >
                                        <Input placeholder="First name" />
                                    </Form.Item>

                                    <Form.Item<IAccountUpdateRequest>
                                        label={
                                            <span className="text-sm">
                                                Middle Name Initial
                                            </span>
                                        }
                                        name="middle_name_initial"
                                    >
                                        <Input placeholder="Middle initial name" />
                                    </Form.Item>
                                    <Form.Item<IAccountUpdateRequest>
                                        label={
                                            <span className="text-sm">
                                                Last Name
                                            </span>
                                        }
                                        name="last_name"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Please input last name!",
                                            },
                                        ]}
                                    >
                                        <Input placeholder="Last name" />
                                    </Form.Item>

                                    <Form.Item<IAccountUpdateRequest>
                                        label={
                                            <span className="text-sm">
                                                Date of Birth
                                            </span>
                                        }
                                        name="dob"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Please input date of birth!",
                                            },
                                        ]}
                                    >
                                        {/* <Input /> */}
                                        <DatePicker
                                            className="w-full"
                                            format={"MM/DD/YYYY"}
                                        />
                                    </Form.Item>

                                    <Form.Item<IAccountUpdateRequest>
                                        label={
                                            <span className="text-sm">
                                                Pronouns
                                            </span>
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

                                    <Form.Item<IAccountUpdateRequest>
                                        label={
                                            <span className="text-sm">Sex</span>
                                        }
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
                                    <Form.Item<IAccountUpdateRequest>
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
                                    <Form.Item<IAccountUpdateRequest>
                                        label={
                                            <span className="text-sm">
                                                Country
                                            </span>
                                        }
                                        name="country_id"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Please select Country!",
                                            },
                                        ]}
                                    >
                                        <Select
                                            options={countries?.data?.map(
                                                (it) => ({
                                                    label: it.name,
                                                    value: it.id,
                                                })
                                            )}
                                            placeholder="Country"
                                        />
                                    </Form.Item>

                                    <Form.Item<IAccountUpdateRequest>
                                        label={
                                            <span className="text-sm">
                                                Address Line 1
                                            </span>
                                        }
                                        name="address_line_1"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Please input Address Line 1!",
                                            },
                                        ]}
                                    >
                                        <Input placeholder="Address Line 1" />
                                    </Form.Item>
                                    <Form.Item<IAccountUpdateRequest>
                                        label={
                                            <span className="text-sm">
                                                Address Line 2 (apt, suite, etc)
                                            </span>
                                        }
                                        name="address_line_2"
                                    >
                                        <Input placeholder="Address Line 2" />
                                    </Form.Item>
                                    <Form.Item<IAccountUpdateRequest>
                                        label={
                                            <span className="text-sm">
                                                Zip Code
                                            </span>
                                        }
                                        name="zipcode"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Please input zip code!",
                                            },
                                        ]}
                                    >
                                        <Input placeholder="Zip Code" />
                                    </Form.Item>
                                    <Form.Item<IAccountUpdateRequest>
                                        label={
                                            <span className="text-sm">
                                                City
                                            </span>
                                        }
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

                                    <Form.Item<IAccountUpdateRequest>
                                        label={
                                            <span className="text-sm">
                                                State
                                            </span>
                                        }
                                        name="state"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please input State!",
                                            },
                                        ]}
                                    >
                                        <Select
                                            options={states?.data?.map(
                                                (it) => ({
                                                    label: it.name,
                                                    value: it.name,
                                                })
                                            )}
                                            placeholder="Country"
                                        />
                                    </Form.Item>

                                    <Form.Item<IAccountUpdateRequest>
                                        label={
                                            <span className="text-sm">
                                                {" "}
                                                Email
                                            </span>
                                        }
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

                                    <Form.Item<IAccountUpdateRequest>
                                        label={
                                            <span className="text-sm">
                                                {" "}
                                                Phone
                                            </span>
                                        }
                                        name="phone"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Please input phone number!",
                                            },
                                        ]}
                                    >
                                        <Input placeholder="Please input phone number" />
                                    </Form.Item>

                                    <Form.Item<IAccountUpdateRequest>
                                        label={
                                            <span className="text-sm">
                                                Stage Name 1
                                            </span>
                                        }
                                        name="stage_name_1"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Please input Stage Name 1!",
                                            },
                                        ]}
                                    >
                                        <Input placeholder="Stage Name 1" />
                                    </Form.Item>
                                    <Form.Item<IAccountUpdateRequest>
                                        label={
                                            <span className="text-sm">
                                                Stage Name 2
                                            </span>
                                        }
                                        name="stage_name_2"
                                    >
                                        <Input placeholder="Stage Name 2" />
                                    </Form.Item>
                                    <Form.Item<IAccountUpdateRequest>
                                        label={
                                            <span className="text-sm">
                                                Stage Name 3
                                            </span>
                                        }
                                        name="stage_name_3"
                                    >
                                        <Input placeholder="Stage Name 3" />
                                    </Form.Item>

                                    <Form.Item<IAccountUpdateRequest>
                                        label={
                                            <span className="text-sm">
                                                Twitter
                                            </span>
                                        }
                                        name="twitter"
                                    >
                                        <Input placeholder="@" />
                                    </Form.Item>
                                    <Form.Item<IAccountUpdateRequest>
                                        label={
                                            <span className="text-sm">
                                                Instagram
                                            </span>
                                        }
                                        name="instagram"
                                    >
                                        <Input placeholder="@" />
                                    </Form.Item>
                                    <Form.Item<IAccountUpdateRequest>
                                        label={
                                            <span className="text-sm">
                                                Tiktok
                                            </span>
                                        }
                                        name="tiktok"
                                    >
                                        <Input placeholder="@" />
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
                <Skeleton active />
            )}
        </>
    );
}
