/**
 * @format
 */

import messaging from '@react-native-firebase/messaging';
// import notifee, { AndroidImportance } from "@notifee/react-native";
import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';


// 👇 обязательно ДО AppRegistry
globalThis.RNFB_SILENCE_MODULAR_DEPRECATION_WARNINGS = true;
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
    const { title, body } = remoteMessage.data;

    await notifee.displayNotification({
        title: title || 'Aurora',
        body: body || 'Новый заказ',
        android: {
            channelId: 'aurora',
            importance: AndroidImportance.HIGH,
            sound: 'sound',
            vibrationPattern: [300, 500],
        },
    });
});



AppRegistry.registerComponent(appName, () => App);

