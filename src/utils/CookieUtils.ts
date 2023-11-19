import { GetServerSidePropsContext } from 'next/types';
import _ from 'lodash';
import Cookies from 'js-cookie'
import BaseConstant from '@/constants/BaseConstant';

export default class CookieUtils {

    static hasAccessToken(context: GetServerSidePropsContext) {
        const accessToken = this.getAccessTokenFromServer(context);

        return !_.isEmpty(accessToken);
    }

    static getAccessTokenFromServer(context: GetServerSidePropsContext): string | null {
        return _.get(context, `req.cookies.${BaseConstant.TOKEN_KEY}`, null);
    }

    static getCallbackUrlFromServer(context: GetServerSidePropsContext): string | null {
        return _.get(context, `req.cookies.${BaseConstant.TOKEN_KEY}`, null);
    }

    static setToken(token: string) {
        Cookies.set(BaseConstant.TOKEN_KEY, token)
    }
    static getToken() {
        return Cookies.get(BaseConstant.TOKEN_KEY)
    }

    static getCookieParams(cookies: string, name: string) {
        const value = `; ${cookies}`;
        const parts = value.split(`; ${name}=`);
        if (parts && parts.length === 2) {
            const pPop = parts.pop();
            return pPop?.split(";")?.shift() || '';
        }
    }

}
