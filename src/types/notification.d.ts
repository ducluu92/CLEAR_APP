interface INotification {
    id: number;
    date_time: string;
    content: string;
    user_id: number;
    read: number;
    link_data: string;
    created_at: string;
    updated_at: string;
}

interface INotificationData {
    list: INotification[];
    count: number;
}
