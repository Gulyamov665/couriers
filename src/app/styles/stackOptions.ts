import type { StackNavigationOptions } from "@react-navigation/stack";
import { CardStyleInterpolators } from "@react-navigation/stack";
import type { Theme } from "../styles/theme";

export function stackOptions(theme: Theme): StackNavigationOptions {
  return {
    // включаем свайп‑назад
    gestureEnabled: true,
    // iOS‑style slide_from_right
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    // фон «карточки» во время анимации
    cardStyle: {
      backgroundColor: theme.colors.background,
    },
    // заголовок
    headerStyle: {
      backgroundColor: theme.colors.background,
    },
    headerTintColor: theme.colors.onBackground,
    headerTitleStyle: {
      color: theme.colors.onBackground,
      fontSize: 18,
      fontWeight: "600",
    },
  };
}
