import {useEffect, useRef} from 'react';
import {DeviceTokenCallbacks, PushNotificationInitializeProps} from '../types';
import {initPushNotifications} from '../utils/pushNotifications';
import usePushNotifications from './usePushNotifications';

const useInitNotifications = <T>(
  initProps: PushNotificationInitializeProps,
  deviceTokenCallbacks: DeviceTokenCallbacks<T>,
) => {
  const {syncNotifications} = usePushNotifications(deviceTokenCallbacks);

  //To prevent calling syncNotifications function several times
  const firstLoaded = useRef(true);

  useEffect(() => {
    if (!firstLoaded.current) {
      return;
    }

    syncNotifications();
    firstLoaded.current = false;
  }, [syncNotifications]);

  useEffect(() => {
    initPushNotifications(initProps);
  }, [initProps]);
};

export default useInitNotifications;
