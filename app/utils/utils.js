import { countryCodes } from '../api';

export const getPhoneNumberWithCountryCode = (countryCode, phoneNumber) => `${countryCode}${phoneNumber}`;

export const getCountrylabels = () => {
    let labels = [];
    Object.keys(countryCodes).forEach( country => 
        labels.push({ label: country, value: countryCodes[country] }));           
    return labels;
};