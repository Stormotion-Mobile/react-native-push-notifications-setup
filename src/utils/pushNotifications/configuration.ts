import {Platform} from 'react-native';
import PushNotification, {
  ChannelObject,
  PushNotificationOptions,
} from 'react-native-push-notification';
import {PushNotificationInitializeProps} from '../../types';
import {registerToken} from '../deviceToken';
import devLog from '../devLog';
import errorHandler from '../errorHandler';
import {createNotificationsChannels} from './channels';

const defaultOptions: PushNotificationOptions = {
  onNotification: notification => devLog('Notification', notification),

  onRegistrationError: error =>
    errorHandler('On push notifications registration error', error),

  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: false,
  requestPermissions: Platform.OS === 'android',
};

const saveToken: (
  options?: PushNotificationOptions,
) => PushNotificationOptions['onRegister'] = options => async tokenPayload => {
  await registerToken(tokenPayload.token);

  options?.onRegister?.(tokenPayload);
};

export const configurePushNotifications = (
  options?: PushNotificationOptions,
  channels?: ChannelObject[],
) => {
  PushNotification.configure({
    ...defaultOptions,
    ...options,
    onRegister: saveToken(options),
  });
  channels && createNotificationsChannels(channels);
};

export const configureInitOptions = ({
  removeAllDeliveredNotifications = false,
}: PushNotificationInitializeProps) => {
  if (removeAllDeliveredNotifications) {
    PushNotification.removeAllDeliveredNotifications();
  }
};

export const openInitialNotification = (
  onNotification: PushNotificationOptions['onNotification'],
) => {
  PushNotification.popInitialNotification(notification => {
    notification && onNotification?.(notification);
  });
};
