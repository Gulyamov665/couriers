import {useEffect, useState} from 'react';
import {PermissionsAndroid} from 'react-native';
import {getApp} from '@react-native-firebase/app';
import {
  getMessaging,
  getToken,
  onMessage,
} from '@react-native-firebase/messaging';
import notifee, {AndroidImportance} from '@notifee/react-native';

const createNotificationChannel = async () => {
  await notifee.createChannel({
    id: 'aurora',
    name: 'aurora',
    sound: 'sound1',
    importance: AndroidImportance.HIGH,
    vibration: true,
    vibrationPattern: [300, 500],
  });
};

const requestUserPermission = async () => {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
  );

  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    console.log('You can use the notifications');
    await createNotificationChannel();
  } else {
    console.log('Notification permission denied');
  }
};

export const useNotification = (): string | null => {
  const [token, setToken] = useState<string | null>(null);
  const app = getApp();
  const messaging = getMessaging(app);

  useEffect(() => {
    const setup = async () => {
      await requestUserPermission();
      await getFCMToken();

      // 👇 Теперь передаём messaging как первый аргумент
      const unsubscribe = onMessage(messaging, async remoteMessage => {
        console.log('Foreground message received', remoteMessage);

        await notifee.displayNotification({
          title: remoteMessage.notification?.title,
          body: remoteMessage.notification?.body,
          android: {
            channelId: 'aurora',
            sound: 'sound1',
            importance: AndroidImportance.HIGH,
            vibrationPattern: [300, 500],
            pressAction: {
              id: 'default',
            },
          },
        });
      });

      return unsubscribe;
    };

    const unsubscribePromise = setup();

    // Очистка при размонтировании
    return () => {
      unsubscribePromise.then(unsub => {
        if (typeof unsub === 'function') unsub();
      });
    };
  }, []);

  const getFCMToken = async () => {
    try {
      const fcmToken = await getToken(messaging);
      console.log('Your Firebase Token is:', fcmToken);
      setToken(fcmToken);
    } catch (error) {
      console.log('Error getting token', error);
    }
  };

  return token;
};
