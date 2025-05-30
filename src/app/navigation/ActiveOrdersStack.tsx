import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./RootNavigator";
import { OrdersActive } from "../features/orders/screens/OrdersActive";
import { OrderDetailsScreen } from "app/features/orders/components/OrderDetailsScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const ActiveOrdersStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true, // свайп назад включён
        animation: "slide_from_right", // анимация свайпа
      }}
    >
      <Stack.Screen name="OrdersList" component={OrdersActive} options={{ headerShown: false }} />
      <Stack.Screen name="OrderDetails" component={OrderDetailsScreen} options={{ title: "Детали заказа" }} />
    </Stack.Navigator>
  );
};
