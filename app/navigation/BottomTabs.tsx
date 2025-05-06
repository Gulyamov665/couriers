import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {OrdersStack} from './OrdersStack';
import {NewOrdersStack} from './NewOrdersStack';
import {ProfileScreen} from '../screens/ProfileScreen';
import {CourierDashboard} from '../screens/dashboard/CurierDashboard';
import {OrderHistory} from '../screens/orders/OrdersHistory';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#34C759',
        tabBarStyle: {
          height: 60,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: '#fff',
          position: 'absolute',
        },
        tabBarIcon: ({color, focused}) => {
          let iconName: typeof MaterialCommunityIcons.defaultProps.name =
            'home';

          if (route.name === 'Home') iconName = 'newspaper-plus';
          else if (route.name === 'Orders') iconName = 'clipboard-list';
          else if (route.name === 'Profile') iconName = 'account';

          return (
            <MaterialCommunityIcons
              name={iconName}
              size={focused ? 32 : 24}
              color={color}
              style={{transform: [{scale: focused ? 1.2 : 1}]}}
            />
          );
        },
      })}>
      <Tab.Screen name="Home" component={NewOrdersStack} />
      <Tab.Screen name="Orders" component={OrdersStack} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Dashboard" component={CourierDashboard} />
      <Tab.Screen name="History" component={OrderHistory} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
