interface IMenuItem {
    icon: any;
    title: string;
    path?: string;
    children?: IMenuItem[];
    isActive: boolean;
}
