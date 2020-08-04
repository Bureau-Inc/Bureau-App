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
import { AUTH_ENDPOINT_URL, AUTH_CLIENT_ID, CALLBACK_URL } from '@env';

export async function authDiscover(userIp){
    const apiArgs = {
        options: {
            method: 'get',
            url: constants.DISCOVER,
            baseURL: AUTH_ENDPOINT_URL,
            params: {
                countryCode: 'IN',
                correlationId: uuid(),
                userIp,
                clientId: AUTH_CLIENT_ID
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
            baseURL: AUTH_ENDPOINT_URL,
            params: {
                clientId: AUTH_CLIENT_ID,
                callbackUrl: CALLBACK_URL,
                countryCode: 'IN',
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
            baseURL: AUTH_ENDPOINT_URL,
            params: {
                clientId: AUTH_CLIENT_ID,
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