// import React from "react";
// import { View, Text, StyleSheet, Image, TouchableOpacity, Switch } from "react-native";
// import { useActions } from "../../hooks/useActions";
// import * as Keychain from "react-native-keychain";
// import { useSelector } from "react-redux";
// import { authState } from "@store/slices/auth";
// import { useTheme } from "hooks/useTheme";
// import { useTheme as usePaperTheme } from "react-native-paper";

// export const ProfileScreen = () => {
//   const { logout } = useActions();
//   const { userInfo } = useSelector(authState);
//   const { isDark, toggleTheme, theme } = useTheme();
//   const { colors } = usePaperTheme();

//   const user = {
//     name: "Убегай Сабир",
//     email: "ubejal@example.com",
//     avatar: "https://i.pravatar.cc/300", // пример аватарки
//   };

//   const handleLogout = async () => {
//     await Keychain.resetGenericPassword();
//     logout();
//   };

//   return (
//     <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
//       <View style={styles.avatarContainer}>
//         <Image source={{ uri: user.avatar }} style={styles.avatar} />
//         <Text style={[styles.name, { color: theme.colors.onBackground }]}>{userInfo?.first_name}</Text>
//         <Text style={[styles.email, { color: theme.colors.onBackground }]}>{userInfo?.last_name}</Text>
//       </View>

//       <View style={[styles.separator, { backgroundColor: theme.colors.onBackground }]} />
//       <View>
//         <Text style={[styles.label, { color: colors.onBackground }]}>Тёмная тема</Text>
//         <Switch
//           value={isDark}
//           key={isDark ? "dark" : "light"}
//           onValueChange={toggleTheme}
//           thumbColor={isDark ? colors.primary : "#ccc"}
//           trackColor={{ false: "#aaa", true: colors.primary }}
//         />
//       </View>

//       <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
//         <Text style={styles.logoutText}>Выйти</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     paddingTop: 60,
//     paddingHorizontal: 20,
//   },
//   avatarContainer: {
//     alignItems: "center",
//     marginBottom: 30,
//   },
//   avatar: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     marginBottom: 20,
//   },
//   name: {
//     fontSize: 22,
//     fontWeight: "700",
//     color: "#222",
//   },
//   email: {
//     fontSize: 16,
//     color: "#555",
//     marginTop: 4,
//   },
//   separator: {
//     height: 1,
//     width: "100%",
//     marginVertical: 30,
//   },
//   logoutButton: {
//     backgroundColor: "#FF6B6B",
//     paddingVertical: 15,
//     paddingHorizontal: 60,
//     borderRadius: 8,
//   },
//   logoutText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   tokenInput: {
//     width: "100%",
//     backgroundColor: "#fff",
//     borderRadius: 8,
//     padding: 10,
//     marginBottom: 20,
//     fontSize: 16,
//     borderWidth: 1,
//     borderColor: "#DDD",
//     minHeight: 50,
//   },
//   label: {
//     fontSize: 16,
//   },
// });

// import React from "react";
// import { View, Text, StyleSheet, Image, TouchableOpacity, Switch, useColorScheme } from "react-native";
// import { useActions } from "../../hooks/useActions";
// import * as Keychain from "react-native-keychain";
// import { useSelector } from "react-redux";
// import { authState } from "@store/slices/auth";
// import { useTheme } from "hooks/useTheme";
// import { useTheme as usePaperTheme } from "react-native-paper";

// export const ProfileScreen = () => {
//   const { logout } = useActions();
//   const { userInfo } = useSelector(authState);
//   const { isDark, toggleTheme, theme } = useTheme();
//   const { colors } = usePaperTheme();

//   const handleLogout = async () => {
//     await Keychain.resetGenericPassword();
//     logout();
//   };

//   return (
//     <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
//       <View style={[styles.card, { backgroundColor: colors.surface, shadowColor: colors.onSurface }]}>
//         <Image source={{ uri: "https://i.pravatar.cc/300" }} style={styles.avatar} />
//         <Text style={[styles.name, { color: colors.onSurface }]}>{userInfo?.first_name || "Имя"}</Text>
//         <Text style={[styles.email, { color: colors.onSurface + "AA" }]}>{userInfo?.last_name || "Фамилия"}</Text>
//       </View>

