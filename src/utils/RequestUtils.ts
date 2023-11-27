import BaseConstant from "@/constants/BaseConstant";
import axios, { AxiosError } from "axios";
import CookieUtils from "./CookieUtils";
import { signOut } from "next-auth/react";
const service = axios.create({
    baseURL: BaseConstant.API_ENDPOINT, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 60 * 1000, // request timeout
});

// request interceptor
service.interceptors.request.use(
    (config) => {
        // do something before request is sent
        const token = CookieUtils.getToken();
        if (token) {
            // let each request carry token
            // ['X-Token'] is a custom headers key
            // please modify it according to the actual situation
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        // console.log("Starting Request", JSON.stringify(config, null, 2));
        return config;
    },
    (error) => {
        // do something with request error
        return Promise.reject(error);
    },
);

// response interceptor
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    (response) => {
        // console.log("Response:", JSON.stringify(response, null, 2));
        const res = response.data;
        // if the custom code is not 200, it is judged as an error.
        if (response.status !== 200) {
            //   Message({
            //     message: res.message || 'Error',
            //     type: 'error',
            //     duration: 3 * 1000
            //   })

            // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
            if (
                res.status_code === 50008 ||
                res.status_code === 50012 ||
                res.status_code === 50014
            ) {
                // to re-login
                // toast.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
                //     confirmButtonText: 'Re-Login',
                //     cancelButtonText: 'Cancel',
                //     type: 'warning'
                // }).then(() => {
                //     store.dispatch('user/resetToken').then(() => {
                //         location.reload()
                //     })
                // })
            }

            return Promise.reject({ message: res.errors?.message || res.message || "Error!" });
        } else {
            return res;
        }
    },
    (error: AxiosError) => {
        console.log(error);
        if (error?.response) {
            const { data } = error.response;
            // Message({
            //   message: data.message,
            //   type: 'error',
            //   duration: 3 * 1000
            // })
            // if (data?.exception) {
            //     return Promise.reject({
            //         message: "Lỗi hệ thống, vui lòng thử lại sau",
            //     });
            // }

            if (error.response.status === 401) {
                signOut()
                    .then((res: any) => {
                        // window?.location?.reload();
                        console.log("signOut", res);
                    })
                    .catch((err: any) => {
                        console.log("signOut err", err);
                    });
            }
            return Promise.reject({ message: error.message || "Error while handle data, please try again!" });
        }
        return Promise.reject({ message: "Error while handle data, please try again!" });
    },
);

export default service;
