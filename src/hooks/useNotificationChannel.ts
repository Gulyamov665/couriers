// src/hooks/useNotificationChannel.ts
import { useEffect } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import notifee, { AndroidImportance } from "@notifee/react-native";

async function initAuroraChannel() {
  try {
    await notifee.deleteChannel("aurora");
  } catch {}

  // Создаем новый
  await notifee.createChannel({
    id: "aurora",
    name: "Aurora Channel",
    sound: "sound",
    importance: AndroidImportance.HIGH,
    vibration: true,
    vibrationPattern: [300, 500],
  });
}

export function useNotificationChannel() {
  useEffect(() => {
    (async () => {
      if (Platform.OS === "android" && Platform.Version >= 33) {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.warn("User denied notification permission");
        }
      }
      await initAuroraChannel();
      console.log("✅ Aurora notification channel is ready");
    })().catch(console.error);
  }, []);
}
