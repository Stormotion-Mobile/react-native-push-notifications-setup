import {useEffect} from 'react';
import {OnNotification} from '../types';
import {openInitialNotification} from '../utils/pushNotifications';

const useOpenNotification = (onNotification: OnNotification) => {
  useEffect(() => {
    openInitialNotification(onNotification);
  }, [onNotification]);
};

export default useOpenNotification;
