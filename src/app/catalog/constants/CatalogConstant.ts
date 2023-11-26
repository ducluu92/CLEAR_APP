export default {
    TYPE_GENDER_IDENTITIES: "gender_identities",
    TYPE_SEXES: "sexes",
    TYPE_STATES: "states",
    TYPE_COUNTRIES: "countries",
    TYPE_ORGANIZATION_TYPES: "organization_types",
    TYPE_ORGANIZATION_ROLES: "organization_roles",
    TYPE_LOCATIONS: "locations",

    getTypeList() {
        return [
            this.TYPE_GENDER_IDENTITIES,
            this.TYPE_SEXES,
            this.TYPE_STATES,
            this.TYPE_COUNTRIES,
            this.TYPE_ORGANIZATION_TYPES,
        ];
    },
};
