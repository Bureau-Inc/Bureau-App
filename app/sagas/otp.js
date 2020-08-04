import { OTP_ENDPOINT_URL, OTP_CLIENT_ID, OTP_TOKEN } from '@env';

import { invokeApi, constants } from '../api';
import {
    OTP_GENERATE_REQUEST,
    OTP_GENERATE_SUCCESS,
    OTP_GENERATE_FAILURE,
    OTP_VERIFY_REQUEST,
    OTP_VERIFY_SUCCESS,
    OTP_VERIFY_FAILURE
} from '../actions/types';

export async function generateOtp(mobileNumber){
    const apiArgs = {
        options: {
            method: 'get',
            url: constants.OTP_GENERATE,
            baseURL: OTP_ENDPOINT_URL,
            params: {
                clientId: OTP_CLIENT_ID,
                mobileNumber
            },
        },
        token: OTP_TOKEN,
        actionTypes: {
            request: OTP_GENERATE_REQUEST,
            success: OTP_GENERATE_SUCCESS,
            failure: OTP_GENERATE_FAILURE
        }
    };
    const response = await invokeApi(apiArgs);
    return response;
}

export async function verifyOtp(otp, mVerificationId){
    const apiArgs = {
        options: {
            method: 'get',
            url: constants.OTP_VERIFY,
            baseURL: OTP_ENDPOINT_URL,
            params: {
                clientId: OTP_CLIENT_ID,
                otp,
                mVerificationId
            },
        },
        token: OTP_TOKEN,
        actionTypes: {
            request: OTP_VERIFY_REQUEST,
            success: OTP_VERIFY_SUCCESS,
            failure: OTP_VERIFY_FAILURE
        }
    };
    const response = await invokeApi(apiArgs);
    return response;
}
