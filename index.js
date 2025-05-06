/**
 * @format
 */

import messaging from '@react-native-firebase/messaging';

// 👇 обязательно ДО AppRegistry
globalThis.RNFB_SILENCE_MODULAR_DEPRECATION_WARNINGS = true;
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
});

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';


AppRegistry.registerComponent(appName, () => App);
