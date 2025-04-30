// import {useEffect, useState} from 'react';
// import {PermissionsAndroid} from 'react-native';
// import messaging from '@react-native-firebase/messaging';
// // import {getMessaging, getToken} from '@react-native-firebase/messaging';

// const requestUserPermission = async () => {
//   const granted = await PermissionsAndroid.request(
//     PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
//   );
//   if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//     console.log('You can use the notifications');
//   } else {
//     console.log('Notification permission denied');
//   }
// };

// export const useNotification = (): string | null => {
//   const [token, setToken] = useState<string | null>(null);
//   useEffect(() => {
//     requestUserPermission();
//     getToken();
//   }, []);

//   const getToken = async () => {
//     try {
//       const fcmToken = await messaging().getToken();
//       console.log('Your Firebase Token is:', fcmToken);
//       setToken(fcmToken);
//     } catch (error) {
//       console.log('Error getting token', error);
//     }
//   };

//   return token;
// };

import {useEffect, useState} from 'react';
import {PermissionsAndroid} from 'react-native';
import {getApp} from '@react-native-firebase/app';
import {getMessaging, getToken} from '@react-native-firebase/messaging';

const requestUserPermission = async () => {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
  );

  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    console.log('You can use the notifications');
  } else {
    console.log('Notification permission denied');
  }
};

export const useNotification = (): string | null => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    requestUserPermission();
    getFCMToken();
  }, []);

  const getFCMToken = async () => {
    try {
      const app = getApp();
      const messaging = getMessaging(app);
      const fcmToken = await getToken(messaging);
      console.log('Your Firebase Token is:', fcmToken);
      setToken(fcmToken);
    } catch (error) {
      console.log('Error getting token', error);
    }
  };

  return token;
};
