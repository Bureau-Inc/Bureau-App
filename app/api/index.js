// General api to access data
import axios from 'axios';

import { store } from '../store/configureStore';
import { API_URL, AUTH_TOKEN } from '@env';

export default async function apiCall(payload) {
    const {
        API_CALL,
        TYPES,
        includeTokenInHeader = false
    } = payload;
    const apiParams = {
        ...API_CALL,
        baseURL: API_URL,
        headers: includeTokenInHeader? getHeaders(AUTH_TOKEN): getHeaders('')
    };
    try {
        if (TYPES.requestType) {
            store.dispatch({ type: TYPES.requestType });
        }
        const apiResponse = await axios(apiParams);
        if (apiResponse.status === 200) {
        // API call success
            store.dispatch({
                type: TYPES.successType,
                res: apiResponse.data
            });
            return apiResponse.data;
        }
    } catch (err) {
        // API call failure
        // Error Handling
        store.dispatch({
            type: TYPES.failureType
        });
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