//       <View style={styles.settingsSection}>
//         <View style={styles.row}>
//           <Text style={[styles.label, { color: colors.onBackground }]}>Тёмная тема</Text>
//           <Switch
//             value={isDark}
//             onValueChange={toggleTheme}
//             thumbColor={isDark ? colors.primary : "#ccc"}
//             trackColor={{ false: "#ccc", true: colors.primary }}
//           />
//         </View>
//       </View>

//       <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
//         <Text style={styles.logoutText}>Выйти из аккаунта</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 80,
//     paddingHorizontal: 24,
//     backgroundColor: "#F4F6F8",
//   },
//   card: {
//     alignItems: "center",
//     borderRadius: 16,
//     padding: 24,
//     shadowOpacity: 0.2,
//     shadowRadius: 10,
//     shadowOffset: { width: 0, height: 4 },
//     elevation: 4,
//   },
//   avatar: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     marginBottom: 16,
//   },
//   name: {
//     fontSize: 24,
//     fontWeight: "700",
//     marginBottom: 4,
//   },
//   email: {
//     fontSize: 16,
//     opacity: 0.7,
//   },
//   settingsSection: {
//     marginTop: 40,
//     width: "100%",
//     paddingHorizontal: 12,
//   },
//   row: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingVertical: 16,
//     borderBottomWidth: StyleSheet.hairlineWidth,
//     borderBottomColor: "#CCC",
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: "500",
//   },
//   logoutButton: {
//     marginTop: 50,
//     backgroundColor: "#FF5252",
//     paddingVertical: 16,
//     paddingHorizontal: 32,
//     borderRadius: 12,
//     alignSelf: "center",
//     width: "100%",
//   },
//   logoutText: {
//     color: "#FFF",
//     fontSize: 16,
//     fontWeight: "600",
//     textAlign: "center",
//   },
// });

import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useActions } from "../../hooks/useActions";
import * as Keychain from "react-native-keychain";
import { useSelector } from "react-redux";
import { authState } from "@store/slices/auth";
import { useTheme } from "hooks/useTheme";
import { useTheme as usePaperTheme, RadioButton } from "react-native-paper";

export const ProfileScreen = () => {
  const { logout } = useActions();
  const { userInfo } = useSelector(authState);
  const { theme, themeMode, setThemeMode } = useTheme();
  const { colors } = usePaperTheme();

  const handleLogout = async () => {
    await Keychain.resetGenericPassword();
    logout();
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.card, { backgroundColor: colors.surface, shadowColor: colors.onSurface }]}>
        <Image source={{ uri: "https://i.pravatar.cc/300" }} style={styles.avatar} />
        <Text style={[styles.name, { color: colors.onSurface }]}>{userInfo?.first_name || "Имя"}</Text>
        <Text style={[styles.email, { color: colors.onSurface + "AA" }]}>{userInfo?.last_name || "Фамилия"}</Text>
      </View>

      <View style={styles.settingsSection}>
        <Text style={[styles.sectionTitle, { color: colors.onBackground }]}>Тема оформления</Text>
        <RadioButton.Group onValueChange={(value) => setThemeMode(value as any)} value={themeMode}>
          <View style={styles.radioRow}>
            <Text style={[styles.label, { color: colors.onBackground }]}>Системная</Text>
            <RadioButton value="system" color={colors.primary} />
          </View>
          <View style={styles.radioRow}>
            <Text style={[styles.label, { color: colors.onBackground }]}>Светлая</Text>
            <RadioButton value="light" color={colors.primary} />
          </View>
          <View style={styles.radioRow}>
            <Text style={[styles.label, { color: colors.onBackground }]}>Тёмная</Text>
            <RadioButton value="dark" color={colors.primary} />
          </View>
        </RadioButton.Group>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Выйти из аккаунта</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 24,
  },
  card: {
    alignItems: "center",
    borderRadius: 16,
    padding: 24,
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    opacity: 0.7,
  },
  settingsSection: {
    marginTop: 40,
    width: "100%",
    paddingHorizontal: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  radioRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  label: {
    fontSize: 16,
  },
  logoutButton: {
    marginTop: 50,
    backgroundColor: "#FF5252",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignSelf: "center",
    width: "100%",
  },
  logoutText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
