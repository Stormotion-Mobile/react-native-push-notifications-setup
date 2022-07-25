export {default as useSyncNotifications} from './hooks/useSyncNotifications';
export {default as useOpenNotification} from './hooks/useOpenNotification';
export {enableNotifications, disableNotifications} from './pushNotifications';

export {configurePushNotifications} from './utils/pushNotifications/index';
export {checkCanSendNotifications as arePushNotificationsEnabled} from './utils/pushNotifications/permissions';

export * from './types';
