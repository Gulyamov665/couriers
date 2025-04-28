import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeScreen } from '../screens/HomeScreen'
import { OrderDetailsScreen } from '../screens/OrderDetailsScreen'

export type OrdersStackParamList = {
  OrdersList: undefined
  OrderDetails: { id: string }
}

const Stack = createNativeStackNavigator<OrdersStackParamList>()

export const NewOrdersStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="OrdersList"
        component={HomeScreen}
        options={{ title: 'Новые заказы' }}
      />
      <Stack.Screen
        name="OrderDetails"
        component={OrderDetailsScreen}
        options={{ title: 'Детали заказа' }}
      />
    </Stack.Navigator>
  )
}
