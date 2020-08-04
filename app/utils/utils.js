import { countryCode } from '../api/countryCode';

export const getPhoneNumberWithCountryCode = (country, phoneNumber) => `${getCountryCode(country)}${phoneNumber}`;

const getCountryCode = (country) => countryCode[country.toLowerCase()];

export const sleep = async(ms) => new Promise(resolve => setTimeout(resolve, ms));