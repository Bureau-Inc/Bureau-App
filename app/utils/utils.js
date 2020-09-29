import { Platform } from 'react-native';
import { countryCodes } from '../api';

export const getPhoneNumberWithCountryCode = (countryCode, phoneNumber) =>
  `${countryCode}${phoneNumber}`;

export const getCountrylabels = () => {
  let labels = [];
  return countryCodes.map(item => ({
    label: item.countryCode,
    value: item.dialingCode
  }));
};

export const getCompleteUrl = ApiArgs => {
  const { url, baseURL, params } = ApiArgs;
  let fullURL = `${baseURL}${url}`;
  Object.keys(params).map((param, index) => {
    fullURL =
      index === 0
        ? `${fullURL}?${param}=${params[param]}`
        : `${fullURL}&${param}=${params[param]}`;
  });
  return fullURL;
};

export const isIOS = () => Platform.OS === 'ios';
