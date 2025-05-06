import {jwtDecode} from 'jwt-decode';
import * as Keychain from 'react-native-keychain';

export const getAccessToken = async () => {
  const credentials = await Keychain.getGenericPassword();

  if (credentials) {
    const token = JSON.parse(credentials.password);
    return token;
  }
  return null;
};

export const isTokenExpired = (token: string): boolean => {
  try {
    const {exp} = jwtDecode<{exp: number}>(token);
    return exp * 1000 < Date.now();
  } catch {
    return true;
  }
};
