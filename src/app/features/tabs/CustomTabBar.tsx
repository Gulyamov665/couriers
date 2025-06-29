import React, { useEffect, useRef } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Animated, Dimensions } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useTheme } from "hooks/useTheme";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import ThemedView from "app/components/ThemedView";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width: screenWidth } = Dimensions.get("window");

const CustomTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  const currentRoute = state.routes[state.index];

  const nestedRouteName = getFocusedRouteNameFromRoute(currentRoute);

  const hiddenRoutes = ["OrderDetails"]; // 👈 здесь перечисли маршруты, где tabBar скрыт

  if (nestedRouteName && hiddenRoutes.includes(nestedRouteName)) {
    return null;
  }

  const horizontalMargin = 40; // 20 + 20
  const tabCount = state.routes.length;
  const tabWidth = (screenWidth - horizontalMargin) / tabCount;
  const highlightWidth = tabWidth * 0.75; // ✅ универсальная ширина подсветки

  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: tabWidth * state.index + (tabWidth - highlightWidth) / 2,
      useNativeDriver: true,
      speed: 16,
      bounciness: 10,
    }).start();
  }, [state.index]);

  return (
    <ThemedView
      style={[
        styles.tabBarContainer,
        {
          backgroundColor: theme.colors.onPrimary,
          shadowColor: theme.colors.onPrimary,
          bottom: insets.bottom ,
        },
      ]}
    >
      <Animated.View
        style={[
          styles.highlight,
          {
            width: highlightWidth,
            transform: [{ translateX }],
            backgroundColor: "#34C75922",
          },
        ]}
      />

      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel ?? route.name;

        const iconName =
          route.name === "Новые"
            ? "newspaper-plus"
            : route.name === "Активные"
            ? "clipboard-text-outline"
            : route.name === "Статистика"
            ? "finance"
            : "account-outline";

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            onPress={onPress}
            style={[styles.tabButton, { width: tabWidth }]}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons
              name={iconName}
              size={28}
              color={isFocused ? "#34C759" : theme.colors.onBackground + "88"}
            />
            <Text
              style={{
                fontSize: 11,
                marginTop: 4,
                color: isFocused ? "#34C759" : theme.colors.onBackground + "88",
                fontWeight: isFocused ? "600" : "400",
              }}
            >
              {typeof label === "function"
                ? label({
                    focused: isFocused,
                    color: isFocused ? "#34C759" : theme.colors.onBackground + "88",
                    position: "below-icon",
                    children: route.name,
                  })
                : label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    position: "absolute",
    left: 20,
    right: 20,
    minHeight: 70,
    flexDirection: "row",
    borderRadius: 24,
    backgroundColor: "#fff",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 6,
    overflow: "hidden",
  },
  tabButton: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  highlight: {
    position: "absolute",
    height: 35,
    top: 8,
    borderRadius: 12,
    zIndex: -1,
  },
});

export default CustomTabBar;
