"use client";

import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Link from "next/link";
import { PATH_ORGANIZATION } from "../../Organization";
import OrganizationForm from "../../components/OrganizationForm";
export default function OrganizationEdit() {
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
                <h2 className="text-primary text-2xl">Edit Organization</h2>
                <div className="flex min-h-full flex-1 flex-col justify-center ">
                    <div className="w-full ">
                        <OrganizationForm />
                    </div>
                </div>
            </div>
        </div>
    );
}
