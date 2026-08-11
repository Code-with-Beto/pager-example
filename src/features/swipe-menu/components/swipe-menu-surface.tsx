import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import type { Chat, ColorPalette } from "../types";

type SwipeMenuSurfaceProps = {
  chat?: Chat;
  colors: ColorPalette;
  isMenuOpen: boolean;
  onOpenMenu: () => void;
  safeAreaBottom: number;
  safeAreaTop: number;
};

export function SwipeMenuSurface({
  chat,
  colors,
  isMenuOpen,
  onOpenMenu,
  safeAreaBottom,
  safeAreaTop,
}: SwipeMenuSurfaceProps) {
  return (
    <View
      accessibilityElementsHidden={isMenuOpen}
      importantForAccessibility={isMenuOpen ? "no-hide-descendants" : "auto"}
      style={styles.root}
    >
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
          accessibilityLabel="Open swipe menu"
          accessibilityRole="button"
          hitSlop={10}
          onPress={onOpenMenu}
          style={({ pressed }) => [
            styles.menuButton,
            pressed && styles.pressed,
          ]}
        >
          <Text style={[styles.menuGlyph, { color: colors.text }]}>☰</Text>
        </Pressable>

        <View style={styles.titleGroup}>
          <Text selectable style={[styles.title, { color: colors.text }]}>
            Swipe Menu
          </Text>
          <Text selectable style={[styles.subtitle, { color: colors.muted }]}>
            Swipe right to open
          </Text>
        </View>

        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingBottom: Math.max(safeAreaBottom, 24) },
        ]}
        contentInsetAdjustmentBehavior="never"
        showsVerticalScrollIndicator={false}
      >
        {chat ? (
          <View style={styles.conversation}>
            <Text
              selectable
              style={[styles.conversationTitle, { color: colors.text }]}
            >
              {chat.title}
            </Text>
            <View
              style={[
                styles.userMessage,
                { backgroundColor: colors.userBubble },
              ]}
            >
              <Text
                selectable
                style={[styles.messageText, { color: colors.text }]}
              >
                {chat.prompt}
              </Text>
            </View>
            <Text
              selectable
              style={[styles.messageText, { color: colors.text }]}
            >
              {chat.response}
            </Text>
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Text style={[styles.swipeIcon, { color: colors.text }]}>⇥</Text>
            <Text selectable style={[styles.emptyTitle, { color: colors.text }]}>
              Try the swipe menu
            </Text>
            <Text
              selectable
              style={[styles.emptyDescription, { color: colors.muted }]}
            >
              Swipe right anywhere on this screen to reveal recent chats. Swipe
              left or tap the dimmed screen to close it.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    minHeight: 96,
    paddingBottom: 12,
    paddingHorizontal: 12,
  },
  menuButton: {
    alignItems: "center",
    height: 40,
    justifyContent: "center",
    width: 40,
  },
  menuGlyph: {
    fontSize: 21,
    fontWeight: "500",
  },
  titleGroup: {
    alignItems: "center",
    flex: 1,
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
  headerSpacer: {
    width: 40,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 22,
    paddingTop: 32,
  },
  emptyState: {
    alignItems: "center",
    flex: 1,
    gap: 12,
    justifyContent: "center",
    marginHorizontal: "auto",
    maxWidth: 360,
  },
  swipeIcon: {
    fontSize: 42,
  },
  emptyTitle: {
    fontSize: 26,
    fontWeight: "700",
    letterSpacing: -0.7,
  },
  emptyDescription: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
  },
  conversation: {
    gap: 24,
    marginHorizontal: "auto",
    maxWidth: 680,
    width: "100%",
  },
  conversationTitle: {
    fontSize: 23,
    fontWeight: "700",
    letterSpacing: -0.6,
    paddingBottom: 6,
  },
  userMessage: {
    alignSelf: "flex-end",
    borderCurve: "continuous",
    borderRadius: 20,
    maxWidth: "84%",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 24,
  },
  pressed: {
    opacity: 0.45,
  },
});
