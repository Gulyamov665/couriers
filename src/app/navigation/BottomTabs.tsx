import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {OrdersStack} from './OrdersStack';
import {NewOrdersStack} from './NewOrdersStack';
import {ProfileScreen} from '../screens/ProfileScreen';
import {View} from 'react-native';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#34C759',
        tabBarStyle: {
          height: 60,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderBottomRightRadius: 20,
          borderBottomLeftRadius: 20,
          backgroundColor: '#fff',
          position: 'absolute',
          display: 'flex',
          marginLeft: 20,
          marginRight: 20,
          bottom: 10,
        },

        tabBarIcon: ({color, focused}) => {
          let iconName: typeof MaterialCommunityIcons.defaultProps.name =
            'home';

          if (route.name === 'Новые') iconName = 'newspaper-plus';
          else if (route.name === 'Мои заказы')
            iconName = 'clipboard-text-outline';
          else if (route.name === 'Профиль') iconName = 'account-outline';

          return (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
              }}>
              <MaterialCommunityIcons
                name={iconName}
                size={focused ? 24 : 24}
                color={color}
                style={{transform: [{scale: focused ? 1.2 : 1}]}}
              />
            </View>
          );
        },
      })}>
      <Tab.Screen name="Новые" component={NewOrdersStack} />
      <Tab.Screen name="Мои заказы" component={OrdersStack} />
      <Tab.Screen name="Профиль" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
