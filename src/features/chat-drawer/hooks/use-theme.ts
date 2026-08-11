import { useState } from "react";
import { useColorScheme } from "react-native";

import { PALETTES } from "../constants";
import type { ThemePreference } from "../types";
import { resolveColorScheme } from "../utils";

export function useTheme() {
  const systemColorScheme = useColorScheme();
  const [themePreference, setThemePreference] =
    useState<ThemePreference>("system");
  const colorScheme = resolveColorScheme(themePreference, systemColorScheme);

  return {
    colorScheme,
    colors: PALETTES[colorScheme],
    setThemePreference,
    themePreference,
  };
}
