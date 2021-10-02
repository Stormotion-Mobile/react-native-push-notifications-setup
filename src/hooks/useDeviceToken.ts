import {useCallback} from 'react';
import {DeviceTokenCallbacks, DeviceTokenState} from '../types';
import {
  getSavedDeviceTokenState,
  removeActualDeviceTokenState,
  saveDeviceTokenState,
} from '../utils/deviceToken';
import errorHandler from '../utils/errorHandler';

const useDeviceToken = <T>({
  onTokenSave,
  onTokenDelete,
}: DeviceTokenCallbacks<T>) => {
  const registerDeviceToken = useCallback<(token: string) => Promise<void>>(
    async token => {
      try {
        const response = await onTokenSave(token);

        const savedTokenState = await getSavedDeviceTokenState<T>();

        const oldTokenId = savedTokenState?.actualTokenId;

        const newTokenState: DeviceTokenState<T> = {
          actualToken: token,
          actualTokenId: response.id,
          newToken: savedTokenState?.newToken ?? '',
        };

        await saveDeviceTokenState<T>(newTokenState);

        if (oldTokenId && response.id !== oldTokenId) {
          await onTokenDelete?.(oldTokenId);
        }
      } catch (error) {
        errorHandler('Saving device token request error', error);
      }
    },
    [onTokenDelete, onTokenSave],
  );

  const unregisterDeviceToken = useCallback<(id: T) => Promise<void>>(
    async id => {
      try {
        await onTokenDelete?.(id);

        await removeActualDeviceTokenState();
      } catch (error) {
        errorHandler('Deleting device token request error', error);
      }
    },
    [onTokenDelete],
  );

  return {registerDeviceToken, unregisterDeviceToken};
};

export default useDeviceToken;
