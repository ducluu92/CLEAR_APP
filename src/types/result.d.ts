interface IResult {
    appointment_id: number;
    covid_value: ICatalog;
    created_at: string;
    external_id: number;
    first_time_viewed: null;
    first_time_viewed_notification_sent: string;
    fsc_pass_sync_status_id: null;
    has_no_phi_file: number;
    has_result_file: number;
    id: number;
    manually_added: number;
    name: string;
    organizations_notification_sent: number;
    result_covid_value_id: number;
    result_status_id: number;
    result_value_id: number;
    updated_at: string;
    user_id: number;
    user: IAccountProfile;
    value: ICatalog;
    share_type?: number;
    share_type_text?: string
    share_date?: string
}

interface IPanel {
    created_at: string;
    external_id: number;
    id: number;
    location_id: number;
    name: string;
    updated_at: string;
}
interface IResultUserForShare {
    type_user: string;
    type?: string;
    name: string;
    id: number;
}

interface IRresultData {
    mine: IResult;
    shared: IResult[];
}

interface IResultShareReceiver {
    id: number;
    type: string;
}
interface IResultShareUserRequest {
    receiver: IResultShareReceiver[],
    share_type_id: number
}
interface IResultRevokeShareUserRequest {
    revoke_ids: number[]
}
