import axios from 'axios';

import { store } from '../store/configureStore';

// General api_call to access data
export default async function invokeApi(payload) {
    const {
        options,
        actionTypes,
        token = ''
    } = payload;
    const apiParams = {
        ...options,
        headers: getHeaders(token)
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
