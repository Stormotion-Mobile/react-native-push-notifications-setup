export {default as useInitNotifications} from './hooks/useInitNotifications';
export {enableNotifications, disableNotifications} from './pushNotifications';

export {configurePushNotifications} from './utils/pushNotifications/index';
export {checkCanSendNotifications as arePushNotificationsEnabled} from './utils/pushNotifications/permissions';

export * from './types';
