import axios from 'axios';

import { store } from '../store/configureStore';
import { ENDPOINT_URL, AUTH_TOKEN } from '@env';

// General api_call to access data
export default async function invokeApi(payload) {
    const {
        options,
        actionTypes,
        includeTokenInHeader = false
    } = payload;
    const apiParams = {
        ...options,
        baseURL: ENDPOINT_URL,
        headers: includeTokenInHeader? getHeaders(AUTH_TOKEN): getHeaders('')
    };
    try {
        actionTypes.request && dispatchAction(actionTypes.request);
        const apiResponse = await axios(apiParams);
        if (apiResponse.status === 200) {
            actionTypes.success && dispatchAction(actionTypes.success);
            return apiResponse.data;
        }
    } catch (err) {
        actionTypes.failure && dispatchAction(actionTypes.failure);
    }
    return null;
}

const getHeaders = (token) => {
    return {
        Accept: 'application/json',
        Authorization: token,
        'Content-Type': 'application/json',
    };
};

const dispatchAction = (actionType) => {
    store.dispatch({
        type: actionType
    });
};
