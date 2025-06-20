// import React from "react";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";

// import { RootStackParamList } from "./RootNavigator";
// import { OrdersActive } from "../features/orders/screens/OrdersActive";
// import { OrderDetailsScreen } from "app/features/orders/components/OrderDetailsScreen";
// import { useTheme } from "hooks/useTheme";
// import { stackOptions } from "app/styles/stackOptions";
// import { CustomHeader } from "app/features/header/components/Header";

// const Stack = createNativeStackNavigator<RootStackParamList>();

// export const ActiveOrdersStack = () => {
//   const { theme } = useTheme();
//   return (
//     <Stack.Navigator screenOptions={stackOptions(theme)}>
//       <Stack.Screen name="OrdersList" component={OrdersActive} options={{ headerShown: false }} />
//       <Stack.Screen
//         name="OrderDetails"
//         component={OrderDetailsScreen}
//         options={{
//           title: "Детали заказа",
//           header: (props) => <CustomHeader {...props} />,
//         }}
//       />
//     </Stack.Navigator>
//   );
// };

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { OrdersActive } from "../features/orders/screens/OrdersActive";
import { OrderDetailsScreen } from "app/features/orders/components/OrderDetailsScreen";
import { useTheme } from "hooks/useTheme";
import { CustomHeader } from "app/features/header/components/Header";
import type { RootStackParamList } from "./RootNavigator";
import { stackOptions } from "app/styles/stackOptions";

const Stack = createStackNavigator<RootStackParamList>();

export const ActiveOrdersStack = () => {
  const { theme } = useTheme();

  return (
    <Stack.Navigator screenOptions={stackOptions(theme)}>
      <Stack.Screen name="OrdersList" component={OrdersActive} options={{ headerShown: false }} />
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
