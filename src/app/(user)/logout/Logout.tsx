"use client";
import { Button, Skeleton } from "antd";

import { signOut, useSession } from "next-auth/react";

import { useEffect, useRef } from "react";

import useResultShareUserListSRW from "../result/hooks/useResultShareUserListSRW";
import { useRouter } from "next/navigation";
export const PATH_LOGOUT = "/logout";
export default function LOGOUT() {
    const session = useSession();
    const router = useRouter();
    const { data, isLoading, isValidating, mutate } =
        useResultShareUserListSRW();
    const resultModalRef = useRef<ModalRefProp>(null);
    useEffect(() => {
        console.log(123)
        signOut().then(res=>{
            router.push('/')
        })
    }, [])
    return (
        <>
            <Skeleton active />
        </>
    );
}
