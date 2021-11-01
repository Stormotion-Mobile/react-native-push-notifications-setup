import {DeviceTokenCallbacks, DeviceTokenState} from './types';
import {
  getSavedDeviceTokenState,
  removeActualDeviceTokenState,
  saveDeviceTokenState,
} from './utils/deviceToken';
import errorHandler from './utils/errorHandler';

const emptyDeviceTokenCallbacks = {
  onTokenSave: undefined,
  onTokenDelete: undefined,
};

export const registerDeviceToken = async <T>(
  token: string,
  deviceTokenCallbacks?: DeviceTokenCallbacks<T>,
) => {
  try {
    const {onTokenSave, onTokenDelete} =
      deviceTokenCallbacks ?? emptyDeviceTokenCallbacks;

    const savedTokenState = await getSavedDeviceTokenState<T>();

    const oldTokenId = savedTokenState?.actualTokenId;

    const response = await onTokenSave?.(token);

    const newTokenState: DeviceTokenState<T> = {
      actualToken: token,
      actualTokenId: response?.id,
      newToken: savedTokenState?.newToken ?? '',
    };

    await saveDeviceTokenState<T>(newTokenState);

    if (oldTokenId && response?.id !== oldTokenId) {
      await onTokenDelete?.(oldTokenId);
    }
  } catch (error) {
    errorHandler('Saving device token request error', error);
  }
};

export const unregisterDeviceToken = async <T>(
  id: T,
  deviceTokenCallbacks?: DeviceTokenCallbacks<T>,
) => {
  try {
    const {onTokenDelete} = deviceTokenCallbacks ?? emptyDeviceTokenCallbacks;

    await onTokenDelete?.(id);

    await removeActualDeviceTokenState();
  } catch (error) {
    errorHandler('Deleting device token request error', error);
  }
};
