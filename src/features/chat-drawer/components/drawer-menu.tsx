import { Host, Switch } from "@expo/ui";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { DRAWER_LAYOUT } from "../constants";
import type { AppColorScheme, Chat, ColorPalette } from "../types";
import { FloatingDrawerActions } from "./floating-drawer-actions";

type DrawerMenuProps = {
  chats: readonly Chat[];
  colorScheme: AppColorScheme;
  colors: ColorPalette;
  drawerWidth: number;
  onAppearanceChange: (colorScheme: AppColorScheme) => void;
  onNewChat: () => void;
  onProfilePress: () => void;
  onSelectChat: (chatId: string) => void;
  safeAreaBottom: number;
  safeAreaTop: number;
  selectedChatId: string | null;
};

export function DrawerMenu({
  chats,
  colorScheme,
  colors,
  drawerWidth,
  onAppearanceChange,
  onNewChat,
  onProfilePress,
  onSelectChat,
  safeAreaBottom,
  safeAreaTop,
  selectedChatId,
}: DrawerMenuProps) {
  const contentWidth =
    drawerWidth - DRAWER_LAYOUT.horizontalPadding * 2;

  return (
    <View
      style={[
        styles.drawer,
        {
          backgroundColor: colors.menuBackground,
          paddingBottom: Math.max(
            safeAreaBottom,
            DRAWER_LAYOUT.minimumSafeAreaPadding,
          ),
          paddingTop: Math.max(
            safeAreaTop,
            DRAWER_LAYOUT.minimumSafeAreaPadding,
          ),
          width: drawerWidth,
        },
      ]}
    >
      <View style={styles.header}>
        <Text selectable style={[styles.title, { color: colors.text }]}>
          Chats
        </Text>
        <View accessible={false} style={styles.searchIcon}>
          <View style={[styles.searchCircle, { borderColor: colors.text }]}>
            <View
              style={[styles.searchHandle, { backgroundColor: colors.text }]}
            />
          </View>
        </View>
      </View>

      <Text selectable style={[styles.sectionLabel, { color: colors.muted }]}>
        RECENT
      </Text>

      <ScrollView
        contentContainerStyle={styles.chatList}
        contentInsetAdjustmentBehavior="never"
        showsVerticalScrollIndicator={false}
        style={styles.chatListScroll}
      >
        {chats.map((chat) => {
          const selected = chat.id === selectedChatId;

          return (
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ selected }}
              key={chat.id}
              onPress={() => onSelectChat(chat.id)}
              style={({ pressed }) => [
                styles.chatRow,
                selected && { backgroundColor: colors.menuSelected },
                pressed && styles.pressed,
              ]}
            >
              <Text
                numberOfLines={1}
                style={[styles.chatRowText, { color: colors.text }]}
              >
                {chat.title}
              </Text>
              <Text style={[styles.ellipsis, { color: colors.muted }]}>•••</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <View style={[styles.appearanceRow, { borderTopColor: colors.separator }]}>
        <Host
          colorScheme={colorScheme}
          matchContents={{ vertical: true }}
          seedColor={colors.accent}
          style={{ width: contentWidth }}
        >
          <Switch
            label="Dark appearance"
            onValueChange={(enabled) =>
              onAppearanceChange(enabled ? "dark" : "light")
            }
            value={colorScheme === "dark"}
          />
        </Host>
      </View>

      <FloatingDrawerActions
        colorScheme={colorScheme}
        onNewChat={onNewChat}
        onProfilePress={onProfilePress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  drawer: {
    flex: 1,
    gap: 16,
    paddingHorizontal: DRAWER_LAYOUT.horizontalPadding,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: 44,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    letterSpacing: -0.7,
  },
  searchIcon: {
    alignItems: "center",
    height: 40,
    justifyContent: "center",
    width: 40,
  },
  searchCircle: {
    borderRadius: 8,
    borderWidth: 2,
    height: 16,
    marginBottom: 3,
    marginRight: 3,
    width: 16,
  },
  searchHandle: {
    bottom: -4,
    height: 2,
    position: "absolute",
    right: -5,
    transform: [{ rotate: "45deg" }],
    width: 7,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.7,
    paddingHorizontal: 10,
    paddingTop: 4,
  },
  chatListScroll: {
    flex: 1,
  },
  chatList: {
    gap: 4,
  },
  chatRow: {
    alignItems: "center",
    borderCurve: "continuous",
    borderRadius: 12,
    flexDirection: "row",
    gap: 8,
    minHeight: 46,
    paddingHorizontal: 12,
  },
  chatRowText: {
    flex: 1,
    fontSize: 15,
    fontWeight: "500",
  },
  ellipsis: {
    fontSize: 9,
    letterSpacing: 1,
  },
  appearanceRow: {
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: 14,
  },
  pressed: {
    opacity: 0.55,
  },
});
