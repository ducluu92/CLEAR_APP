import NotificationApi from "@/app/catalog/services/NotificationApi";
import DateTimeUtils from "@/utils/DateTimeUtils";
import { Badge, Button, Divider, Popover } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import nProgress from "nprogress";
import React, { useCallback, useEffect, useState } from "react";

type Props = {
    children: React.ReactNode;
};
export default function Notifications({ children }: Props) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [notifications, setNotifications] = useState<INotification[]>([]);
    const [count, setCount] = useState<number>(0);
    const hide = () => {
        setOpen(false);
    };

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
    };

    const getNotifications = useCallback(() => {
        NotificationApi.getList({})
            .then((res) => {
                console.log(res);
                setNotifications(res?.data?.list);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {});
    }, []);
    const getNotificationUnreadCount = useCallback(() => {
        NotificationApi.getUnReadCount({})
            .then((res) => {
                console.log(res);
                setCount(res?.data);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {});
    }, []);

    const handleClick = useCallback((notification: INotification) => {
        console.log(notification);
        NotificationApi.read(notification.id)
            .then((res) => {
                console.log(res);
                router.push(notification.link_data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        if (open) {
            getNotifications();
        } else {
            getNotificationUnreadCount();
        }
    }, [open]);

    const renderContent = useCallback(() => {
        return (
            <div className="flex w-[250px] flex-col">
                {notifications.length > 0 ? (
                    <>
                        {notifications?.map((item) => (
                            <div
                                onClick={() => {
                                    handleClick(item);
                                }}
                                key={item.id}
                                className="flex flex-row cursor-pointer"
                            >
                                <div className="w-4 flex justify-center items-start">
                                    <Badge
                                        status={
                                            !!item.read
                                                ? "default"
                                                : "processing"
                                        }
                                        className="!p-0 !m-0"
                                    />
                                </div>
                                <div className="flex flex-col flex-1">
                                    <div
                                        className={`text-sm ${
                                            !!item.read
                                                ? "text-gray-text"
                                                : "text-primary font-semibold"
                                        }`}
                                    >
                                        {item.content}
                                    </div>
                                    <p className="text-xs text-gray-text">
                                        {DateTimeUtils.getDateTimeFull(
                                            item.date_time
                                        )}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </>
                ) : (
                    <h4>You have no notification</h4>
                )}
            </div>
        );
    }, [notifications]);
    return (
        <Popover
            content={renderContent()}
            title=""
            trigger="click"
            open={open}
            onOpenChange={handleOpenChange}
            placement="bottomRight"
        >
            <Badge count={count}>{children}</Badge>
        </Popover>
    );
}
