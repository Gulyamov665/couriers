import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { PaperProvider } from "react-native-paper";
import { RootNavigator } from "./app/navigation/RootNavigator";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useForegroundSocketService } from "hooks/useForegroundSocketService";

export default function App() {
  useForegroundSocketService();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Provider store={store}>
            <PaperProvider>
              <RootNavigator />
              {/* <FloatingFCMToggle /> */}
            </PaperProvider>
          </Provider>
        </GestureHandlerRootView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
