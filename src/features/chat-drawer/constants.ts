import type { AppColorScheme, Chat, ColorPalette } from "./types";

export const CHATS = [
  {
    id: "reanimated",
    title: "Explain Reanimated gestures",
    prompt: "How does this drawer gesture stay so smooth?",
    response:
      "The drag updates a shared value on the UI thread. React only hears about the final open or closed state, so it never has to render every frame.",
  },
  {
    id: "onboarding",
    title: "Design an onboarding flow",
    prompt: "Help me simplify my app onboarding.",
    response:
      "Start with the single outcome users came for, ask only for permissions at the moment they are needed, and let people reach value before asking them to create an account.",
  },
  {
    id: "mexico-city",
    title: "Weekend in Mexico City",
    prompt: "Plan a relaxed weekend in Mexico City.",
    response:
      "I’d anchor the weekend around Roma Norte and Condesa, leave one morning for Chapultepec, and keep enough space for long lunches and spontaneous stops.",
  },
] satisfies readonly Chat[];

export const EMPTY_CHAT_SUGGESTIONS = [
  "Explain a tricky concept",
  "Plan a mobile app",
  "Brainstorm a new feature",
] as const;

export const PROFILE = {
  bio: "Mobile developer and creator behind Code with Beto.",
  handle: "@betomoedano",
  imageUrl: "https://github.com/betomoedano.png",
  name: "Beto",
} as const;

export const PALETTES = {
  light: {
    accent: "#0f766e",
    accentText: "#ffffff",
    appBackground: "#f4f4f4",
    chatBackground: "#ffffff",
    composer: "#f4f4f2",
    menuBackground: "#f4f4f4",
    menuSelected: "#dededb",
    modalButton: "#eeeeee",
    muted: "#6f6f6a",
    separator: "rgba(20, 20, 18, 0.09)",
    surfaceBorder: "transparent",
    text: "#171714",
    userBubble: "#ededeb",
  },
  dark: {
    accent: "#34d399",
    accentText: "#052e2b",
    appBackground: "#0f0f0f",
    chatBackground: "#212121",
    composer: "#2f2f2f",
    menuBackground: "#151515",
    menuSelected: "#2b2b2b",
    modalButton: "#303030",
    muted: "#a9a9a3",
    separator: "rgba(255, 255, 255, 0.09)",
    surfaceBorder: "rgba(255, 255, 255, 0.1)",
    text: "#f5f5f0",
    userBubble: "#303030",
  },
} satisfies Record<AppColorScheme, ColorPalette>;

export const DRAWER_LAYOUT = {
  horizontalPadding: 20,
  minimumSafeAreaPadding: 16,
  surfaceCornerRadius: {
    android: 28,
    compactIos: 18,
    maximumIos: 54,
    notchedIosInset: 44,
    notchedIosRatio: 0.82,
  },
  widthRatio: 0.76,
} as const;

export const DRAWER_GESTURE = {
  activeOffsetX: [-8, 8] as [number, number],
  directionalTranslationThreshold: 12,
  failOffsetY: [-18, 18] as [number, number],
  openStateThreshold: 0.5,
  positionThreshold: 0.18,
  velocityProjection: 0.05,
  velocityThreshold: 160,
} as const;

export const DRAWER_ANIMATION = {
  menuOpacity: {
    inputRange: [0, 0.22, 0.55],
    outputRange: [0.16, 0.84, 1],
  },
  menuScale: {
    inputRange: [0, 0.46],
    outputRange: [0.992, 1],
  },
  menuTranslateY: {
    inputRange: [0, 0.42],
    outputRange: [10, 0],
  },
  scrimOpacity: {
    inputRange: [0, 1],
    outputRange: [0, 0.08],
  },
} as const;

export const DRAWER_SPRING_CONFIG = {
  damping: 30,
  mass: 0.7,
  overshootClamping: true,
  stiffness: 420,
} as const;

export const UI_COLORS = {
  appleBlue: "#007AFF",
  black: "#000000",
  white: "#ffffff",
} as const;
