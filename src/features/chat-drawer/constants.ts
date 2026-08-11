import type {
  AppColorScheme,
  Chat,
  ColorPalette,
  DrawerTuning,
  TuningSection,
} from "./types";

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
      "I'd anchor the weekend around Roma Norte and Condesa, leave one morning for Chapultepec, and keep enough space for long lunches and spontaneous stops.",
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
} as const;

export const CHAT_COMPOSER_LAYOUT = {
  contentBottomGap: 16,
  estimatedHeight: 84,
  horizontalPadding: 14,
  keyboardGap: 16,
  minimumBottomPadding: 12,
} as const;

export const DRAWER_GESTURE = {
  openStateThreshold: 0.5,
} as const;

export const DRAWER_ANIMATION = {
  menuOpacity: {
    inputRange: [0, 0.08, 0.5],
    outputRange: [0, 0, 1],
  },
  menuScale: {
    inputRange: [0, 1],
    outputRange: [0.975, 1],
  },
  menuTranslateY: {
    inputRange: [0, 1],
    outputRange: [8, 0],
  },
  scrimOpacity: {
    inputRange: [0, 1],
    outputRange: [0, 0.08],
  },
} as const;

export const DRAWER_SPRING_CONFIG = {
  damping: 26,
  mass: 0.8,
  overshootClamping: true,
  stiffness: 220,
} as const;

export const DEFAULT_DRAWER_TUNING = {
  activationDistance: 8,
  directionalTranslationThreshold: 12,
  drawerWidthRatio: 0.76,
  menuFadeEndProgress: DRAWER_ANIMATION.menuOpacity.inputRange[2],
  menuMinimumOpacity: DRAWER_ANIMATION.menuOpacity.outputRange[0],
  menuMinimumScale: DRAWER_ANIMATION.menuScale.outputRange[0],
  menuTranslateY: DRAWER_ANIMATION.menuTranslateY.outputRange[0],
  overshootClamping: DRAWER_SPRING_CONFIG.overshootClamping,
  positionThreshold: 0.18,
  scrimMaximumOpacity: DRAWER_ANIMATION.scrimOpacity.outputRange[1],
  springDamping: DRAWER_SPRING_CONFIG.damping,
  springMass: DRAWER_SPRING_CONFIG.mass,
  springStiffness: DRAWER_SPRING_CONFIG.stiffness,
  surfaceCornerRadius: DRAWER_LAYOUT.surfaceCornerRadius.android,
  surfaceShadowBlurRadius: 12,
  surfaceShadowOffsetX: -1,
  surfaceShadowOpacity: 0.08,
  velocityProjection: 0.05,
  velocityThreshold: 160,
  verticalTolerance: 18,
} satisfies DrawerTuning;

