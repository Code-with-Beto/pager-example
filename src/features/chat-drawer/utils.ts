import { DRAWER_GESTURE, DRAWER_LAYOUT } from "./constants";
import type {
  AppColorScheme,
  DrawerEndState,
  ThemePreference,
} from "./types";

export function resolveColorScheme(
  preference: ThemePreference,
  systemColorScheme: AppColorScheme | null | undefined,
): AppColorScheme {
  if (preference !== "system") {
    return preference;
  }

  return systemColorScheme === "dark" ? "dark" : "light";
}

export function getDrawerWidth(screenWidth: number): number {
  return screenWidth * DRAWER_LAYOUT.widthRatio;
}

export function getSurfaceCornerRadius(
  platform: string | undefined,
  topInset: number,
): number {
  const radius = DRAWER_LAYOUT.surfaceCornerRadius;

  if (platform !== "ios") {
    return radius.android;
  }

  if (topInset < radius.notchedIosInset) {
    return radius.compactIos;
  }

  return Math.min(
    radius.maximumIos,
    Math.round(topInset * radius.notchedIosRatio),
  );
}

export function clamp(value: number, minimum: number, maximum: number): number {
  "worklet";

  return Math.min(maximum, Math.max(minimum, value));
}

export function shouldOpenDrawer({
  currentPosition,
  drawerWidth,
  translationX,
  velocityX,
}: DrawerEndState): boolean {
  "worklet";

  const hasDirectionalIntent =
    Math.abs(translationX) >
      DRAWER_GESTURE.directionalTranslationThreshold ||
    Math.abs(velocityX) > DRAWER_GESTURE.velocityThreshold;

  if (hasDirectionalIntent) {
    const projectedDirection =
      translationX + velocityX * DRAWER_GESTURE.velocityProjection;

    return projectedDirection > 0;
  }

  return currentPosition > drawerWidth * DRAWER_GESTURE.positionThreshold;
}
