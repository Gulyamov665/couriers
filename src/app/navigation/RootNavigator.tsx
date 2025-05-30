import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabs from "./BottomTabs";
import { LoginScreen } from "../features/login/LoginScreen";
import { ErrorBoundary } from "../config/ErrorBoundary";
import { useCheckAuth } from "../../hooks/useCheckAuth";
import { Loader } from "../components/Loader";
import { useSelector } from "react-redux";
import { authState } from "../../store/slices/auth";
import { useNotification } from "../../hooks/useNotification";
import { useSetFcmTokenMutation } from "@store/services/auth/authApi";

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
  useNotification();
  const { isAuthenticated, isChecking } = useCheckAuth();
  const { fcmToken, user } = useSelector(authState);
  const [setTokenFCM] = useSetFcmTokenMutation();

  const setToken = async () => {
    await setTokenFCM({
      id: user?.user_id,
      fcm_token: fcmToken,
    });
  };
  useEffect(() => {
    if (fcmToken && user?.user_id) setToken();
  }, [fcmToken, isAuthenticated, user]);

  if (isChecking) return <Loader />;

  return (
    <ErrorBoundary>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            gestureEnabled: true, // свайп назад включён
            animation: "slide_from_right",
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
  );
};
