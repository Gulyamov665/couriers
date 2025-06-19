import type { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { Theme } from "../styles/theme"; // ваш тип темы

export function stackOptions(theme: Theme): NativeStackNavigationOptions {
  return {
    gestureEnabled: true, // свайп назад включён
    animation: "slide_from_right", // анимация перехода

    headerStyle: {
      backgroundColor: theme.colors.background,
    },

    // ↓↓↓ Цвет стрелки назад и других кнопок ↓↓↓
    headerTintColor: theme.colors.onBackground,

    // ↓↓↓ Стиль текста заголовка ↓↓↓
    headerTitleStyle: {
      color: theme.colors.onBackground,
      fontSize: 18,
      fontWeight: "600",
    },
  };
}
