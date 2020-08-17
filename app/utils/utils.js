import { countryCodes } from '../api';

export const getPhoneNumberWithCountryCode = (countryCode, phoneNumber) => `${countryCode}${phoneNumber}`;

export const getCountrylabels = () => {
    let labels = [];
    Object.keys(countryCodes).forEach( country => 
        labels.push({ label: country, value: countryCodes[country] }));           
    return labels;
};

export const getCompleteUrl = (ApiArgs) => {
    const {
        url,
        baseURL,
        params
    } = ApiArgs;
    let fullURL = `${baseURL}${url}`;
    Object.keys(params).map( (param, index) => {
        fullURL = (index === 0)
            ?  `${fullURL}?${param}=${params[param]}`
            :   `${fullURL}&${param}=${params[param]}`;
    });
    return fullURL;
};