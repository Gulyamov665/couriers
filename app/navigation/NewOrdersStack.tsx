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
    <Stack.Navigator>
      <Stack.Screen
        name="OrdersList"
        component={OrdersScreen}
        options={{title: 'Новые заказы'}}
      />
      <Stack.Screen
        name="OrderDetails"
        component={OrderDetailsScreen}
        options={{title: 'Детали заказа'}}
      />
    </Stack.Navigator>
  );
};
