import { requireOptionalNativeModule } from "expo";
import { requireNativeViewManager } from "expo-modules-core";
import type { ComponentType } from "react";
import { StyleSheet, View } from "react-native";

import type { ScreenCornerSurfaceProps } from "./ScreenCornerSurface";

const nativeModule = requireOptionalNativeModule("ScreenCornerSurface");
const NativeScreenCornerSurface = nativeModule
  ? (requireNativeViewManager(
      "ScreenCornerSurface",
    ) as ComponentType<ScreenCornerSurfaceProps>)
  : null;

export default function ScreenCornerSurface({
  castsShadow,
  fallbackRadius,
  fallbackShadow,
  style,
  ...props
}: ScreenCornerSurfaceProps) {
  if (NativeScreenCornerSurface) {
    return (
      <NativeScreenCornerSurface
        {...props}
        castsShadow={castsShadow}
        fallbackRadius={fallbackRadius}
        style={style}
      />
    );
  }

  return (
    <View
      {...props}
      style={[
        styles.fallback,
        { borderRadius: fallbackRadius },
        castsShadow && fallbackShadow
          ? { boxShadow: fallbackShadow }
          : undefined,
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  fallback: {
    borderCurve: "continuous",
  },
});
