import {useEffect, useRef} from 'react';
import {syncNotifications} from '../pushNotifications';
import {
  PushNotificationInitializeProps,
  SyncNotificationsOptions,
} from '../types';
import {configureInitOptions} from '../utils/pushNotifications';

const useSyncNotifications = <T>(
  initProps: PushNotificationInitializeProps,
  syncNotificationsOptions: SyncNotificationsOptions<T>,
) => {
  //To prevent calling syncNotifications function several times
  const firstLoaded = useRef(true);

  useEffect(() => {
    if (!firstLoaded.current) {
      return;
    }

    syncNotifications(syncNotificationsOptions);
    firstLoaded.current = false;
  }, [syncNotificationsOptions]);

  useEffect(() => {
    configureInitOptions(initProps);
  }, [initProps]);
};

export default useSyncNotifications;
