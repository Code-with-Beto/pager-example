import * as WebBrowser from "expo-web-browser";
import { SymbolView } from "expo-symbols";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import type { ColorPalette, MenuContent } from "../types";

type SwipeMenuSurfaceProps = {
  colors: ColorPalette;
  content?: MenuContent;
  isMenuOpen: boolean;
  onOpenMenu: () => void;
  safeAreaBottom: number;
  safeAreaTop: number;
};

export function SwipeMenuSurface({
  colors,
  content,
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
          <SymbolView
            name={{ ios: "line.3.horizontal", android: "menu", web: "menu" }}
            size={21}
            tintColor={colors.text}
          />
        </Pressable>

        <View style={styles.titleGroup}>
          <Text selectable style={[styles.title, { color: colors.text }]}>
            cwb.sh
          </Text>
          <Text selectable style={[styles.subtitle, { color: colors.muted }]}>
            Swipe right for the menu
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
        {content ? (
          content.kind === "chat" ? (
            <View style={styles.conversation}>
              <Text
                selectable
                style={[styles.conversationTitle, { color: colors.text }]}
              >
                {content.title}
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
                  {content.prompt}
                </Text>
              </View>
              <Text
                selectable
                style={[styles.messageText, { color: colors.text }]}
              >
                {content.response}
              </Text>
            </View>
          ) : (
            <View style={styles.resource}>
              <Text style={[styles.eyebrow, { color: colors.accent }]}>
                {content.kind === "lesson"
                  ? `COURSE LESSON · ${content.minutes} MIN`
                  : "CODE WITH BETO"}
              </Text>
              <Text
                selectable
                style={[styles.resourceTitle, { color: colors.text }]}
              >
                {content.title}
              </Text>
              <Text
                selectable
                style={[styles.resourceDescription, { color: colors.muted }]}
              >
                {content.description}
              </Text>
              <Pressable
                accessibilityRole="link"
                onPress={() => void WebBrowser.openBrowserAsync(content.href)}
                style={({ pressed }) => [
                  styles.webButton,
                  { backgroundColor: colors.accent },
                  pressed && styles.pressed,
                ]}
              >
                <Text
                  style={[styles.webButtonLabel, { color: colors.accentText }]}
                >
                  {content.kind === "lesson"
                    ? "View lesson on the web"
                    : "Open on the web"}
                </Text>
                <SymbolView
                  name={{
                    ios: "arrow.up.right",
                    android: "arrow_outward",
                    web: "arrow_outward",
                  }}
                  size={17}
                  tintColor={colors.accentText}
                />
              </Pressable>
            </View>
          )
        ) : (
          <View style={styles.emptyState}>
            <View
              style={[styles.emptyIcon, { backgroundColor: colors.userBubble }]}
            >
              <SymbolView
                name={{
                  ios: "hand.draw",
                  android: "swipe_right",
                  web: "swipe_right",
                }}
                size={30}
                tintColor={colors.text}
              />
            </View>
            <Text
              selectable
              style={[styles.emptyTitle, { color: colors.text }]}
            >
              Explore Code with Beto
            </Text>
            <Text
              selectable
              style={[styles.emptyDescription, { color: colors.muted }]}
            >
              Swipe right to browse courses, templates, lessons, and recent
              chats. Swipe left or tap this surface to close the menu.
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
  emptyIcon: {
    alignItems: "center",
    borderCurve: "continuous",
    borderRadius: 28,
    height: 56,
    justifyContent: "center",
    marginBottom: 4,
    width: 56,
  },
  emptyTitle: {
    fontSize: 26,
    fontWeight: "700",
    letterSpacing: -0.7,
    textAlign: "center",
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
  resource: {
    alignItems: "flex-start",
    justifyContent: "center",
    marginHorizontal: "auto",
    maxWidth: 560,
    minHeight: 420,
    width: "100%",
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.8,
    marginBottom: 12,
  },
  resourceTitle: {
    fontSize: 34,
    fontWeight: "700",
    letterSpacing: -1.1,
  },
  resourceDescription: {
    fontSize: 17,
    lineHeight: 25,
    maxWidth: 480,
    paddingTop: 14,
  },
  webButton: {
    alignItems: "center",
    borderCurve: "continuous",
    borderRadius: 999,
    flexDirection: "row",
    gap: 8,
    marginTop: 28,
    minHeight: 48,
    paddingHorizontal: 19,
  },
  webButtonLabel: {
    fontSize: 15,
    fontWeight: "600",
  },
  pressed: {
    opacity: 0.45,
  },
});
