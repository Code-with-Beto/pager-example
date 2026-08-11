import { Image } from "expo-image";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { PROFILE, SWIPE_MENU_LAYOUT } from "../constants";
import type { Chat, ColorPalette } from "../types";

type SwipeMenuProps = {
  chats: readonly Chat[];
  colors: ColorPalette;
  menuWidth: number;
  onNewChat: () => void;
  onProfilePress: () => void;
  onSelectChat: (chatId: string) => void;
  safeAreaBottom: number;
  safeAreaTop: number;
  selectedChatId: string | null;
};

export function SwipeMenu({
  chats,
  colors,
  menuWidth,
  onNewChat,
  onProfilePress,
  onSelectChat,
  safeAreaBottom,
  safeAreaTop,
  selectedChatId,
}: SwipeMenuProps) {
  return (
    <View
      style={[
        styles.menu,
        {
          backgroundColor: colors.menuBackground,
          paddingBottom: Math.max(
            safeAreaBottom,
            SWIPE_MENU_LAYOUT.minimumSafeAreaPadding,
          ),
          paddingTop: Math.max(
            safeAreaTop,
            SWIPE_MENU_LAYOUT.minimumSafeAreaPadding,
          ),
          width: menuWidth,
        },
      ]}
    >
      <Text selectable style={[styles.title, { color: colors.text }]}>
        Recent chats
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
            </Pressable>
          );
        })}
      </ScrollView>

      <View style={[styles.actions, { borderTopColor: colors.separator }]}>
        <Pressable
          accessibilityRole="button"
          onPress={onNewChat}
          style={({ pressed }) => [
            styles.newChatButton,
            { backgroundColor: colors.accent },
            pressed && styles.pressed,
          ]}
        >
          <Text style={[styles.newChatLabel, { color: colors.accentText }]}>
            + New chat
          </Text>
        </Pressable>

        <Pressable
          accessibilityLabel={`Open ${PROFILE.name}'s profile`}
          accessibilityRole="button"
          onPress={onProfilePress}
          style={({ pressed }) => [
            styles.profileButton,
            pressed && styles.pressed,
          ]}
        >
          <Image
            contentFit="cover"
            source={{ uri: PROFILE.imageUrl }}
            style={styles.profileImage}
            transition={180}
          />
          <View style={styles.profileText}>
            <Text style={[styles.profileName, { color: colors.text }]}>
              {PROFILE.name}
            </Text>
            <Text style={[styles.profileUsername, { color: colors.muted }]}>
              {PROFILE.username}
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    gap: 16,
    paddingHorizontal: SWIPE_MENU_LAYOUT.horizontalPadding,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    letterSpacing: -0.7,
    minHeight: 44,
    textAlignVertical: "center",
  },
  chatListScroll: {
    flex: 1,
  },
  chatList: {
    gap: 4,
  },
  chatRow: {
    borderCurve: "continuous",
    borderRadius: 12,
    justifyContent: "center",
    minHeight: 46,
    paddingHorizontal: 12,
  },
  chatRowText: {
    fontSize: 15,
    fontWeight: "500",
  },
  actions: {
    borderTopWidth: StyleSheet.hairlineWidth,
    gap: 10,
    paddingTop: 16,
  },
  newChatButton: {
    alignItems: "center",
    borderCurve: "continuous",
    borderRadius: 14,
    justifyContent: "center",
    minHeight: 48,
    paddingHorizontal: 16,
  },
  newChatLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
  profileButton: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
    minHeight: 54,
  },
  profileImage: {
    borderRadius: 20,
    height: 40,
    width: 40,
  },
  profileText: {
    flex: 1,
    gap: 2,
  },
  profileName: {
    fontSize: 15,
    fontWeight: "600",
  },
  profileUsername: {
    fontSize: 13,
  },
  pressed: {
    opacity: 0.55,
  },
});
