import { useColorScheme } from "react-native";

import { PALETTES } from "../constants";

export function useAppTheme() {
  const colorScheme = useColorScheme() === "dark" ? "dark" : "light";

  return {
    colorScheme,
    colors: PALETTES[colorScheme],
  } as const;
}
