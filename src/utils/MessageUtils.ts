import { message } from "antd";
import _ from "lodash";

export default {
    showResponseError(errors: any) {
        console.log(errors)
        if (errors && errors?.message &&_.isObject(errors?.message)) {
            const keys = Object.keys(errors.message);
            if(keys.length > 0){
                const mess = _.get(errors.message, keys[0])[0] || 'Error'
                message.error(mess)
            }
        }
    },
};
