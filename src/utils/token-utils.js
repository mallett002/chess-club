import jwt_decode from 'jwt-decode'
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

export const decodeJwt = (accessToken) => {
  const [, token] = accessToken.split(' ');

  return jwt_decode(token);
};