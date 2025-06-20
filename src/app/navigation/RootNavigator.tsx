import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen } from "../features/login/LoginScreen";
import { ErrorBoundary } from "../config/ErrorBoundary";
import { useCheckAuth } from "../../hooks/useCheckAuth";
import { Loader } from "../components/Loader";
import { useSelector } from "react-redux";
import { authState } from "../../store/slices/auth";
import { useSetFcmTokenMutation } from "@store/services/auth/authApi";
import { useNotifications } from "hooks/useNotification";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import { useTheme } from "hooks/useTheme";
import { DefaultTheme as NavigationDefaultTheme, DarkTheme as NavigationDarkTheme } from "@react-navigation/native";
import BottomTabs from "./BottomTabs";

export type RootStackParamList = {
  Main: undefined;
  Login: undefined;
  Orders: undefined;
  OrdersList: undefined;
  Home: undefined;
  Profile: undefined;
  OrderDetails: { id: string };
  BottomNavbar: undefined;
  Новые: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  useNotifications();
  const { isAuthenticated, isChecking } = useCheckAuth();
  const { fcmToken, user } = useSelector(authState);
  const [setTokenFCM] = useSetFcmTokenMutation();
  const { theme, isDark } = useTheme();

  const setToken = async () => {
    await setTokenFCM({
      id: user?.user_id,
      fcm_token: fcmToken,
    });
  };
  useEffect(() => {
    if (fcmToken && user?.user_id) setToken();
  }, [fcmToken, isAuthenticated, user]);

  const navigationTheme = {
    ...(isDark ? NavigationDarkTheme : NavigationDefaultTheme),
    colors: {
      ...(isDark ? NavigationDarkTheme.colors : NavigationDefaultTheme.colors),
      background: theme.colors.background, // <-- вот этот фон
      card: theme.colors.background, // <-- фон «карточки» для native-stack
      primary: theme.colors.primary, // <-- цвет кнопок/акцентов (опционально)
      text: theme.colors.onBackground, // <-- цвет текста навигации
    },
  };

  if (isChecking) return <Loader />;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <SafeAreaView edges={["top", "bottom"]} style={{ flex: 1, backgroundColor: theme.colors.background }}>
          <StatusBar
            key={isDark ? "dark" : "light"}
            translucent={false}
            backgroundColor="transparent"
            barStyle={isDark ? "light-content" : "dark-content"}
          />
          <PaperProvider theme={theme}>
            <ErrorBoundary>
              <NavigationContainer theme={navigationTheme}>
                <Stack.Navigator
                  screenOptions={{
                    headerShown: false,
                    gestureEnabled: true, // свайп назад включён
                    animation: "slide_from_right",
                    contentStyle: {
                      backgroundColor: theme.colors.background,
                    },
                  }}
                >
                  {isAuthenticated ? (
                    <>
                      <Stack.Screen name="Main" component={BottomTabs} />
                    </>
                  ) : (
                    <Stack.Screen name="Login" component={LoginScreen} />
                  )}
                </Stack.Navigator>
              </NavigationContainer>
            </ErrorBoundary>
          </PaperProvider>
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};
