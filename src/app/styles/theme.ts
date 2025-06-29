import { MD3LightTheme as PaperLightTheme, MD3DarkTheme as PaperDarkTheme, MD3Theme } from "react-native-paper";

type CustomTheme = {
  customColors: CustomColors;
};
export type Theme = MD3Theme & CustomTheme;

type CustomColors = {
  btnGreen: string;
  white: string;
  black: string;
  orange: string;
};

const customColors = {
  btnGreen: "#4CAF50",
  white: "#ffffff",
  black: "#000000",
  orange: "#FFA500",
};

export const lightTheme: Theme = {
  ...PaperLightTheme,
  colors: {
    ...PaperLightTheme.colors,
    primary: "#00C853",
    background: "#F3F4F6",
    surface: "#f3f2f2",
    onPrimary: "#ffffff",
    onBackground: "#000000",
  },
  customColors,
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
  customColors,
};
