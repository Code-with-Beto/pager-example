import type { ColorSchemeName } from "react-native";

export type AppColorScheme = Exclude<ColorSchemeName, null | undefined>;

export type ThemePreference = "system" | AppColorScheme;

export type Chat = {
  id: string;
  prompt: string;
  response: string;
  title: string;
};

export type ColorPalette = {
  accent: string;
  accentText: string;
  appBackground: string;
  chatBackground: string;
  composer: string;
  menuBackground: string;
  menuSelected: string;
  modalButton: string;
  muted: string;
  separator: string;
  surfaceBorder: string;
  text: string;
  userBubble: string;
};

export type DrawerEndState = {
  currentPosition: number;
  drawerWidth: number;
  translationX: number;
  velocityX: number;
};
