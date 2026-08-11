import type { Chat, ColorPalette } from "./types";

export const CHATS = [
  {
    id: "reanimated",
    title: "Explain Reanimated gestures",
    prompt: "How does this swipe menu stay so smooth?",
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
      "I'd anchor the weekend around Roma Norte and Condesa, leave one morning for Chapultepec, and keep enough space for long lunches and spontaneous stops.",
  },
] satisfies readonly Chat[];

export const PROFILE = {
  description: "Mobile developer and creator behind Code with Beto.",
  imageUrl: "https://github.com/betomoedano.png",
  name: "Beto",
  username: "@betomoedano",
} as const;

export const APPLE_BLUE = "#007AFF";

export const PALETTES = {
  light: {
    accent: APPLE_BLUE,
    accentText: "#FFFFFF",
    appBackground: "#FFFFFF",
    menuBackground: "#FAFAFA",
    menuSelected: "#E0E0E0",
    muted: "#6E6E6E",
    separator: "rgba(0, 0, 0, 0.1)",
    surfaceBackground: "#FFFFFF",
    surfaceBorder: "transparent",
    text: "#000000",
    userBubble: "#ECECEC",
  },
  dark: {
    accent: APPLE_BLUE,
    accentText: "#FFFFFF",
    appBackground: "#000000",
    menuBackground: "#000000",
    menuSelected: "#262626",
    muted: "#A3A3A3",
    separator: "rgba(255, 255, 255, 0.12)",
    surfaceBackground: "#111111",
    surfaceBorder: "rgba(255, 255, 255, 0.1)",
    text: "#FFFFFF",
    userBubble: "#262626",
  },
} satisfies Record<"dark" | "light", ColorPalette>;

export const SWIPE_MENU_WIDTH_RATIO = 0.76;
export const SWIPE_MENU_SURFACE_CORNER_RADIUS = 55;
// box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
export const SWIPE_MENU_SURFACE_SHADOW =
  "0px 7px 30px rgba(100, 100, 111, 0.2)";

export const SWIPE_MENU_LAYOUT = {
  horizontalPadding: 20,
  minimumSafeAreaPadding: 16,
} as const;

export const SWIPE_GESTURE = {
  activationDistance: 8,
  directionDistanceThreshold: 12,
  openPositionThreshold: 0.18,
  velocityInfluence: 0.05,
  velocityThreshold: 160,
  verticalTolerance: 18,
} as const;

export const SWIPE_SPRING = {
  damping: 26,
  mass: 0.8,
  overshootClamping: true,
  stiffness: 220,
} as const;

export const SWIPE_MENU_ANIMATION = {
  menuFadeEndProgress: 0.5,
  menuFadeStartProgress: 0.08,
  menuStartScale: 0.975,
  menuStartVerticalOffset: 8,
} as const;
