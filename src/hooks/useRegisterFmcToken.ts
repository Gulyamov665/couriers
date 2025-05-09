// import {useEffect} from 'react';
// import messaging from '@react-native-firebase/messaging';
// import * as Keychain from 'react-native-keychain';

// export const useRegisterFcmToken = (courierId: string) => {
//   useEffect(() => {
//     const syncFcmToken = async () => {
//       try {
//         const newToken = await messaging().getToken();

//         // Получаем сохранённый токен из Keychain
//         const credentials = await Keychain.getGenericPassword({
//           service: 'fcmToken',
//         });
//         const savedToken = credentials?.password;

//         if (newToken && newToken !== savedToken) {
//           await axios.post('https://your-api.com/api/fcm/register', {
//             courierId,
//             token: newToken,
//           });

//           // Сохраняем новый токен
//           await Keychain.setGenericPassword('fcm', newToken, {
//             service: 'fcmToken',
//           });
//         }
//       } catch (err) {
//         console.warn('Ошибка при регистрации FCM токена:', err);
//       }
//     };

//     syncFcmToken();

//     const unsubscribe = messaging().onTokenRefresh(async refreshedToken => {
//       try {
//         await axios.post('https://your-api.com/api/fcm/register', {
//           courierId,
//           token: refreshedToken,
//         });

//         await Keychain.setGenericPassword('fcm', refreshedToken, {
//           service: 'fcmToken',
//         });
//       } catch (err) {
//         console.warn('Ошибка при обновлении FCM токена:', err);
//       }
//     });

//     return unsubscribe;
//   }, [courierId]);
// };
