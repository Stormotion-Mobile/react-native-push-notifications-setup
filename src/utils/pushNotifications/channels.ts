import {Platform} from 'react-native';
import PushNotification, {ChannelObject} from 'react-native-push-notification';
import devLog from '../devLog';

const channelExistsAsync = (channelId: string) =>
  new Promise<boolean>(resolve => {
    PushNotification.channelExists(channelId, exists => resolve(exists));
  });

export const createNotificationsChannels = async (
  channels: ChannelObject[],
) => {
  if (Platform.OS !== 'android') {
    return;
  }

  await Promise.all(
    channels.map(
      async ({
        channelId,
        importance = 5,
        soundName = 'default',
        vibrate = true,
        ...rest
      }) => {
        const exists = await channelExistsAsync(channelId);
        if (exists) {
          return;
        }

        return PushNotification.createChannel(
          {channelId, importance, soundName, vibrate, ...rest},
          created => devLog(`Channel ${channelId} created:`, created),
        );
      },
    ),
  );
};
