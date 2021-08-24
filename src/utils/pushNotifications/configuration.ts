import {Platform} from 'react-native';
import PushNotification, {
  ChannelObject,
  PushNotificationOptions,
} from 'react-native-push-notification';
import {PushNotificationInitializeProps} from '../../types';
import {registerToken} from '../deviceToken';
import devLog from '../devLog';
import {createNotificationsChannels} from './channels';

const defaultOptions: PushNotificationOptions = {
  onRegister: async ({token}) => await registerToken(token),

  onNotification: notification => devLog('Notification', notification),

  onRegistrationError: error =>
    devLog('On push notifications registration error', error),

  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: false,
  requestPermissions: Platform.OS === 'android',
};

export const configurePushNotifications = (
  options?: PushNotificationOptions,
  channels?: ChannelObject[],
) => {
  PushNotification.configure({...defaultOptions, ...options});
  channels && createNotificationsChannels(channels);
};

export const initPushNotifications = ({
  onNotification,
  removeAllDeliveredNotifications = false,
}: PushNotificationInitializeProps) => {
  PushNotification.popInitialNotification(notification => {
    notification && onNotification?.(notification);
  });

  if (removeAllDeliveredNotifications) {
    PushNotification.removeAllDeliveredNotifications();
  }
};
