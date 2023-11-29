interface IAuthLoginRequest {
    email: string;
    password: string;
}

interface IAuthRegisterRequest {
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
    is_active?: number;
    password: string;
    password_confirmation: string;
    terms: any;
}

interface IAuthVerifyRequest {
    email: string;
    code: string;
}
interface IAuthForgotPasswordRequest {
    email: string;
}
interface IAuthChangePasswordRequest {
    email: string;
    code: string;
    password: string;
    password_confirmation: string;
}
