interface IOrganization {
    id: number;
    name: string;
    phone: string;
    status: number;
    email?: string;
    zipcode?: any;
    city?: string;
    state?: string;
    state_detail?: ICatalog;
    country_id?: number;
    country?: ICatalog;
    twitter?: string;
    instagram?: string;
    tiktok?: string;
    type?: string;
    registered_at?: string;
    created_at: string;
    updated_at: string;
    is_active: number;
    address_line_1: string;
    address_line_2: string;
    organization_type_id: number;
    registered_by_id: number;
    organization_type_id: number;
    organization_type: ICatalog;
    role: ICatalog;
    status_text: string;
    registered_by: IAccountProfile;
    users?: IOrganizationUser[];
}

interface IOrganizationSaveRequest {
    name?: string;
    phone?: string;
    email?: string;
    zipcode?: any;
    city?: string;
    state?: string;
    country?: string;
    twitter?: string;
    instagram?: string;
    tiktok?: string;
    type?: string;
    is_active?: number;
    address_line_1?: string;
    address_line_2?: string;
}

interface IOrganizationFilter {
    status?: number;
    name?: string;
}

interface IOrganizationResponse {
    count: number;
    rows: IOrganization[];
}

interface IOrganizationImportRequest {
    file: any;
}
interface IOrganizationSaveUserRequest {
    email?: string;
    name?: string;
    organization_role_id?: number;
}

interface IOrganizationUserRole {
    id: number;
    name: string;
    description: string;
}
interface IOrganizationUserResponseInvitationRequest {
    invitation_accepted: number;
    code?: string;
}

interface IOrganizationUser {
    id: number;
    user_id: number;
    organization_id: number;
    organization_role_id: number;
    email: string;
    name: string;
    invitation_accepted: number;
    invitation_code: string;
    created_at: string;
    updated_at: string;
    organization_role: ICatalog;
    organization?: IOrganization;
}