export const TUNING_SECTIONS = [
  {
    title: "Layout",
    controls: [
      {
        key: "drawerWidthRatio",
        label: "Drawer width",
        description: "How much of the screen the open drawer occupies.",
        minimumValue: 0.55,
        maximumValue: 0.9,
        step: 0.01,
        format: "percent",
      },
      {
        key: "surfaceCornerRadius",
        label: "Surface corner radius",
        description: "Rounding applied to the chat surface while open.",
        minimumValue: 0,
        maximumValue: 64,
        step: 1,
        format: "integer",
      },
    ],
  },
  {
    title: "Gesture recognition",
    controls: [
      {
        key: "activationDistance",
        label: "Horizontal activation",
        description: "Horizontal movement required before the pan activates.",
        minimumValue: 2,
        maximumValue: 24,
        step: 1,
        format: "integer",
      },
      {
        key: "verticalTolerance",
        label: "Vertical tolerance",
        description: "Vertical movement allowed before the pan fails.",
        minimumValue: 8,
        maximumValue: 60,
        step: 1,
        format: "integer",
      },
      {
        key: "positionThreshold",
        label: "Open threshold",
        description: "Drawer progress needed to stay open after a slow drag.",
        minimumValue: 0.05,
        maximumValue: 0.8,
        step: 0.01,
        format: "percent",
      },
      {
        key: "directionalTranslationThreshold",
        label: "Directional distance",
        description: "Drag distance that counts as an intentional swipe.",
        minimumValue: 0,
        maximumValue: 50,
        step: 1,
        format: "integer",
      },
      {
        key: "velocityThreshold",
        label: "Velocity threshold",
        description: "Swipe velocity that counts as directional intent.",
        minimumValue: 50,
        maximumValue: 1200,
        step: 10,
        format: "integer",
      },
      {
        key: "velocityProjection",
        label: "Velocity influence",
        description: "How strongly swipe velocity predicts the destination.",
        minimumValue: 0,
        maximumValue: 0.15,
        step: 0.005,
        format: "decimal",
      },
    ],
  },
  {
    title: "Spring",
    controls: [
      {
        key: "springStiffness",
        label: "Stiffness",
        description: "Higher values snap to the destination more quickly.",
        minimumValue: 50,
        maximumValue: 800,
        step: 10,
        format: "integer",
      },
      {
        key: "springDamping",
        label: "Damping",
        description: "Higher values reduce bounce and oscillation.",
        minimumValue: 5,
        maximumValue: 60,
        step: 1,
        format: "integer",
      },
      {
        key: "springMass",
        label: "Mass",
        description: "Higher values make the surface feel heavier.",
        minimumValue: 0.1,
        maximumValue: 2,
        step: 0.1,
        format: "decimal",
      },
    ],
  },
  {
    title: "Reveal styling",
    controls: [
      {
        key: "menuMinimumOpacity",
        label: "Menu starting opacity",
        description: "Menu opacity when the drawer is fully closed.",
        minimumValue: 0,
        maximumValue: 1,
        step: 0.01,
        format: "percent",
      },
      {
        key: "menuFadeEndProgress",
        label: "Fade completion",
        description: "Drawer progress where the menu becomes fully visible.",
        minimumValue: 0.2,
        maximumValue: 0.75,
        step: 0.01,
        format: "percent",
      },
      {
        key: "menuTranslateY",
        label: "Menu vertical travel",
        description: "How far down the menu begins before it settles.",
        minimumValue: 0,
        maximumValue: 40,
        step: 1,
        format: "integer",
      },
      {
        key: "menuMinimumScale",
        label: "Menu starting scale",
        description: "Menu scale when the drawer is fully closed.",
        minimumValue: 0.94,
        maximumValue: 1,
        step: 0.001,
        format: "decimal",
      },
      {
        key: "scrimMaximumOpacity",
        label: "Chat dimming",
        description: "Maximum overlay opacity on the exposed chat surface.",
        minimumValue: 0,
        maximumValue: 0.3,
        step: 0.01,
        format: "percent",
      },
    ],
  },
  {
    title: "Surface shadow",
    controls: [
      {
        key: "surfaceShadowOpacity",
        label: "Shadow opacity",
        description: "Strength of the shadow between chat and drawer.",
        minimumValue: 0,
        maximumValue: 0.3,
        step: 0.01,
        format: "percent",
      },
      {
        key: "surfaceShadowBlurRadius",
        label: "Shadow blur",
        description: "Softness and spread of the surface shadow.",
        minimumValue: 0,
        maximumValue: 32,
        step: 1,
        format: "integer",
      },
      {
        key: "surfaceShadowOffsetX",
        label: "Horizontal offset",
        description: "Moves the shadow left or right from the chat surface.",
        minimumValue: -12,
        maximumValue: 8,
        step: 1,
        format: "integer",
      },
    ],
  },
] as const satisfies readonly TuningSection[];

export const UI_COLORS = {
  appleBlue: "#007AFF",
  black: "#000000",
  white: "#ffffff",
} as const;
