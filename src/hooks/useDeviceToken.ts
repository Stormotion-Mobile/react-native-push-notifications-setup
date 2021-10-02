import {useCallback} from 'react';
import {DeviceTokenCallbacks, DeviceTokenState} from '../types';
import {
  getSavedDeviceTokenState,
  removeActualDeviceTokenState,
  saveDeviceTokenState,
} from '../utils/deviceToken';
import errorHandler from '../utils/errorHandler';

const useDeviceToken = ({onTokenSave, onTokenDelete}: DeviceTokenCallbacks) => {
  const registerDeviceToken = useCallback<(token: string) => Promise<void>>(
    async token => {
      try {
        const response = await onTokenSave(token);

        const savedTokenState = await getSavedDeviceTokenState();

        const oldTokenId = savedTokenState?.actualTokenId;

        const newTokenState: DeviceTokenState = {
          actualToken: token,
          actualTokenId: response.id,
          newToken: savedTokenState?.newToken ?? '',
        };

        saveDeviceTokenState(newTokenState);

        if (oldTokenId && response.id !== oldTokenId) {
          await onTokenDelete?.(oldTokenId);
        }
      } catch (error) {
        errorHandler('Saving device token request error', error);
      }
    },
    [onTokenDelete, onTokenSave],
  );

  const unregisterDeviceToken = useCallback<
    (id: string | number) => Promise<void>
  >(
    async id => {
      try {
        await onTokenDelete?.(id);

        removeActualDeviceTokenState();
      } catch (error) {
        errorHandler('Deleting device token request error', error);
      }
    },
    [onTokenDelete],
  );

  return {registerDeviceToken, unregisterDeviceToken};
};

export default useDeviceToken;
