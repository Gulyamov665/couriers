import { useTheme } from "hooks/useTheme";
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export const Loader = () => {
  const { theme } = useTheme();
  return (
    <View style={[styles.loaderContainer, { backgroundColor: theme.colors.background }]}>
      <ActivityIndicator size="large" color="#FFA500" />
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
