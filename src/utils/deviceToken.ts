import AsyncStorage from '@react-native-async-storage/async-storage';
import {DeviceTokenState} from '../types';

export const DEVICE_TOKEN_KEY = 'deviceToken';

export const saveDeviceTokenState = <T>(tokenState: DeviceTokenState<T>) =>
  AsyncStorage.setItem(DEVICE_TOKEN_KEY, JSON.stringify(tokenState));

export const getSavedDeviceTokenState = async <T>() => {
  const tokenStateAsString = await AsyncStorage.getItem(DEVICE_TOKEN_KEY);

  const tokenState = tokenStateAsString ? JSON.parse(tokenStateAsString) : null;

  return tokenState as DeviceTokenState<T> | null;
};

export const removeActualDeviceTokenState = async <T>() => {
  const tokenState = await getSavedDeviceTokenState<T>();

  if (!tokenState) {
    return;
  }

  await saveDeviceTokenState<T>({newToken: tokenState.newToken});
};

export const registerToken = async <T>(token: string) => {
  const savedTokenState = await getSavedDeviceTokenState<T>();

  if (!savedTokenState) {
    const newTokenState = {newToken: token};
    await saveDeviceTokenState(newTokenState);
    return;
  }

  if (token === savedTokenState.actualToken) {
    return;
  }

  const newTokenState: DeviceTokenState<T> = {
    ...savedTokenState,
    newToken: token,
  };

  await saveDeviceTokenState(newTokenState);
};
