import axios from 'axios';

import { store } from '../store/configureStore';
import { getCompleteUrl } from '../utils';
import NetworkModule from '../utils/network-module/network-module';

// General api_call to access data
export async function invokeApiUsingAxios(payload, rethrowError = false) {
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
        if(rethrowError){
            throw(err);
        }
    }
    return null;
}

export async function invokeApiUsingNetworkModule(payload) {
    const {
        options,
        actionTypes
    } = payload;
    const url = getCompleteUrl(options);
    try {
        actionTypes.request && dispatchAction(actionTypes.request);
        const apiResponse =  await NetworkModule.get(url);
        if (apiResponse.status === 200) {
            actionTypes.success && dispatchAction(actionTypes.success);
            return apiResponse.data;
        }
    } catch (err) {
        actionTypes.failure && dispatchAction(actionTypes.failure);
        if (err.message === 'Mobile data not available')
            throw(err);
    }

}

const getHeaders = (token) => {
    return {
        Accept: 'application/json',
        Authorization: token,
        'Content-Type': 'application/x-www-form-urlencoded',
    };
};

const dispatchAction = (actionType) => {
    store.dispatch({
        type: actionType
    });
};
