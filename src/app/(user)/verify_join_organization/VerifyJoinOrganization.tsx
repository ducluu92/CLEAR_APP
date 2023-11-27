"use client";
import ButtonBack from "@/components/Button/ButtonBack";
import ButtonFill from "@/components/Button/ButtonFill";
import {} from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import MessageUtils from "@/utils/MessageUtils";
import OrganizationApi from "../menu/organization/services/OrganizationApi";
type FieldType = {
    email?: string;
    password?: string;
    // remember?: string;
};
export default function VerifyJoinOrganization() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState("");
    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };
    const handleVerify = () => {
        setIsLoading(true);
        const data: IOrganizationUserResponseInvitationRequest = {
            code: searchParams.get("code") || "",
            invitation_accepted: +(
                searchParams.get("invitation_accepted") || "2"
            ),
        };
        const orgId = +(searchParams.get("organization_id") || "2");
        OrganizationApi.responseInvitation(orgId, data)
            .then((res) => {
                console.log(res);
                message.success("Verify success");
                router.push("home");
            })
            .catch((err) => {
                console.log(err);
                setError(err?.message);
                // message.error(err?.message || 'Error');
            })
            .finally(() => {
                setIsLoading(false);
            });
    };
    useEffect(() => {
        handleVerify();
    }, [searchParams]);

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
                <h2 className="text-primary text-2xl">Verify invitation</h2>
                {!!error && <h4 className="text-red-400">{error}</h4>}
                <div className="flex flex-1 justify-center items-center">
                    <Link href={"/home"}>Back to Home</Link>
                </div>
                <div className="flex min-h-full flex-1 flex-col justify-center ">
                    {isLoading && (
                        <div>
                            <img src="/image/spinner.gif" alt="" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
