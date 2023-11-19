import { message } from 'antd';
import { AxiosError } from 'axios';
import _ from 'lodash';

class DialogUtils {

    underConstruction() {
        message.warning('Under Construction').then(r => null);
    }

    showResponseError(error: AxiosError | Error | any, apiName: string) {
        console.log(error, apiName);

        const apiErrorMessage = _.get(error, 'response.data.message');
        if (!_.isEmpty(apiErrorMessage)&&_.isString(apiErrorMessage)) return message.error(apiErrorMessage).then(() => null);

        message.error('Error').then(() => null);
    }

    showConfirmDialog(message: string) {
        return new Promise((resolve, reject) => {
            const isConfirmed = window.confirm(message);

            isConfirmed ? resolve(true) : reject();
        });
    }

}

const dialogUtils = new DialogUtils();
export default dialogUtils;
