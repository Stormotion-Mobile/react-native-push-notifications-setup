import {PushNotificationOptions} from 'react-native-push-notification';

export type PushNotificationInitializeProps = {
  onNotification?: PushNotificationOptions['onNotification'];
  removeAllDeliveredNotifications?: boolean;
};

export type DeviceTokenState = {
  newToken: string;
  actualToken?: string;
  actualTokenId?: string | number;
};

export type DeviceTokenCallbacks = {
  onTokenSave: (token: string) => Promise<{id: string | number}>;
  onTokenDelete?: (id: string | number) => Promise<any>;
};
