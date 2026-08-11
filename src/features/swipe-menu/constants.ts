import type { Chat, ColorPalette, CourseLesson, Offering } from "./types";

const CODE_WITH_BETO_URL = "https://codewithbeto.dev";

export const OFFERINGS = [
  {
    id: "cwb-mcp",
    kind: "offering",
    title: "CWB MCP",
    description: "Bring Code with Beto lessons and resources into your editor.",
    href: `${CODE_WITH_BETO_URL}/blog/introducing-cwb-mcp`,
    icon: { ios: "server.rack", android: "dns", web: "dns" },
  },
  {
    id: "react-native-course",
    kind: "offering",
    title: "React Native Course",
    description: "Build and ship real iOS and Android apps with Expo.",
    href: "https://cwb.sh/rn?r=github",
    icon: { ios: "iphone", android: "smartphone", web: "smartphone" },
  },
  {
    id: "platano-template",
    kind: "offering",
    title: "Platano Template",
    description: "A revenue-ready AI image app with payments and generation.",
    href: "https://cwb.sh/platano",
    icon: {
      ios: "photo.on.rectangle.angled",
      android: "imagesmode",
      web: "imagesmode",
    },
  },
  {
    id: "skills",
    kind: "offering",
    title: "Skills",
    description: "Open-source Codex skills for practical creator workflows.",
    href: "https://github.com/Code-with-Beto/skills",
    icon: { ios: "hammer", android: "construction", web: "construction" },
  },
  {
    id: "youtube",
    kind: "offering",
    title: "YouTube",
    description: "React Native, Expo, and AI tutorials from Code with Beto.",
    href: "https://cwb.sh/youtube",
    icon: {
      ios: "play.rectangle.fill",
      android: "smart_display",
      web: "smart_display",
    },
  },
] satisfies readonly Offering[];

export const COURSE_LESSONS = [
  {
    id: "animations-and-gestures",
    kind: "lesson",
    title: "Animations and Gestures",
    description: "Create fluid animations and gesture-driven interactions.",
    minutes: 42,
    href: `${CODE_WITH_BETO_URL}/rnCourse/animationsAndGestures`,
  },
  {
    id: "composition-and-interactions",
    kind: "lesson",
    title: "Composition & Interactions",
    description:
      "Compose motion and interaction patterns that stay maintainable.",
    minutes: 6,
    href: `${CODE_WITH_BETO_URL}/rnCourse/compositionAndInteractions`,
  },
  {
    id: "swipeable-components",
    kind: "lesson",
    title: "Swipeable Components",
    description: "Build reusable components powered by gestures and motion.",
    minutes: 14,
    href: `${CODE_WITH_BETO_URL}/rnCourse/swipeableComponents`,
  },
  {
    id: "expo-ui-ios",
    kind: "lesson",
    title: "Expo UI on iOS",
    description: "Build truly native interfaces with SwiftUI and Expo UI.",
    minutes: 18,
    href: `${CODE_WITH_BETO_URL}/rnCourse/expoUIOniOS`,
  },
  {
    id: "native-modules-introduction",
    kind: "lesson",
    title: "Introduction to Native Modules",
    description: "Learn when and why to extend an Expo app with native code.",
    minutes: 10,
    href: `${CODE_WITH_BETO_URL}/rnCourse/nativeModulesIntroduction`,
  },
  {
    id: "create-native-module",
    kind: "lesson",
    title: "Create a Native Module",
    description: "Build platform-specific functionality with Expo Modules API.",
    minutes: 20,
    href: `${CODE_WITH_BETO_URL}/rnCourse/createNativeModule`,
  },
] satisfies readonly CourseLesson[];

export const CHATS = [
  {
    id: "reanimated",
    kind: "chat",
    title: "Explain Reanimated gestures",
    prompt: "How does this swipe menu stay so smooth?",
    response:
      "The drag updates a shared value on the UI thread. React only hears about the final open or closed state, so it never has to render every frame.",
  },
  {
    id: "onboarding",
    kind: "chat",
    title: "Design an onboarding flow",
    prompt: "Help me simplify my app onboarding.",
    response:
      "Start with the single outcome users came for, ask only for permissions at the moment they are needed, and let people reach value before asking them to create an account.",
  },
  {
    id: "mexico-city",
    kind: "chat",
    title: "Weekend in Mexico City",
    prompt: "Plan a relaxed weekend in Mexico City.",
    response:
      "I'd anchor the weekend around Roma Norte and Condesa, leave one morning for Chapultepec, and keep enough space for long lunches and spontaneous stops.",
  },
] satisfies readonly Chat[];

export const MENU_CONTENT = [
  ...OFFERINGS,
  ...COURSE_LESSONS,
  ...CHATS,
] as const;

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
    menuBackground: "#FAFAFA",
    menuSelected: "#E8E8E8",
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

export const SWIPE_MENU_WIDTH_RATIO = 0.78;
export const IOS_LEGACY_SCREEN_CORNER_RADIUS = 55;
export const ANDROID_SCREEN_CORNER_RADIUS = 32;
export const WEB_SCREEN_CORNER_RADIUS = 28;
export const SWIPE_MENU_SURFACE_SHADOW = "-8px 0 40px rgba(0, 0, 0, 0.14)";

export const SWIPE_MENU_LAYOUT = {
  actionDockHeight: 58,
  actionDockSpacing: 12,
  horizontalPadding: 18,
  minimumSafeAreaPadding: 16,
  scrollBottomPadding: 112,
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

export const SWIPE_MENU_REVEAL = {
  fadeEndProgress: 0.5,
  fadeStartProgress: 0.08,
  startScale: 0.975,
  startVerticalOffset: 8,
} as const;
