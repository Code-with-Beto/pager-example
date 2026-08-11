import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";

import type { ColorPalette } from "../types";

type ChatHeaderProps = {
  colors: ColorPalette;
  onOpenDrawer: () => void;
  onToggleTuner: () => void;
  safeAreaTop: number;
  tunerVisible: boolean;
};

export function ChatHeader({
  colors,
  onOpenDrawer,
  onToggleTuner,
  safeAreaTop,
  tunerVisible,
}: ChatHeaderProps) {
  return (
    <View
      style={[
        styles.header,
        {
          borderBottomColor: colors.separator,
          paddingTop: Math.max(safeAreaTop, 12),
        },
      ]}
    >
      <Pressable
        accessibilityLabel="Open chats"
        accessibilityRole="button"
        hitSlop={10}
        onPress={onOpenDrawer}
        style={({ pressed }) => [
          styles.iconButton,
          pressed && styles.pressed,
        ]}
      >
        <Text style={[styles.menuGlyph, { color: colors.text }]}>☰</Text>
      </Pressable>

      <View style={styles.titleGroup}>
        <Text selectable style={[styles.title, { color: colors.text }]}>
          ChatGPT
        </Text>
        <Text selectable style={[styles.subtitle, { color: colors.muted }]}>
          Gesture prototype
        </Text>
      </View>

      <Pressable
        accessibilityLabel={tunerVisible ? "Close gesture tuner" : "Tune gesture"}
        accessibilityRole="button"
        accessibilityState={{ selected: tunerVisible }}
        hitSlop={10}
        onPress={onToggleTuner}
        style={({ pressed }) => [
          styles.iconButton,
          styles.tunerButton,
          tunerVisible && { backgroundColor: colors.composer },
          pressed && styles.pressed,
        ]}
      >
        {process.env.EXPO_OS === "ios" ? (
          <Image
            source="sf:slider.horizontal.3"
            style={styles.tunerIcon}
            tintColor={colors.text}
          />
        ) : (
          <Text style={[styles.tunerFallbackIcon, { color: colors.text }]}>⚙</Text>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: 96,
    paddingBottom: 12,
    paddingHorizontal: 12,
  },
  iconButton: {
    alignItems: "center",
    height: 40,
    justifyContent: "center",
    width: 40,
  },
  pressed: {
    opacity: 0.45,
  },
  menuGlyph: {
    fontSize: 21,
    fontWeight: "500",
  },
  titleGroup: {
    alignItems: "center",
    gap: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: -0.2,
  },
  subtitle: {
    fontSize: 11,
  },
  tunerIcon: {
    height: 19,
    width: 21,
  },
  tunerFallbackIcon: {
    fontSize: 19,
  },
  tunerButton: {
    borderCurve: "continuous",
    borderRadius: 10,
  },
});
