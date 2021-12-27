import {decode} from 'jsonwebtoken'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const persistTokenInStorage = async (token) => {
  try {
    await AsyncStorage.setItem('token', token);

    return token;
  } catch (error) {
    console.log({error});
  }
};

export const getTokenFromStorage = () => {
  try {
    return AsyncStorage.getItem('token');
  } catch (error) {
    console.log({error});
  } 
};

// TODO: install config and use it for this
export const decodeJwt = (accessToken) => {
  const [, token] = accessToken.split(' ');
  // const privateKey = config.get('tokenPrivateKey');

  // This seems to be causing an error
  // return decode(accessToken);
};