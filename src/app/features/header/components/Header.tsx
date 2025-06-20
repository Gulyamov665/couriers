import React from "react";
import { View, Text, TouchableOpacity, Platform, StatusBar } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { useTheme } from "hooks/useTheme";
import type { TextStyle } from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";

export const CustomHeader: React.FC<NativeStackHeaderProps> = ({ navigation, route, options, back }) => {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  //   const BASE_HEIGHT = 36; // 56 стандартная высота хедера без статус-бара

  // на Android добавляем StatusBar.currentHeight, на iOS — только insets.top
  const statusBarHeight = Platform.OS === "android" ? StatusBar.currentHeight ?? insets.top : insets.top;

  const title = options.title ?? route.name;

  const titleStyle = options.headerTitleStyle as TextStyle | undefined;
  return (
    <View
      style={{
        paddingTop: 10,
        // height: statusBarHeight,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: theme.colors.background,
        paddingHorizontal: 16,
      }}
    >
      {back && (
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 16 }}>
          <Text style={{ fontSize: 18, color: options.headerTintColor }}>
            <IonIcon name="arrow-back-sharp" size={24} color={options.headerTintColor} />
          </Text>
        </TouchableOpacity>
      )}
      <Text
        style={{
          fontSize: titleStyle?.fontSize ?? 18,
          fontWeight: titleStyle?.fontWeight,
          color: options.headerTintColor,
        }}
      >
        {title}
      </Text>
    </View>
  );
};
