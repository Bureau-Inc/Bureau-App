import { fetch, constants } from '../api';
import {
    INITIATE_REQUEST,
    INITIATE_SUCCESS,
    INITIATE_FAILURE,
    FINALIZE_FAILURE,
    FINALIZE_REQUEST,
    FINALIZE_SUCCESS
} from '../actions/types';
import { AUTH_ENDPOINT_URL, AUTH_CLIENT_ID, CALLBACK_URL } from '@env';

export async function authInitiate(msisdn, correlationId, countryCode){
    const apiArgs = {
        options: {
            method: 'get',
            url: constants.INITIATE,
            baseURL: AUTH_ENDPOINT_URL,
            params: {
                clientId: AUTH_CLIENT_ID,
                callbackUrl: CALLBACK_URL,
                countryCode: countryCode,
                correlationId,
                msisdn
            },
        },
        actionTypes: {
            request: INITIATE_REQUEST,
            success: INITIATE_SUCCESS,
            failure: INITIATE_FAILURE
        }
    };
    const response = await fetch(apiArgs);
    return response;
}

export async function authFinalize(correlationId, os){
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
    const response = await fetch(apiArgs);
    return response;
}