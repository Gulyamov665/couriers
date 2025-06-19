import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { RootNavigator } from "./app/navigation/RootNavigator";
import { useForegroundSocketService } from "hooks/useForegroundSocketService";
import { ThemeProvider } from "hooks/useTheme";

export default function App() {
  useForegroundSocketService();

  return (
    <>
      <Provider store={store}>
        <ThemeProvider>
          <RootNavigator />
        </ThemeProvider>
      </Provider>
    </>
  );
}
