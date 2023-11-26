"use client";
import ButtonFill from "@/components/Button/ButtonFill";
import {
    ArrowLeftOutlined,
    EditOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Radio, Select, Skeleton, message } from "antd";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { PATH_ORGANIZATION } from "../Organization";
import { useEffect, useState } from "react";
import OrganizationApi from "../services/OrganizationApi";
import MessageUtils from "@/utils/MessageUtils";
import { useAccountContext } from "@/contexts/AccountContext";
import OrganizationUserItem from "../components/OrganizationUserItem";

export default function OrganizationDetail() {
    const router = useRouter();
    const { profile }: { profile: IAccountProfile } = useAccountContext();
    const params = useParams();
    const [detail, setDetail] = useState<IOrganization | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const getDetail = async () => {
        try {
            if (isLoading) return;
            setIsLoading(true);
            const orgRes = await OrganizationApi.detail(+params.id);
            setDetail(orgRes.data);
        } catch (err) {
            console.log(err);
            message.error("Error while getting data");
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        if (params?.id) {
            console.log(params.id);
            getDetail();
        }
    }, [params.id]);
    return (
        <div className="flex flex-col space-y-3 pb-6">
            <Link href={PATH_ORGANIZATION}>
                <Button
                    className="!text-xs !p-0 text-primary"
                    size="small"
                    type="link"
                    icon={<ArrowLeftOutlined />}
                >
                    Back to organization
                </Button>
            </Link>
            {isLoading || !profile ? (
                <Skeleton active />
            ) : (
                <div className="space-y-1">
                    <div className="text-md text-primary">{detail?.name}</div>
                    <div className="text-xs text-[#72809c]">
                        Type: {detail?.organization_type?.name}{" "}
                    </div>
                    <div className="text-xs text-[#72809c]">
                        Address: {detail?.address_line_1}
                    </div>

                    <div className="text-xs text-[#72809c]">
                        Twitter: {detail?.twitter}
                    </div>
                    <div className="text-xs text-[#72809c]">
                        Instagram: {detail?.instagram}
                    </div>
                    <div className="text-xs text-[#72809c]">
                        TikTok: {detail?.tiktok}
                    </div>
                    <div className="text-xs text-[#72809c]">
                        Email: {detail?.email}
                    </div>
                    <div className="text-xs text-[#72809c]">
                        Phone: {detail?.phone}
                    </div>
                    <div className="py-2">
                        <Link
                            href={`${PATH_ORGANIZATION}/${detail?.id}/edit`}
                            className=""
                        >
                            <Button
                                className="!text-xs !text-rose-500 !p-0"
                                size="small"
                                type="link"
                                icon={<EditOutlined />}
                            >
                                Edit account information
                            </Button>
                        </Link>
                    </div>
                    {!!detail?.is_active &&
                        detail?.registered_by?.id === profile?.id && (
                            <div className="flex flex-col space-y-1 ">
                                <h2 className="text-primary text-xl">
                                    Authorized Users
                                </h2>
                                <div>
                                    <Link
                                        href={`${PATH_ORGANIZATION}/${detail?.id}/add-user`}
                                        className=""
                                    >
                                        <Button
                                            className="!text-xs !text-rose-500 !p-0"
                                            size="small"
                                            type="link"
                                            icon={<PlusOutlined />}
                                        >
                                            Add authorized user
                                        </Button>
                                    </Link>
                                </div>
                                <div className="flex min-h-full flex-1 flex-col justify-center ">
                                    <div className="space-y-3">
                                        {detail?.users?.map((item) => (
                                            <OrganizationUserItem
                                                key={item.id}
                                                item={item}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                </div>
            )}
        </div>
    );
}
