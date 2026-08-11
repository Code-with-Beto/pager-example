import { StyleSheet, Text, View } from "react-native";

import type { ColorPalette } from "../types";

type ChatComposerProps = {
  colors: ColorPalette;
  safeAreaBottom: number;
};

export function ChatComposer({
  colors,
  safeAreaBottom,
}: ChatComposerProps) {
  return (
    <View
      style={[styles.area, { paddingBottom: Math.max(safeAreaBottom, 12) }]}
    >
      <View
        style={[
          styles.composer,
          {
            backgroundColor: colors.composer,
            borderColor: colors.separator,
          },
        ]}
      >
        <Text style={[styles.plusGlyph, { color: colors.text }]}>＋</Text>
        <Text selectable style={[styles.placeholder, { color: colors.muted }]}>
          Message
        </Text>
        <View style={[styles.sendButton, { backgroundColor: colors.text }]}>
          <Text style={[styles.sendGlyph, { color: colors.chatBackground }]}>↑</Text>
        </View>
      </View>
      <Text selectable style={[styles.gestureHint, { color: colors.muted }]}>
        Swipe right anywhere to open · swipe left to close
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  area: {
    gap: 8,
    paddingHorizontal: 14,
    paddingTop: 8,
  },
  composer: {
    alignItems: "center",
    alignSelf: "center",
    borderCurve: "continuous",
    borderRadius: 24,
    borderWidth: 1,
    flexDirection: "row",
    gap: 8,
    maxWidth: 680,
    minHeight: 52,
    paddingHorizontal: 9,
    width: "100%",
  },
  plusGlyph: {
    fontSize: 25,
    fontWeight: "300",
  },
  placeholder: {
    flex: 1,
    fontSize: 16,
  },
  sendButton: {
    alignItems: "center",
    borderRadius: 18,
    height: 34,
    justifyContent: "center",
    width: 34,
  },
  sendGlyph: {
    fontSize: 19,
    fontWeight: "700",
  },
  gestureHint: {
    fontSize: 10,
    textAlign: "center",
  },
});
