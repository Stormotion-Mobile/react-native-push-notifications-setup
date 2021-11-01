import {useEffect, useRef} from 'react';
import {syncNotifications} from '../pushNotifications';
import {DeviceTokenCallbacks, PushNotificationInitializeProps} from '../types';
import {initPushNotifications} from '../utils/pushNotifications';

const useInitNotifications = <T>(
  initProps: PushNotificationInitializeProps,
  deviceTokenCallbacks?: DeviceTokenCallbacks<T>,
) => {
  //To prevent calling syncNotifications function several times
  const firstLoaded = useRef(true);

  useEffect(() => {
    if (!firstLoaded.current) {
      return;
    }

    syncNotifications(deviceTokenCallbacks);
    firstLoaded.current = false;
  }, [deviceTokenCallbacks]);

  useEffect(() => {
    initPushNotifications(initProps);
  }, [initProps]);
};

export default useInitNotifications;
