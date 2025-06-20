// import React from "react";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { OrdersNew } from "app/features/orders/screens/OrdersNew";
// import { OrderDetailsScreen } from "app/features/orders/components/OrderDetailsScreen";
// import { stackOptions } from "app/styles/stackOptions";
// import { useTheme } from "hooks/useTheme";
// import { CustomHeader } from "app/features/header/components/Header";

// export type OrdersStackParamList = {
//   OrdersList: undefined;
//   OrderDetails: { id: string };
// };

// const Stack = createNativeStackNavigator<OrdersStackParamList>();

// export const NewOrdersStack = () => {
//   const { theme } = useTheme();

//   return (
//     <Stack.Navigator screenOptions={stackOptions(theme)}>
//       <Stack.Screen name="OrdersList" component={OrdersNew} options={{ title: "Новые заказы", headerShown: false }} />
//       <Stack.Screen
//         name="OrderDetails"
//         component={OrderDetailsScreen}
//         options={{ title: "Детали заказа", header: (props) => <CustomHeader {...props} /> }}
//       />
//     </Stack.Navigator>
//   );
// };

// app/navigation/NewOrdersStack.tsx

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { OrdersNew } from "app/features/orders/screens/OrdersNew";
import { OrderDetailsScreen } from "app/features/orders/components/OrderDetailsScreen";
import { stackOptions } from "app/styles/stackOptions";
import { useTheme } from "hooks/useTheme";
import { CustomHeader } from "app/features/header/components/Header";

export type OrdersStackParamList = {
  OrdersList: undefined;
  OrderDetails: { id: string };
};

const Stack = createStackNavigator<OrdersStackParamList>();

export const NewOrdersStack = () => {
  const { theme } = useTheme();

  return (
    <Stack.Navigator screenOptions={stackOptions(theme)}>
      <Stack.Screen
        name="OrdersList"
        component={OrdersNew}
        options={{
          title: "Новые заказы",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="OrderDetails"
        component={OrderDetailsScreen}
        options={{
          title: "Детали заказа",
          header: (props) => <CustomHeader {...props} />,
        }}
      />
    </Stack.Navigator>
  );
};
