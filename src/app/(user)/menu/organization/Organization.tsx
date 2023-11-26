"use client";
import React from "react";
import useOrganizationSRW from "./hooks/useOrganizationSRW";
import { Button, Skeleton } from "antd";
import OrganizationItem from "./components/OrganizationItem";
import Link from "next/link";
import {PlusOutlined} from '@ant-design/icons'
import { PATH_ORGANIZATION_CREATE } from "./create/OrganizationCreate";

export const PATH_ORGANIZATION = "/menu/organization";
export default function Organization() {
    const { data, isLoading, isValidating } = useOrganizationSRW();
    return (
        <div className="space-y-4">
            <div className="flex flex-row justify-between">
                <h3 className="text-primary text-xl">My Organizations</h3>
            </div>
            <Link href={PATH_ORGANIZATION_CREATE}>
                <Button
                    className="!text-xs text-red-500 !px-0 "
                    size="small"
                    type="link"
                    icon={<PlusOutlined />}
                >
                    Register new organization
                </Button>
                </Link>
            {isLoading ? (
                <Skeleton active />
            ) : (
                <div className="space-y-3">
                    {data?.data?.map((item) => (
                        <OrganizationItem key={item.id} item={item} />
                    ))}
                </div>
            )}
        </div>
    );
}
