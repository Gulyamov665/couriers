import * as Keychain from 'react-native-keychain';

export const getAccessToken = async () => {
  const credentials = await Keychain.getGenericPassword();

  if (credentials) {
    const {access} = JSON.parse(credentials.password);
    return access;
  }
  return null;
};
