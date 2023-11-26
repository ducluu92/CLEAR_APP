interface IMenuItem {
    icon: any;
    title: string;
    path?: string;
    children?: IMenuItem[];
    isActive: boolean;
}
interface IDataResponse<T> {
    data: T;
    success: boolean;
    status_code?: number;
    message?: string;
    errors?: any;
}

interface ModalRefProp {
    present: () => void;
    dismiss: () => void;
}

interface IBaseQueryParams {
    keyword?: string;
}
