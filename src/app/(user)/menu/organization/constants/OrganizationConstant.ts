export default {
    USER_ROLE_STANDARD: 2,
    USER_ROLE_ADMIN: 1,
    getUserRoleList(): IOrganizationUserRole[] {
        return [
            {
                id: this.USER_ROLE_STANDARD,
                name: "Standard",
                description:
                    "Standard users will have access to all talent results that are shared with your organization and will be notified when a talent shares results with your organization.",
            },
            {
                id: this.USER_ROLE_ADMIN,
                name: "Admin",
                description:
                    "Same as Standard users but can also manage your organization's settings and users.",
            },
        ];
    },
};
