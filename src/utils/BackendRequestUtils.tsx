import CookieUtils from './CookieUtils';
import _ from 'lodash';
import BaseConstant from '@/constants/BaseConstant';

export default async function backendRequest(serverSession: any, path: string, init?: RequestInit): Promise<any> {
    return new Promise((resolve, reject) => {
        const newHeaders = new Headers(init?.headers || {});
        const accessToken = CookieUtils.getAccessTokenFromServer(serverSession);
        if (!_.isEmpty(accessToken)) newHeaders.append('Authorization', `Bearer ${accessToken}`);

        init = init || {};
        init.headers = newHeaders;

        const endpointUrl = [
            _.trimEnd(BaseConstant.API_ENDPOINT, '/'),
            _.trimStart(path, '/'),
        ].join('/');

        fetch(endpointUrl, init)
            .then((res) => {
                return new Promise((resolve) => {
                    try {
                        res.text()
                            .then((dataText) => resolve(JSON.parse(dataText)))
                            .catch(() => resolve(null));
                    } catch (e) {
                        resolve(null);
                    }
                });
            })
            .then(resolve)
            .catch(reject);
    });

}
