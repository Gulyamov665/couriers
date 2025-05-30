import { useEffect, useState } from "react";
import { getApp } from "@react-native-firebase/app";
import { getToken, onMessage } from "@react-native-firebase/messaging";
import { getMessaging } from "@react-native-firebase/messaging";
import notifee, { AndroidImportance } from "@notifee/react-native";
import { useActions } from "./useActions";
import { requestUserPermission } from "../app/config/notification";

export const useNotification = (): string | null => {
  const [token, setToken] = useState<string | null>(null);
  const { setFCMToken } = useActions();
  const app = getApp();
  const messaging = getMessaging(app);

  useEffect(() => {
    const setup = async () => {
      await requestUserPermission();
      await getFCMToken();

      // 👇 Теперь передаём messaging как первый аргумент
      const unsubscribe = onMessage(messaging, async (remoteMessage) => {
        console.log("Foreground message received", remoteMessage);

        await notifee.displayNotification({
          title: remoteMessage.notification?.title,
          body: remoteMessage.notification?.body,
          android: {
            channelId: "aurora",
            sound: "sound",
            importance: AndroidImportance.HIGH,
            vibrationPattern: [300, 500],
            pressAction: {
              id: "default",
            },
          },
        });
      });

      return unsubscribe;
    };

    const unsubscribePromise = setup();

    // Очистка при размонтировании
    return () => {
      unsubscribePromise.then((unsub) => {
        if (typeof unsub === "function") unsub();
      });
    };
  }, []);

  const getFCMToken = async () => {
    try {
      const fcmToken = await getToken(messaging);
      console.log(fcmToken);
      setFCMToken(fcmToken);
      setToken(fcmToken);
    } catch (error) {
      console.log("Error getting token", error);
    }
  };

  return token;
};
