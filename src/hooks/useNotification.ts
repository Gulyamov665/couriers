import { useNotificationChannel } from "./useNotificationChannel";
import { useFCM } from "./useFCM";

export function useNotifications() {
  useNotificationChannel();
  const fcmToken = useFCM();
  return fcmToken;
}
