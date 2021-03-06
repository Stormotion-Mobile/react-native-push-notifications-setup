# A library to setup & manage Push Notifications using [react-native-push-notification](https://github.com/zo0r/react-native-push-notification) library

This package is a simple wrapper around the [react-native-push-notification](https://github.com/zo0r/react-native-push-notification) library to setup and configure essential properties faster. It provides one of the react-hooks way to manage Push Notifications.

You still need to configure natively a part of things. You can find out up-to-date instructions and tips in [The Complete Guide to Push Notifications (React Native & Node.js)](https://stormotion.io/blog/) article. It also includes this module code explanation.

## Usage:

1. Add `configurePushNotifications` in the app's first file - `index.js` (due to the [usage of react-native-push-notification](https://github.com/zo0r/react-native-push-notification#usage) library).
2. Call `useSyncNotifications` at the top level's component where you handle notifications (e.g. `NotificationContext`) to synchronize push notifications with the phone settings.
3. Call `enableNotifications`, `disableNotifications` functions in the code where you are going to manage push notifications.
4. Call `useOpenNotification` at the correct component (e.g. `RootNavigator`) to configure the app behavior on the notification click in the background mode or when the app is terminated.

## Methods, hooks and types

- `configurePushNotifications` - configure and initialize push notifications.  
  Params:

  - `options` - `PushNotificationOptions` ([description](https://github.com/zo0r/react-native-push-notification#usage))
  - `channels` - array of `ChannelObjects` (if you develop for Android) - starting in Android 8.0 (API level 26), all notifications must be assigned to a channel. For each channel, you can set the visual and auditory behavior that is applied to all notifications in that channel. Then, users can change these settings and decide which notification channels from your app should be intrusive or visible at all (according to [Android documentation](https://developer.android.com/training/notify-user/channels)).

- `arePushNotificationsEnabled` - a method to check if the push notifications are enabled (permissions granted).

- `useSyncNotifications` - a hook to initialize & sync notifications with phone settings. It helps to manage notifications when they are received in the background mode (open the notification).  
  Params:

  - `initProps` - an object to manage notifications that were received in the background mode.
    - `removeAllDeliveredNotifications` - a boolean parameter that tells the app whether it should delete all notifications from Notification Center or not.
  - `syncNotificationsOptions` - a set of callbacks:
    - `deviceTokenCallbacks` - an object with callback functions to manage device tokens on saving and deleting.
    - `onEnabling` - a function that is called if enabling notifications is successful.
    - `onDisabling` - a function that is called if disabling notifications is successful.

- `useOpenNotification` - a hook to manage the app behavior on clicking a notification.  
  Params:

  - `onNotification` - a function to handle the notification when it is received or opened.

- `enableNotifications` - a function to enable push notifications.
  Params (object):

  - `deviceTokenCallbacks` - an object with callback functions to manage device tokens on saving and deleting.
  - `onEnabling` - a function that is called if enabling notifications is successful.
  - `onPermissionDenied` - a function that is executed when permissions are not granted. For example, show the alert window that will notify the user about it and suggest going to the Settings to fix it.

- `disableNotifications` - a function to disable push notifications.
  Params (object):
  - `onDisabling` - a function that is called if disabling notifications is successful.
  - `deviceTokenCallbacks` - an object with callback functions to manage device tokens on saving and deleting.

`deviceTokenCallbacks` functions help to synchronize device registration tokens with the back-end database and prevent storing invalid ones. The token can change on enabling/disabling notifications (changing permissions), restoring the app on a new device, re-installing the app, or clearing the app data. This library saves the token and its database unique identifier, so if it changes, the library "sends the signal" - executes `onTokenDelete` and `onTokenSave` functions.

So, preferably:

- `onTokenSave` - an API request to save the token into the back-end database that returns its `id`;
- `onTokenSave` - an API request to delete the token from the database that accepts its `id` as a parameter.

## Bugs? Proposals?

Feel free to open issues in case of bugs or proposals!
