import {PushNotificationOptions} from 'react-native-push-notification';

export type PushNotificationInitializeProps = {
  onNotification?: PushNotificationOptions['onNotification'];
  removeAllDeliveredNotifications?: boolean;
};

export type DeviceTokenState<IdType> = {
  newToken: string;
  actualToken?: string;
  actualTokenId?: IdType;
};

export type DeviceTokenCallbacks<IdType> = {
  onTokenSave: (token: string) => Promise<{id: IdType}>;
  onTokenDelete?: (id: IdType) => Promise<any>;
};
