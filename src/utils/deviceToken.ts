import AsyncStorage from '@react-native-async-storage/async-storage';
import {DeviceTokenState} from '../types';
import errorHandler from './errorHandler';

export const DEVICE_TOKEN_KEY = 'deviceToken';

export const saveDeviceTokenState = async <T>(
  tokenState: DeviceTokenState<T>,
) => {
  try {
    await AsyncStorage.setItem(DEVICE_TOKEN_KEY, JSON.stringify(tokenState));
  } catch (error) {
    errorHandler('Setting device token error', error);
    throw error;
  }
};

export const getSavedDeviceTokenState = async <T>() => {
  try {
    const tokenStateAsString = await AsyncStorage.getItem(DEVICE_TOKEN_KEY);

    const tokenState = tokenStateAsString
      ? JSON.parse(tokenStateAsString)
      : null;

    return tokenState as DeviceTokenState<T>;
  } catch (error) {
    errorHandler('Getting device token error', error);
  }
};

export const removeActualDeviceTokenState = async <T>() => {
  try {
    const tokenState = await getSavedDeviceTokenState<T>();

    tokenState && saveDeviceTokenState<T>({newToken: tokenState.newToken});
  } catch (error) {
    errorHandler('Removing actual device token error', error);
  }
};

export const registerToken = async <T>(token: string) => {
  try {
    const savedTokenState = await getSavedDeviceTokenState<T>();

    if (!savedTokenState) {
      const newTokenState = {newToken: token};
      saveDeviceTokenState(newTokenState);
      return;
    }

    if (token === savedTokenState.actualToken) {
      return;
    }

    const newTokenState: DeviceTokenState<T> = {
      ...savedTokenState,
      newToken: token,
    };

    saveDeviceTokenState(newTokenState);
  } catch (error) {
    errorHandler('Registering device token error', error);
  }
};
