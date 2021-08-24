import {useCallback} from 'react';
import {Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';
import {DeviceTokenCallbacks} from '../types';
import {getSavedDeviceTokenState} from '../utils/deviceToken';
import {
  arePermissionsGranted,
  checkCanSendNotifications,
} from '../utils/pushNotifications';
import useDeviceToken from './useDeviceToken';

const usePushNotifications = (deviceTokenCallbacks: DeviceTokenCallbacks) => {
  const {registerDeviceToken, unregisterDeviceToken} =
    useDeviceToken(deviceTokenCallbacks);

  const activateNotifications = useCallback(async () => {
    //To get the token definitely on iOS we need to request permissions
    Platform.OS === 'ios' && (await PushNotification.requestPermissions());

    const savedToken = await getSavedDeviceTokenState();
    const {newToken, actualToken} = savedToken ?? {};

    if (!savedToken || newToken === actualToken) {
      return;
    }

    newToken && registerDeviceToken(newToken);
  }, [registerDeviceToken]);

  const enableNotifications = useCallback<
    (onPermissionDenied?: () => void) => Promise<void>
  >(
    async onPermissionDenied => {
      const canSendNotifications = await checkCanSendNotifications();

      if (!canSendNotifications) {
        onPermissionDenied?.();
        return;
      }

      await activateNotifications();
    },
    [activateNotifications],
  );

  const disableNotifications = useCallback(async () => {
    const savedToken = await getSavedDeviceTokenState();

    savedToken?.actualTokenId &&
      unregisterDeviceToken(savedToken.actualTokenId);
  }, [unregisterDeviceToken]);

  const syncNotifications = useCallback(async () => {
    const granted = await arePermissionsGranted();

    if (!granted) {
      disableNotifications();
      return;
    }

    await activateNotifications();
  }, [activateNotifications, disableNotifications]);

  return {
    disableNotifications,
    enableNotifications,
    syncNotifications,
  };
};

export default usePushNotifications;
