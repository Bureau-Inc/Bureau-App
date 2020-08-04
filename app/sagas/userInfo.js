import { invokeApi } from '../api';
import {
    USERINFO_REQUEST,
    USERINFO_SUCCESS,
    USERINFO_FAILURE
} from '../actions/types';
import { USERINFO_ENDPOINT_URL } from '@env';

export async function getUserInfo(correlationId){
    const apiArgs = {
        options: {
            method: 'get',
            url: USERINFO_ENDPOINT_URL,
            params: {
                correlationId
            },
        },
        actionTypes: {
            request: USERINFO_REQUEST,
            success: USERINFO_SUCCESS,
            failure: USERINFO_FAILURE
        }
    };
    const response = await invokeApi(apiArgs);
    return response;
}