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

export const PALETTES = {
  light: {
    accent: "#0f766e",
    accentText: "#ffffff",
    appBackground: "#f4f4f4",
    menuBackground: "#f4f4f4",
    menuSelected: "#dededb",
    muted: "#6f6f6a",
    separator: "rgba(20, 20, 18, 0.09)",
    surfaceBackground: "#ffffff",
    surfaceBorder: "transparent",
    text: "#171714",
    userBubble: "#ededeb",
  },
  dark: {
    accent: "#34d399",
    accentText: "#052e2b",
    appBackground: "#0f0f0f",
    menuBackground: "#000000",
    menuSelected: "#2b2b2b",
    muted: "#a9a9a3",
    separator: "rgba(255, 255, 255, 0.09)",
    surfaceBackground: "#141414",
    surfaceBorder: "rgba(255, 255, 255, 0.1)",
    text: "#f5f5f0",
    userBubble: "#303030",
  },
} satisfies Record<"dark" | "light", ColorPalette>;

export const SWIPE_MENU_WIDTH_RATIO = 0.76;
export const SWIPE_MENU_SURFACE_CORNER_RADIUS = 32;
export const SWIPE_MENU_SURFACE_SHADOW =
  "-1px 0 12px rgba(0, 0, 0, 0.08)";

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
  maximumScrimOpacity: 0.08,
  menuFadeEndProgress: 0.5,
  menuFadeStartProgress: 0.08,
  menuStartScale: 0.975,
  menuStartVerticalOffset: 8,
} as const;
