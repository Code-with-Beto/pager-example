import { DRAWER_LAYOUT } from "./constants";
import type { ColorSchemeName } from "react-native";
import type {
  AppColorScheme,
  DrawerEndState,
  DrawerTuning,
  ThemePreference,
  TuningValueFormat,
} from "./types";

export function resolveColorScheme(
  preference: ThemePreference,
  systemColorScheme: ColorSchemeName,
): AppColorScheme {
  if (preference !== "system") {
    return preference;
  }

  return systemColorScheme === "dark" ? "dark" : "light";
}

export function getDrawerWidth(
  screenWidth: number,
  drawerWidthRatio: number,
): number {
  return screenWidth * drawerWidthRatio;
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
}: DrawerEndState, tuning: DrawerTuning): boolean {
  "worklet";

  const hasDirectionalIntent =
    Math.abs(translationX) >
      tuning.directionalTranslationThreshold ||
    Math.abs(velocityX) > tuning.velocityThreshold;

  if (hasDirectionalIntent) {
    const projectedDirection =
      translationX + velocityX * tuning.velocityProjection;

    return projectedDirection > 0;
  }

  return currentPosition > drawerWidth * tuning.positionThreshold;
}

export function formatTuningValue(
  value: number,
  format: TuningValueFormat,
): string {
  if (format === "percent") {
    return `${Math.round(value * 100)}%`;
  }

  if (format === "integer") {
    return Math.round(value).toString();
  }

  return Number(value.toFixed(3)).toString();
}

export function formatDrawerTuningForShare(tuning: DrawerTuning): string {
  return `Drawer gesture tuning values:\n${JSON.stringify(tuning, null, 2)}`;
}
