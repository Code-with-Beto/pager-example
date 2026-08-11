import type { PropsWithChildren } from "react";
import {
  StyleSheet,
  View,
  type ViewProps,
  type ViewStyle,
} from "react-native";

export type ScreenCornerSurfaceProps = PropsWithChildren<
  ViewProps & {
    castsShadow?: boolean;
    fallbackRadius: number;
    fallbackShadow?: ViewStyle["boxShadow"];
  }
>;

export default function ScreenCornerSurface({
  castsShadow,
  fallbackRadius,
  fallbackShadow,
  style,
  ...props
}: ScreenCornerSurfaceProps) {
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
