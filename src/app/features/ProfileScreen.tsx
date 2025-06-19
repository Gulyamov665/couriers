import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Switch } from "react-native";
import { useActions } from "../../hooks/useActions";
import * as Keychain from "react-native-keychain";
import { useSelector } from "react-redux";
import { authState } from "@store/slices/auth";
import { useTheme } from "hooks/useTheme";
import { useTheme as usePaperTheme } from "react-native-paper";

export const ProfileScreen = () => {
  const { logout } = useActions();
  const { userInfo } = useSelector(authState);
  const { isDark, toggleTheme, theme } = useTheme();
  const { colors } = usePaperTheme();

  const user = {
    name: "Убегай Сабир",
    email: "ubejal@example.com",
    avatar: "https://i.pravatar.cc/300", // пример аватарки
  };

  const handleLogout = async () => {
    await Keychain.resetGenericPassword();
    logout();
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <Text style={[styles.name, {color:theme.colors.onBackground}]}>{userInfo?.first_name}</Text>
        <Text style={[styles.email, {color:theme.colors.onBackground}]}>{userInfo?.last_name}</Text>
      </View>

      <View style={[styles.separator, {backgroundColor:theme.colors.onBackground}]} />
      <View>
        <Text style={[styles.label, { color: colors.onBackground }]}>Тёмная тема</Text>
        <Switch
          value={isDark}
          onValueChange={toggleTheme}
          thumbColor={isDark ? colors.primary : "#ccc"}
          trackColor={{ false: "#aaa", true: colors.primary }}
        />
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Выйти</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "#222",
  },
  email: {
    fontSize: 16,
    color: "#555",
    marginTop: 4,
  },
  separator: {
    height: 1,
    width: "100%",
    marginVertical: 30,
  },
  logoutButton: {
    backgroundColor: "#FF6B6B",
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 8,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  tokenInput: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#DDD",
    minHeight: 50,
  },
  label: {
    fontSize: 16,
  },
});
