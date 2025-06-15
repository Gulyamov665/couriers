import { useEffect } from "react";
import { NativeModules, Platform } from "react-native";

export function useForegroundSocketService() {
  const { SocketServiceModule } = NativeModules as {
    SocketServiceModule?: {
      startSocketService: () => void;
      stopSocketService: () => void;
    };
  };

  useEffect(() => {
    if (Platform.OS === "android" && SocketServiceModule?.startSocketService) {
      SocketServiceModule.startSocketService();
    //   console.log("✅ SocketServiceModule.startSocketService()");
    }

    return () => {
      if (Platform.OS === "android" && SocketServiceModule?.stopSocketService) {
        SocketServiceModule.stopSocketService();
      }
    };
  }, [SocketServiceModule]);
}
