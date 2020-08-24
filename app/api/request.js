import axios from 'axios';

import { store } from '../store/configureStore';
import { getCompleteUrl, isIOS } from '../utils';
import NetworkModule from '../utils/network-module';

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
        if(rethrowError || ( err && err.message && err.message.toLowerCase().includes('network error')))
        {
            throw(new Error('Network Unavailable'));
        }
    }
    return null;
}

async function invokeApiUsingNetworkModule(payload) {
    const {
        options,
        actionTypes
    } = payload;
    const url = getCompleteUrl(options);
    try {
        actionTypes.request && dispatchAction(actionTypes.request);
        const apiResponse =  await NetworkModule.get(url);
        if (apiResponse && apiResponse.status === 200) {
            actionTypes.success && dispatchAction(actionTypes.success);
            return apiResponse.data;
        }
    } catch (err) {
        actionTypes.failure && dispatchAction(actionTypes.failure);
        if (err.message === 'Data not available'){
            await invokeApiUsingAxios(payload);
        }
    }

}

export async function fetch(payload){
    const response = isIOS
        ? await invokeApiUsingAxios(payload)
        : await invokeApiUsingNetworkModule(payload);
    return response;
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
