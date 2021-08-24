import AsyncStorage from '@react-native-async-storage/async-storage';
import {DeviceTokenState} from '../types';
import devLog from './devLog';

export const DEVICE_TOKEN_KEY = 'deviceToken';

export const saveDeviceTokenState = async (tokenState: DeviceTokenState) => {
  try {
    await AsyncStorage.setItem(DEVICE_TOKEN_KEY, JSON.stringify(tokenState));
  } catch (error) {
    devLog('Setting device token error', error);
  }
};

export const getSavedDeviceTokenState = async () => {
  try {
    const tokenStateAsString = await AsyncStorage.getItem(DEVICE_TOKEN_KEY);

    const tokenState = tokenStateAsString
      ? JSON.parse(tokenStateAsString)
      : null;

    return tokenState as DeviceTokenState;
  } catch (error) {
    devLog('Getting device token error', error);
  }
};

export const removeActualDeviceTokenState = async () => {
  try {
    const tokenState = await getSavedDeviceTokenState();

    tokenState && saveDeviceTokenState({newToken: tokenState.newToken});
  } catch (error) {
    devLog('Removing actual device token error', error);
  }
};

export const registerToken = async (token: string) => {
  try {
    const savedTokenState = await getSavedDeviceTokenState();

    if (!savedTokenState) {
      const newTokenState = {newToken: token};
      saveDeviceTokenState(newTokenState);
      return;
    }

    if (token === savedTokenState.actualToken) {
      return;
    }

    const newTokenState: DeviceTokenState = {
      ...savedTokenState,
      newToken: token,
    };

    saveDeviceTokenState(newTokenState);
  } catch (error) {
    devLog('Registering device token error', error);
  }
};
