"use client";

import { ArrowLeftOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import Link from "next/link";
import { PATH_ORGANIZATION } from "../../Organization";
import OrganizationUserForm from "../../components/OrganizationUserForm";
export default function OrganizationEditUser() {

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
                <h2 className="text-primary text-2xl">Edit Authorized User</h2>
                <div className="flex min-h-full flex-1 flex-col justify-center ">
                    <div className="w-full ">
                        <OrganizationUserForm />
                    </div>
                </div>
            </div>
        </div>
    );
}
