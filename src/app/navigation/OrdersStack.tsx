import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {OrderDetailsScreen} from '../screens/OrderDetailsScreen';
import {RootStackParamList} from './RootNavigator';
import {HomeScreen} from '../screens/HomeScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const OrdersStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="OrdersList"
        component={HomeScreen}
        // options={{title: 'Список заказов'}}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OrderDetails"
        component={OrderDetailsScreen}
        // options={{title: 'Детали заказа'}}
      />
    </Stack.Navigator>
  );
};
