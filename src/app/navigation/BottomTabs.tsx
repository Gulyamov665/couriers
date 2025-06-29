import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ActiveOrdersStack } from "./ActiveOrdersStack";
import { NewOrdersStack } from "./NewOrdersStack";
import { ProfileScreen } from "../features/ProfileScreen";
import { CourierStatsScreen } from "app/features/dashboard/CourierStatsScreen";
import CustomTabBar from "app/features/tabs/CustomTabBar";

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Новые" component={NewOrdersStack} />
      <Tab.Screen name="Активные" component={ActiveOrdersStack} />
      <Tab.Screen name="Статистика" component={CourierStatsScreen} />
      <Tab.Screen name="Профиль" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
