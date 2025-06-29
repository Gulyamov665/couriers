import React, { createContext, useContext, useState, useMemo, useEffect, ReactNode } from "react";
import { Appearance } from "react-native";
import * as Keychain from "react-native-keychain";
import { lightTheme, darkTheme, Theme } from "../app/styles/theme";

type ThemeMode = "light" | "dark" | "system";

interface ThemeContextProps {
  theme: Theme;
  isDark: boolean;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

const THEME_STORAGE_KEY = "app_theme_mode";

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [themeMode, setThemeModeState] = useState<ThemeMode>("system");
  const [systemTheme, setSystemTheme] = useState<"light" | "dark">(Appearance.getColorScheme() ?? "light");

  // Загружаем тему из Keychain
  useEffect(() => {
    const loadThemeFromKeychain = async () => {
      try {
        const stored = await Keychain.getGenericPassword({ service: THEME_STORAGE_KEY });
        if (stored) {
          const mode = stored.password as ThemeMode;
          if (["light", "dark", "system"].includes(mode)) {
            setThemeModeState(mode);
          }
        }
      } catch (err) {
        console.warn("Ошибка загрузки темы из Keychain", err);
      }
    };

    loadThemeFromKeychain();
  }, []);

  // Слушаем системную тему
  useEffect(() => {
    const sub = Appearance.addChangeListener(({ colorScheme }) => {
      if (colorScheme) {
        setSystemTheme(colorScheme);
      }
    });
    return () => sub.remove();
  }, []);

  // Сохраняем выбранную тему в Keychain
  const setThemeMode = async (mode: ThemeMode) => {
    try {
      await Keychain.setGenericPassword("theme", mode, {
        service: THEME_STORAGE_KEY,
        accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED,
      });
      setThemeModeState(mode);
    } catch (err) {
      console.warn("Ошибка сохранения темы в Keychain", err);
    }
  };

  const resolvedTheme = themeMode === "system" ? systemTheme : themeMode;
  const isDark = resolvedTheme === "dark";

  const value = useMemo(
    () => ({
      theme: isDark ? darkTheme : lightTheme,
      isDark,
      themeMode,
      setThemeMode,
    }),
    [isDark, themeMode]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
