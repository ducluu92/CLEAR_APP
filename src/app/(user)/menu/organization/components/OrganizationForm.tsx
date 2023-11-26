"use client";
import CatalogConstant from "@/app/catalog/constants/CatalogConstant";
import useCatalogSWR from "@/app/catalog/hook/useCatalogSWR";
import ButtonFill from "@/components/Button/ButtonFill";
import { Form, Input, Radio, Select, Skeleton, message } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import MessageUtils from "@/utils/MessageUtils";
import nProgress from "nprogress";
import OrganizationApi from "../services/OrganizationApi";
import SWRUtils from "@/utils/SWRUtils";
import { SWR_ORGANIZATION } from "../hooks/useOrganizationSRW";
export const PATH_ORGANIZATION_CREATE = "/menu/organization/create";
export default function OrganizationForm() {
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [editId, setEditId] = useState(0);
    const [isLoadingData, setIsLoadingData] = useState<boolean>(false);
    const router = useRouter();
    const params = useParams();

    const { data: states, isLoading: isLoadingState } = useCatalogSWR(
        CatalogConstant.TYPE_STATES
    );
    const { data: countries, isLoading: isLoadingCountry } = useCatalogSWR(
        CatalogConstant.TYPE_COUNTRIES
    );
    const { data: organizationTypes, isLoading: isLoadingOrganizationType } =
        useCatalogSWR(CatalogConstant.TYPE_ORGANIZATION_TYPES);
    const countriesSort: ICatalog[] = useMemo(() => {
        if (countries) {
            return countries.data.sort(function (x, y) {
                return x.id === 232 ? -1 : y.id == 232 ? 1 : 0;
            });
        }
        return [];
    }, [countries]);
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
            };
            const apiRes = editId ?  await OrganizationApi.edit(editId, data) :  await OrganizationApi.create(data);
            console.log({ apiRes });
            if (apiRes && apiRes.success) {
                message.success(editId ? "Edit Organization success!" : "Create Organization success!");
                SWRUtils.mutatePagination(SWR_ORGANIZATION);
                router.back();
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

    const getDetail = () => {
        if (isLoading) return;
        setIsLoadingData(true);
        OrganizationApi.detail(+params.id)
            .then((res) => {
                console.log(res);
                form.setFieldsValue(res.data);
                setEditId(+params.id)
            })
            .catch((err) => {
                MessageUtils.showResponseError(err);
            })
            .finally(() => {
                setIsLoadingData(false);
            });
    };
    useEffect(() => {
        if (params?.id) {
            getDetail();
        }else{
            form.setFieldsValue({organization_type_id: 1});
        }
    }, [params.id]);

    return (
        <>
            {isLoadingData ? (
                <Skeleton active />
            ) : (
                <Form
                    name="organization"
                    labelCol={{ span: 6, xs: 24 }}
                    wrapperCol={{ span: 12, xs: 24 }}
                    style={{}}
                    onFinish={onFinished}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    layout="vertical"
                    form={form}
                >
                    <div className="grid grid-cols-1 gap-x-1 md:grid-cols-2 md:gap-x-3">
                        <Form.Item<IOrganization>
                            label={<span className="text-sm">Agency Name</span>}
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input Agency name!",
                                },
                            ]}
                        >
                            <Input placeholder="Agency name" />
                        </Form.Item>

                        <Form.Item<IOrganization>
                            label={<span className="text-sm">Type</span>}
                            name="organization_type_id"
                            rules={[
                                {
                                    required: true,
                                    message: "Please select type!",
                                },
                            ]}
                        >
                            <Radio.Group size="small">
                                {organizationTypes?.data?.map((type) => (
                                    <Radio key={type.id} value={type.id}>
                                        {" "}
                                        <span className="text-sm">
                                            {type.name}
                                        </span>{" "}
                                    </Radio>
                                ))}
                            </Radio.Group>
                        </Form.Item>

                        <Form.Item<IOrganization>
                            label={<span className="text-sm">Country</span>}
                            name="country_id"
                            rules={[
                                {
                                    required: true,
                                    message: "Please select country!",
                                },
                            ]}
                        >
                            <Select
                                options={countriesSort.map((it) => ({
                                    label: it.name,
                                    value: it.id,
                                }))}
                                placeholder="Country"
                            />
                        </Form.Item>
                        <Form.Item<IOrganization>
                            label={<span className="text-sm">City</span>}
                            name="city"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input City!",
                                },
                            ]}
                        >
                            <Input placeholder="City" />
                        </Form.Item>
                        <Form.Item<IOrganization>
                            label={
                                <span className="text-sm"> Address Line 1</span>
                            }
                            name="address_line_1"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input Address Line 1!",
                                },
                            ]}
                        >
                            <Input placeholder="Address 1" />
                        </Form.Item>
                        <Form.Item<IOrganization>
                            label={
                                <span className="text-sm">Address Line 2</span>
                            }
                            name="address_line_2"
                        >
                            <Input placeholder="Address 2" />
                        </Form.Item>
                        <Form.Item<IOrganization>
                            label={<span className="text-sm"> State</span>}
                            name="state"
                            rules={[
                                {
                                    required: true,
                                    message: "Please select state!",
                                },
                            ]}
                        >
                            <Select
                                options={states?.data?.map((it) => ({
                                    label: it.name,
                                    value: it.name,
                                }))}
                                placeholder="Please select state"
                            />
                        </Form.Item>
                        <Form.Item<IOrganization>
                            label={<span className="text-sm"> Zip Code</span>}
                            name="zipcode"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input Zip code!",
                                },
                            ]}
                        >
                            <Input placeholder="Zip code" />
                        </Form.Item>
                        <Form.Item<IOrganization>
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
                        <Form.Item<IOrganization>
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
                        <Form.Item<IOrganization>
                            label={<span className="text-sm">Twitter</span>}
                            name="twitter"
                        >
                            <Input placeholder="@" />
                        </Form.Item>
                        <Form.Item<IOrganization>
                            label={<span className="text-sm">Instagram</span>}
                            name="instagram"
                        >
                            <Input placeholder="@" />
                        </Form.Item>
                        <Form.Item<IOrganization>
                            label={<span className="text-sm">Tiktok</span>}
                            name="tiktok"
                        >
                            <Input placeholder="@" />
                        </Form.Item>
                    </div>

                    <Form.Item className="text-center">
                        <ButtonFill
                            htmlType={"submit"}
                            disabled={isLoading}
                            className="bg-gradient-to-r from-primary from-30% to-secondary mt-2 !px-7 !py-2 !rounded-3xl "
                            labelClassName="!text-sm"
                            title={editId ? 'Save' : 'Create Organization'}
                            showIcon={false}
                        />
                    </Form.Item>
                </Form>
            )}
        </>
    );
}
