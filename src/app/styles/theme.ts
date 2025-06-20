// styles/theme.ts
import { MD3LightTheme as PaperLightTheme, MD3DarkTheme as PaperDarkTheme, MD3Theme } from "react-native-paper";

export type Theme = MD3Theme;

export const lightTheme: Theme = {
  ...PaperLightTheme,
  colors: {
    ...PaperLightTheme.colors,
    primary: "#6750a4",
    background: "#F3F4F6",
    surface: "#f2f2f2",
    onPrimary: "#ffffff",
    onBackground: "#000000",
  },
};

export const darkTheme: Theme = {
  ...PaperDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    primary: "#7743DB",
    background: "#0c263b",
    surface: "#1e1e1e",
    onPrimary: "#000000",
    onBackground: "#ffffff",
  },
};
