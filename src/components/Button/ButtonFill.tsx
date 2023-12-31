import { Button } from "antd";
import Link from "next/link";
import React from "react";

type Props = {
    showIcon?: boolean;
    title: string;
    onClick?: () => void;
    href?: string;
    className?: string;
    labelClassName?: string;
    htmlType?: string
    loading?: boolean
    disabled?: boolean
};
type CompProps = {
    href?: string;
    htmlType?: string;
    loading?: boolean;
    disabled?: boolean;
    onClick?: () => void;
};
export default function ButtonFill({
    title,
    showIcon = true,
    onClick,
    href,
    className,
    labelClassName,
    htmlType,
    loading,
    disabled,
    ...props
}: Props) {
    const Comp = href ? Link : Button;
    const propComps: CompProps = {};
    if (href) {
        propComps.href = href;
    }
    if (onClick) {
        propComps.onClick = onClick;
    }
    if (htmlType) {
        propComps.htmlType = htmlType;
    }
    if (loading) {
        propComps.disabled = loading;
    }
    if (disabled) {
        propComps.disabled = disabled;
    }
    return (
        // @ts-ignore
        <Comp
            className={
                `!rounded-lg border-none !p-[5px] align-middle !h-auto shadow-md drop-shadow-lg shadow-slate-200 ${href && 'block'} ${className}` 
            }
            {...propComps}
            {...props}
        >
            <p className="items-center flex flex-row justify-center">
                <span className={"text-xs text-white " + labelClassName}>
                    {title}
                </span>
                {showIcon && (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={4}
                        stroke="currentColor"
                        className="w-3 h-3 font-bold text-white ml-1"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.25 4.5l7.5 7.5-7.5 7.5"
                        />
                    </svg>
                )}
            </p>
        </Comp>
    );
}
