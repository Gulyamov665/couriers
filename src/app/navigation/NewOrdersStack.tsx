import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {OrderDetailsScreen} from '../screens/OrderDetailsScreen';
import {OrdersScreen} from '../screens/orders/OrdersScreen';

export type OrdersStackParamList = {
  OrdersList: undefined;
  OrderDetails: {id: string};
};

const Stack = createNativeStackNavigator<OrdersStackParamList>();

export const NewOrdersStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true, // свайп назад включён
        animation: 'slide_from_right', // анимация свайпа
      }}>
      <Stack.Screen
        name="OrdersList"
        component={OrdersScreen}
        options={{title: 'Новые заказы', headerShown: false}}
      />
      <Stack.Screen
        name="OrderDetails"
        component={OrderDetailsScreen}
        options={{title: 'Детали заказа'}}
      />
    </Stack.Navigator>
  );
};
