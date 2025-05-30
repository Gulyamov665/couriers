import notifee, { AndroidImportance } from "@notifee/react-native";
import { PermissionsAndroid } from "react-native";

const createNotificationChannel = async () => {
  await notifee.createChannel({
    id: "aurora",
    name: "aurora",
    sound: "sound",
    importance: AndroidImportance.HIGH,
    vibration: true,
    vibrationPattern: [300, 500],
  });
};

const requestUserPermission = async () => {
  const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    console.log("You can use the notifications");
    await createNotificationChannel();
  } else {
    console.log("Notification permission denied");
  }
};

export { createNotificationChannel, requestUserPermission };
