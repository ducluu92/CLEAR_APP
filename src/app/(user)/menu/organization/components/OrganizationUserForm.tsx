"use client";
import CatalogConstant from "@/app/catalog/constants/CatalogConstant";
import useCatalogSWR from "@/app/catalog/hook/useCatalogSWR";
import ButtonFill from "@/components/Button/ButtonFill";
import {
    Button,
    Form,
    Input,
    Modal,
    Radio,
    Select,
    Skeleton,
    message,
} from "antd";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import MessageUtils from "@/utils/MessageUtils";
import nProgress from "nprogress";
import OrganizationApi from "../services/OrganizationApi";
import SWRUtils from "@/utils/SWRUtils";
import { DeleteOutlined } from "@ant-design/icons";
import OrganizationConstant from "../constants/OrganizationConstant";
export const PATH_ORGANIZATION_CREATE = "/menu/organization/create";
export default function OrganizationUserForm() {
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [editId, setEditId] = useState(0);
    const [editData, setEditData] = useState<IOrganizationUser | null>(null);
    const [isLoadingData, setIsLoadingData] = useState<boolean>(false);
    const [isLoadingAction, setIsLoadingAction] = useState<boolean>(false);
    const router = useRouter();
    const params = useParams();
    const [modal, contextHolder] = Modal.useModal();

    const actionRemove = () => {
        modal.confirm({
            title: "Remove user",
            content: (
                <p>
                    Are you sure you want to remove {editData?.name} from{" "}
                    {editData?.organization?.name}
                </p>
            ),
            okText: "Yes, Remove",
            cancelText: "Cancel",
            onOk: () => handleRemove(),
            okButtonProps: {
                className: "bg-red-400",
                disabled: isLoadingAction,
            },
        });
    };
    const handleRemove = () => {
        if (editData) {
            nProgress.start();
            setIsLoadingAction(true);
            OrganizationApi.removeUser(editData.id)
                .then((res) => {
                    console.log(res);
                    if (res.success) {
                        message.success("Success");
                        router.back();
                    } else {
                        MessageUtils.showResponseError(res.errors);
                    }
                })
                .catch((err) => {
                    MessageUtils.showResponseError(err);
                })
                .finally(() => {
                    setIsLoadingAction(false);
                });
        } else {
            message.error("Can not get user data");
        }
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };
    const onFinished = async (values: any) => {
        try {
            if (isLoading) return;
            setIsLoading(true);
            nProgress.start();
            const data = {
                ...values,
            };
            const apiRes = editId
                ? await OrganizationApi.editUser(editId, data)
                : await OrganizationApi.createUser(+params.id, data);
            console.log({ apiRes });
            if (apiRes && apiRes.success) {
                message.success(
                    editId ? "Edit User success!" : "Create User success!"
                );
                // SWRUtils.mutatePagination(SWR_ORGANIZATION);
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
        OrganizationApi.getUserDetail(+params.userId)
            .then((res) => {
                console.log(res);
                form.setFieldsValue(res.data);
                setEditData(res.data);
                setEditId(+params.userId);
            })
            .catch((err) => {
                MessageUtils.showResponseError(err);
            })
            .finally(() => {
                setIsLoadingData(false);
            });
    };
    useEffect(() => {
        if (params?.userId) {
            getDetail();
        } else {
            console.log(123);
            form.setFieldsValue({
                organization_role_id: OrganizationConstant.USER_ROLE_STANDARD,
            });
        }
    }, [params.userId]);

    return (
        <>
            {isLoadingData ? (
                <Skeleton active />
            ) : (
                <>
                    {!!editId && (
                        <div className="mb-4">
                            <Button
                                onClick={actionRemove}
                                className="!text-xs !text-rose-500 !p-0"
                                size="small"
                                type="link"
                                icon={<DeleteOutlined />}
                            >
                                Remove user from organization
                            </Button>
                        </div>
                    )}
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
                            <Form.Item<IOrganizationSaveUserRequest>
                                label={<span className="text-sm"> Email</span>}
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input email!",
                                    },
                                    {
                                        type: "email",
                                        message:
                                            "The input is not valid E-mail!",
                                    },
                                ]}
                            >
                                <Input
                                    placeholder="Please input email"
                                    disabled={!!editId}
                                />
                            </Form.Item>
                            <Form.Item<IOrganizationSaveUserRequest>
                                label={<span className="text-sm">Name</span>}
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input name!",
                                    },
                                ]}
                            >
                                <Input placeholder="Name" disabled={!!editId} />
                            </Form.Item>

                            <Form.Item<IOrganizationSaveUserRequest>
                                label={<span className="text-sm">Role</span>}
                                name="organization_role_id"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please select role!",
                                    },
                                ]}
                            >
                                <Radio.Group size="small">
                                    <div className="space-y-2 flex flex-col">
                                        {OrganizationConstant.getUserRoleList().map(
                                            (role) => (
                                                <div
                                                    className="flex flex-col"
                                                    key={role.id}
                                                >
                                                    <Radio
                                                        key={role.id}
                                                        value={role.id}
                                                    >
                                                        <span className="text-sm text-primary">
                                                            {role.name}
                                                        </span>
                                                    </Radio>

                                                    <span className="text-xs text-gray-text pl-7">
                                                        {role.description}
                                                    </span>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </Radio.Group>
                            </Form.Item>
                        </div>

                        <Form.Item className="">
                            <ButtonFill
                                htmlType={"submit"}
                                disabled={isLoading}
                                className="bg-gradient-to-r from-primary from-30% to-secondary mt-2 !px-7 !py-2 !rounded-3xl "
                                labelClassName="!text-sm"
                                title={editId ? "Save" : "Create Organization"}
                                showIcon={false}
                            />
                        </Form.Item>
                    </Form>
                    {contextHolder}
                </>
            )}
        </>
    );
}
