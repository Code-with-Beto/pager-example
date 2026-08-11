import {
  createContext,
  type PropsWithChildren,
  use,
  useMemo,
  useState,
} from "react";
import { useColorScheme } from "react-native";

import { PALETTES } from "../constants";
import type {
  AppColorScheme,
  ColorPalette,
  ThemePreference,
} from "../types";
import { resolveColorScheme } from "../utils";

type ThemeContextValue = {
  colorScheme: AppColorScheme;
  colors: ColorPalette;
  setThemePreference: (preference: ThemePreference) => void;
  themePreference: ThemePreference;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function AppThemeProvider({ children }: PropsWithChildren) {
  const systemColorScheme = useColorScheme();
  const [themePreference, setThemePreference] =
    useState<ThemePreference>("system");
  const colorScheme = resolveColorScheme(themePreference, systemColorScheme);
  const value = useMemo(
    () => ({
      colorScheme,
      colors: PALETTES[colorScheme],
      setThemePreference,
      themePreference,
    }),
    [colorScheme, themePreference],
  );

  return <ThemeContext value={value}>{children}</ThemeContext>;
}

export function useTheme() {
  const context = use(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within AppThemeProvider");
  }

  return context;
}
