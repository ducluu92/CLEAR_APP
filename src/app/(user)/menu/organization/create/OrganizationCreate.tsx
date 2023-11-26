"use client";

import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Link from "next/link";
import { PATH_ORGANIZATION } from "../Organization";
import OrganizationForm from "../components/OrganizationForm";
export const PATH_ORGANIZATION_CREATE = "/menu/organization/create";
export default function OrganizationCreate() {
    return (
        <div className="flex flex-col space-y-2 pb-6">
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
            <div className="flex flex-col space-y-4 ">
                <h2 className="text-primary text-2xl">Create Your Account</h2>
                <div className="flex min-h-full flex-1 flex-col justify-center ">
                    <div className="w-full ">
                        <OrganizationForm />
                    </div>
                </div>
            </div>
        </div>
    );
}
