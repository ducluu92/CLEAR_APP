interface IAccountProfile {
    id: number;
    email: string;
    phone: string;
    first_name: string;
    middle_name_initial: string;
    last_name: string;
    dob: string;
    pronouns: string;
    email_verified_at: string;
    address_line_1: string;
    address_line_2: string;
    sex_id: number;
    sex: ICatalog;
    gender_identity_id: number;
    gender_identity: ICatalog;
    city: string;
    country_id: number;
    country: ICatalog;
    state: string;
    instagram: string;
    tiktok: string;
    twitter: string;
    zipcode: string;
    sharing_with_network: string;
    code: string;
    code_expired_at: string;
    is_active: number;
    stage_name_1: string;
    stage_name_2: string;
    stage_name_3: string;
    sharing_with_network_date: string;
    unread_notification_count: string;
    last_result_code: string;
    last_result_code_expiration: string;
    created_at: string;
    updated_at: string;
    barcode: string;
    result_latest: IResult;
    appointment_latest: IAppointment;
}

interface IAccountProfileResponse {
    user: IAccountProfile;
    token_type: string;
}

interface IAccountUpdateRequest {
    first_name?: string;
    last_name?: string;
    middle_name_initial?: string;
    email: string;
    phone: string;
    dob: string;
    pronouns?: string;
    sex_id?: number;
    gender_identity_id?: number;
    address_line_1?: string;
    address_line_2?: string;
    country_id?: number;
    city?: string;
    state?: string;
    zipcode?: string;
    twitter?: string;
    instagram?: string;
    tiktok?: string;
    stage_name_1?: string;
    stage_name_2?: string;
    stage_name_3?: string;
}
interface IAccountEditPasswordRequest {
    old_password: string;
    password: string;
    password_confirmation: string;
}
interface IAccountEditEmailRequest {
    email: string;
}
interface IAccountEditEmailVerifyRequest {
    email: string;
    code: string;
}
interface IAccountEditPhoneRequest {
    new_phone: string;
}
interface IAccountEditPhoneVerifyRequest {
    new_phone: string;
    code: string;
}
