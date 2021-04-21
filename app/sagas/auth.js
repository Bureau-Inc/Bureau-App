import { fetch, constants } from '../api';
import {
    INITIATE_REQUEST,
    INITIATE_SUCCESS,
    INITIATE_FAILURE
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
