import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem('token', token)
  } catch (error) {
    console.log({error});
  }
};

export const getToken = () => {
  try {
    return AsyncStorage.getItem('token');
  } catch (error) {
    console.log({error});
  } 
}