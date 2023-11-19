"use client";
import { Dropdown, MenuProps } from "antd";
import _ from "lodash";
import Link from "next/link";
import React, { useMemo, useState } from "react";
type Props = {
    item: IMenuItem;
};
export default function MenuItem({ item }: Props) {
    const items: MenuProps["items"] = useMemo(() => {
        if (!_.isArray(item?.children)) return [];

        return item.children.map((item, index) => ({
            key: index + "",
            label: <MenuItem item={item} />,
        }));
    }, [item?.children]);
    return (
        <div className="flex flex-col items-center justify-center">
            {item.children ? (
                <Dropdown
                    overlayClassName=""
                    menu={{ items }}
                    placement="topCenter"
                    trigger={["click"]}
                >
                    <div className="flex flex-col items-center justify-center space-y-1 cursor-pointer">
                        <span className="fill-red-500">{item.icon}</span>
                        <h4
                            className={`text-xs ${
                                item.isActive && "text-red-500"
                            }`}
                        >
                            {item.title}
                        </h4>
                    </div>
                </Dropdown>
            ) : (
                <Link
                    href={item.path || "/"}
                    className="flex flex-col items-center justify-center space-y-1"
                >
                    <span className="fill-red-500">{item.icon}</span>
                    <h4
                        className={`text-xs ${item.isActive && "text-red-500"}`}
                    >
                        {item.title}
                    </h4>
                </Link>
            )}
        </div>
    );
}
