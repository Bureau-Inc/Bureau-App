import { v4 as uuid } from 'uuid';

import apiCall from '../api';
import ApiConstants from '../api/ApiConstants';
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
        API_CALL: {
            method: 'get',
            url: ApiConstants.DISCOVER,
            params: {
                countryCode: 'india',
                correlationId: uuid(),
                userIp,
                clientId: CLIENT_ID
            }
        },
        TYPES: {
            requestType: DISCOVER_REQUEST,
            successType: DISCOVER_SUCCESS,
            failureType: DISCOVER_FAILURE
        }
    };
    const response = await apiCall(apiArgs);
    return response;
}

export async function authInitiate(userIp, msisdn, correlationId){
    const apiArgs = {
        API_CALL: {
            method: 'get',
            url: ApiConstants.INITIATE,
            params: {
                clientId: CLIENT_ID,
                callbackUrl: CALLBACK_URL,
                countryCode: 'india',
                correlationId,
                userIp,
                msisdn
            },
            maxRedirects: 20,
        },
        TYPES: {
            requestType: INITIATE_REQUEST,
            successType: INITIATE_SUCCESS,
            failureType: INITIATE_FAILURE
        }
    };
    const response = await apiCall(apiArgs);
    return response;
}

export async function authFinalize(correlationId){
    const apiArgs = {
        API_CALL: {
            method: 'get',
            url: ApiConstants.FINALIZE,
            params: {
                clientId: CLIENT_ID,
                correlationId
            },
            maxRedirects: 20
        },
        TYPES: {
            requestType: FINALIZE_REQUEST,
            successType: FINALIZE_SUCCESS,
            failureType: FINALIZE_FAILURE
        }
    };
    const response = await apiCall(apiArgs);
    return response;
}

export async function getUserInfo(correlationId){
    const apiArgs = {
        API_CALL: {
            method: 'get',
            url: '/userinfo',
            params: {
                correlationId
            },
        },
        includeTokenInHeader: true,
        TYPES: {
            requestType: 'USERINFO_REQUEST',
            successType: 'USERINFO_SUCCESS',
            failureType: 'USERINFO_FAILURE'
        }
    };
    const response = await apiCall(apiArgs);
    return response;
}