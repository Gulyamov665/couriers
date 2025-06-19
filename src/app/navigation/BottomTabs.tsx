import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ActiveOrdersStack } from "./ActiveOrdersStack";
import { NewOrdersStack } from "./NewOrdersStack";
import { ProfileScreen } from "../features/ProfileScreen";
import { View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "hooks/useTheme";

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#34C759",
        tabBarStyle: {
          elevation: 2,
          height: 60,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderBottomRightRadius: 20,
          borderBottomLeftRadius: 20,
          backgroundColor: theme.colors.surface,
          position: "absolute",
          display: "flex",
          marginLeft: 20,
          marginRight: 20,
          bottom: 10,
        },

        tabBarIcon: ({ color, focused }) => {
          let iconName: typeof MaterialCommunityIcons.defaultProps.name = "home";

          if (route.name === "Новые") iconName = "newspaper-plus";
          else if (route.name === "Активные") iconName = "clipboard-text-outline";
          else if (route.name === "Профиль") iconName = "account-outline";

          return (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                backgroundColor: "theme.colors.background",
              }}
            >
              <MaterialCommunityIcons
                name={iconName}
                size={focused ? 24 : 24}
                color={theme.colors.onBackground}
                style={{ transform: [{ scale: focused ? 1.2 : 1 }] }}
              />
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Новые" component={NewOrdersStack} />
      <Tab.Screen name="Активные" component={ActiveOrdersStack} />
      <Tab.Screen name="Профиль" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
