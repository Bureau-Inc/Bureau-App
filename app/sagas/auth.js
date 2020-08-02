import { v4 as uuid } from 'uuid';

import { invokeApi, constants } from '../api';
import {
    DISCOVER_REQUEST,
    DISCOVER_SUCCESS,
    DISCOVER_FAILURE,
    INITIATE_REQUEST,
    INITIATE_SUCCESS,
    INITIATE_FAILURE,
    FINALIZE_FAILURE,
    FINALIZE_REQUEST,
    FINALIZE_SUCCESS
} from '../actions/types';
import { CLIENT_ID, CALLBACK_URL } from '@env';

export async function authDiscover(userIp){
    const apiArgs = {
        options: {
            method: 'get',
            url: constants.DISCOVER,
            params: {
                countryCode: 'india',
                correlationId: uuid(),
                userIp,
                clientId: CLIENT_ID
            }
        },
        actionTypes: {
            request: DISCOVER_REQUEST,
            success: DISCOVER_SUCCESS,
            failure: DISCOVER_FAILURE
        }
    };
    const response = await invokeApi(apiArgs);
    return response;
}

export async function authInitiate(userIp, msisdn, correlationId){
    const apiArgs = {
        options: {
            method: 'get',
            url: constants.INITIATE,
            params: {
                clientId: CLIENT_ID,
                callbackUrl: CALLBACK_URL,
                countryCode: 'india',
                correlationId,
                userIp,
                msisdn
            },
        },
        actionTypes: {
            request: INITIATE_REQUEST,
            success: INITIATE_SUCCESS,
            failure: INITIATE_FAILURE
        }
    };
    const response = await invokeApi(apiArgs);
    return response;
}

export async function authFinalize(correlationId){
    const apiArgs = {
        options: {
            method: 'get',
            url: constants.FINALIZE,
            params: {
                clientId: CLIENT_ID,
                correlationId
            },
        },
        actionTypes: {
            request: FINALIZE_REQUEST,
            success: FINALIZE_SUCCESS,
            failure: FINALIZE_FAILURE
        }
    };
    const response = await invokeApi(apiArgs);
    return response;
}

export async function getUserInfo(correlationId){
    const apiArgs = {
        options: {
            method: 'get',
            url: '/userinfo',
            params: {
                correlationId
            },
        },
        includeTokenInHeader: true,
        actionTypes: {
            request: 'USERINFO_REQUEST',
            success: 'USERINFO_SUCCESS',
            failure: 'USERINFO_FAILURE'
        }
    };
    const response = await invokeApi(apiArgs);
    return response;
}