import {Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';
import {registerDeviceToken, unregisterDeviceToken} from './deviceToken';
import {DeviceTokenCallbacks} from './types';
import {getSavedDeviceTokenState} from './utils/deviceToken';
import {
  arePermissionsGranted,
  checkCanSendNotifications,
} from './utils/pushNotifications';

const activateNotifications = async <T>(
  deviceTokenCallbacks?: DeviceTokenCallbacks<T>,
) => {
  //To get the token definitely on iOS we need to request permissions
  Platform.OS === 'ios' && (await PushNotification.requestPermissions());

  const savedToken = await getSavedDeviceTokenState();
  const {newToken, actualToken} = savedToken ?? {};

  if (!savedToken || newToken === actualToken) {
    return;
  }

  if (!newToken) {
    return;
  }

  await registerDeviceToken(newToken, deviceTokenCallbacks);
};

export const enableNotifications = async <T>(
  deviceTokenCallbacks?: DeviceTokenCallbacks<T>,
  onPermissionDenied?: () => void,
) => {
  const canSendNotifications = await checkCanSendNotifications();

  if (!canSendNotifications) {
    onPermissionDenied?.();
    return;
  }

  await activateNotifications(deviceTokenCallbacks);
};

export const disableNotifications = async <T>(
  deviceTokenCallbacks?: DeviceTokenCallbacks<T>,
) => {
  const savedToken = await getSavedDeviceTokenState<T>();

  if (!savedToken?.actualTokenId) {
    return;
  }

  await unregisterDeviceToken(savedToken.actualTokenId, deviceTokenCallbacks);
};

export const syncNotifications = async <T>(
  deviceTokenCallbacks?: DeviceTokenCallbacks<T>,
) => {
  const granted = await arePermissionsGranted();

  if (!granted) {
    await disableNotifications(deviceTokenCallbacks);
    return;
  }

  await activateNotifications(deviceTokenCallbacks);
};
