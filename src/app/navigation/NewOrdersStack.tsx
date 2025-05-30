import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { OrdersNew } from "app/features/orders/screens/OrdersNew";
import { OrderDetailsScreen } from "app/features/orders/components/OrderDetailsScreen";

export type OrdersStackParamList = {
  OrdersList: undefined;
  OrderDetails: { id: string };
};

const Stack = createNativeStackNavigator<OrdersStackParamList>();

export const NewOrdersStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true, // свайп назад включён
        animation: "slide_from_right", // анимация свайпа
      }}
    >
      <Stack.Screen name="OrdersList" component={OrdersNew} options={{ title: "Новые заказы", headerShown: false }} />
      <Stack.Screen name="OrderDetails" component={OrderDetailsScreen} options={{ title: "Детали заказа" }} />
    </Stack.Navigator>
  );
};
