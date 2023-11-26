export default {
    getCallbackUrlFromHref() {
        return (
            new URLSearchParams(window?.location?.href).get("callbackUrl") ||
            "/"
        );
    },
    getCurrentDomain() {
        return window.location.protocol + "//" + window.location.host;
    },
};
