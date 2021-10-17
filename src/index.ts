export {default as usePushNotifications} from './hooks/usePushNotifications';
export {default as useInitNotifications} from './hooks/useInitNotifications';

export {configurePushNotifications} from './utils/pushNotifications/index';
export {checkCanSendNotifications as arePushNotificationsEnabled} from './utils/pushNotifications/permissions';

export * from './types';
