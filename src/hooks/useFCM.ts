import { useEffect, useState } from "react";
import { getApp } from "@react-native-firebase/app";
import { getMessaging, getToken, onMessage } from "@react-native-firebase/messaging";
import notifee, { AndroidImportance } from "@notifee/react-native";
import { useActions } from "./useActions";

export function useFCM(): string | null {
  const [token, setToken] = useState<string | null>(null);
  const { setFCMToken } = useActions();

  const app = getApp();
  const messaging = getMessaging(app);

  useEffect(() => {
    let unsubscribe: () => void;

    (async () => {
      // 1. Получаем и сохраняем токен
      const fcmToken = await getToken(messaging);
      if (fcmToken) {
        setFCMToken(fcmToken);
        setToken(fcmToken);
      }

      // 2. Подписываемся на foreground-пуши
      // unsubscribe = onMessage(messaging, async (remoteMessage) => {
      //   console.log("📩 Foreground FCM message:", remoteMessage);
      //   await notifee.displayNotification({
      //     title: remoteMessage.data?.title != null ? String(remoteMessage.data.title) : undefined,
      //     body: remoteMessage.data?.body != null ? String(remoteMessage.data.body) : undefined,
      //     // title: remoteMessage.data?.title,
      //     // body: remoteMessage.data?.body,
      //     android: {
      //       channelId: "aurora",
      //       sound: "sound",
      //       importance: AndroidImportance.HIGH,
      //       vibrationPattern: [300, 500],
      //     },
      //   });
      // });
    })().catch(console.error);

    // return () => {
    //   if (unsubscribe) unsubscribe();
    // };
  }, [messaging, setFCMToken]);

  return token;
}
