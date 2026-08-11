import type { PropsWithChildren } from "react";
import { StyleSheet, View, type ViewProps } from "react-native";

export type ScreenCornerSurfaceProps = PropsWithChildren<
  ViewProps & {
    fallbackRadius: number;
  }
>;

export default function ScreenCornerSurface({
  fallbackRadius,
  style,
  ...props
}: ScreenCornerSurfaceProps) {
  return (
    <View
      {...props}
      style={[styles.fallback, { borderRadius: fallbackRadius }, style]}
    />
  );
}

const styles = StyleSheet.create({
  fallback: {
    borderCurve: "continuous",
  },
});
