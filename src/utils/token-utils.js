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

export const removeTokenFromStorage = async (token) => {
  try {
    await AsyncStorage.removeItem('token');
  } catch (error) {
    console.log({error});
  }
};

export const getTokenFromStorage = async () => {
  try {
    const token = await AsyncStorage.getItem('token');

    if (!token) {
      return null;
    }

    return token;
  } catch (error) {
    console.log({error});
  } 
};

export const decodeJwt = (accessToken) => {
  const [, token] = accessToken.split(' ');

  return jwt_decode(token);
};