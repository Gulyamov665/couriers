// import {useEffect} from 'react';
// import messaging from '@react-native-firebase/messaging';

// export const useRegisterFcmToken = (courierId: string) => {
//   useEffect(() => {
//     const syncFcmToken = async () => {
//       try {
//         const newToken = await messaging().getToken();
//         const savedToken = await AsyncStorage.getItem('fcmToken');

//         if (newToken && newToken !== savedToken) {
//           await axios.post('https://your-api.com/api/fcm/register', {
//             courierId,
//             token: newToken,
//           });

//           await AsyncStorage.setItem('fcmToken', newToken);
//         }
//       } catch (err) {
//         console.warn('Ошибка при регистрации FCM токена:', err);
//       }
//     };

//     // При монтировании компонента
//     syncFcmToken();

//     // При обновлении токена
//     const unsubscribe = messaging().onTokenRefresh(async refreshedToken => {
//       try {
//         await axios.post('https://your-api.com/api/fcm/register', {
//           courierId,
//           token: refreshedToken,
//         });

//         await AsyncStorage.setItem('fcmToken', refreshedToken);
//       } catch (err) {
//         console.warn('Ошибка при обновлении FCM токена:', err);
//       }
//     });

//     return unsubscribe;
//   }, [courierId]);
// };

