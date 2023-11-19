export default class UrlUtils {
    static getCallbackUrlFromHref() {
        return new URLSearchParams(window?.location?.href).get('callbackUrl') || '/'
    }
}
