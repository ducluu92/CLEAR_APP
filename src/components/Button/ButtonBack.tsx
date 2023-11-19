"use client";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

export default function ButtonBack({}: Props) {
    const router = useRouter();
    return (
        <button
            onClick={() => {
                router.back();
            }}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-10 h-10"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
                />
            </svg>
        </button>
    );
}
