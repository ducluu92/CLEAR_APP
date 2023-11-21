"use client";
import ButtonBack from "@/components/Button/ButtonBack";
import ButtonFill from "@/components/Button/ButtonFill";
import {} from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import AuthApi from "../login/services/AuthApi";
import MessageUtils from "@/utils/MessageUtils";
type FieldType = {
    email?: string;
    password?: string;
    // remember?: string;
};
export default function VerifyEmail() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };
    const handleVerify = () => {
        setIsLoading(true);
        const data: IAuthVerifyRequest = {
            code: searchParams.get("code") || "",
            email: searchParams.get("email") || "",
        };
        AuthApi.verify(data)
            .then((res) => {
                console.log(res);
                message.success("Verify success");
                router.push('login')
            })
            .catch((err) => {
                console.log(err);
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
                <h2 className="text-primary text-2xl">Verify your account</h2>
                <div className="flex min-h-full flex-1 flex-col justify-center ">
                    {isLoading && <div>
                        <img src="/image/spinner.gif" alt="" />
                    </div>}
                </div>
            </div>
        </div>
    );
}
