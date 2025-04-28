import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { OrdersScreen } from '../screens/orders/OrdersScreen'
import { OrderDetailsScreen } from '../screens/OrderDetailsScreen'
import { RootStackParamList } from './RootNavigator'

const Stack = createNativeStackNavigator<RootStackParamList>()

export const OrdersStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="OrdersList"
        component={OrdersScreen}
        options={{ title: 'Список заказов' }}
      />
      <Stack.Screen
        name="OrderDetails"
        component={OrderDetailsScreen}
        options={{ title: 'Детали заказа' }}
      />
    </Stack.Navigator>
  )
}
