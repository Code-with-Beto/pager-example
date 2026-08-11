import { GlassContainer, GlassView, isGlassEffectAPIAvailable } from "expo-glass-effect";
import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { PROFILE, UI_COLORS } from "../constants";
import type { AppColorScheme } from "../types";

type FloatingDrawerActionsProps = {
  colorScheme: AppColorScheme;
  onNewChat: () => void;
  onProfilePress: () => void;
};

export function FloatingDrawerActions({
  colorScheme,
  onNewChat,
  onProfilePress,
}: FloatingDrawerActionsProps) {
  const canUseLiquidGlass =
    process.env.EXPO_OS === "ios" && isGlassEffectAPIAvailable();

  const newChatContent = (
    <Pressable
      accessibilityLabel="New chat"
      accessibilityRole="button"
      onPress={onNewChat}
      style={({ pressed }) => [
        styles.newChatButtonContent,
        pressed && styles.pressed,
      ]}
    >
      {process.env.EXPO_OS === "ios" ? (
        <Image
          source="sf:square.and.pencil"
          style={styles.newChatIcon}
          tintColor={UI_COLORS.white}
        />
      ) : (
        <Text style={styles.newChatFallbackIcon}>＋</Text>
      )}
      <Text style={styles.newChatButtonLabel}>New chat</Text>
    </Pressable>
  );

  const profileContent = (
    <Pressable
      accessibilityLabel={`Open ${PROFILE.name}'s profile`}
      accessibilityRole="button"
      onPress={onProfilePress}
      style={({ pressed }) => [
        styles.profileButtonContent,
        pressed && styles.pressed,
      ]}
    >
      <Image
        contentFit="cover"
        source={{ uri: PROFILE.imageUrl }}
        style={styles.profileButtonImage}
        transition={180}
      />
    </Pressable>
  );

  if (canUseLiquidGlass) {
    return (
      <GlassContainer spacing={10} style={styles.floatingActions}>
        <GlassView
          colorScheme={colorScheme}
          glassEffectStyle="regular"
          isInteractive
          style={styles.newChatGlassButton}
          tintColor={UI_COLORS.appleBlue}
        >
          {newChatContent}
        </GlassView>
        <GlassView
          colorScheme={colorScheme}
          glassEffectStyle="clear"
          isInteractive
          style={styles.profileGlassButton}
        >
          {profileContent}
        </GlassView>
      </GlassContainer>
    );
  }

  return (
    <View style={styles.floatingActions}>
      <View style={styles.newChatFallbackButton}>{newChatContent}</View>
      <View style={styles.profileFallbackButton}>{profileContent}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  floatingActions: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    height: 58,
    paddingHorizontal: 2,
  },
  newChatGlassButton: {
    borderCurve: "continuous",
    borderRadius: 29,
    flex: 1,
    height: 58,
    overflow: "hidden",
  },
  newChatFallbackButton: {
    backgroundColor: UI_COLORS.appleBlue,
    borderCurve: "continuous",
    borderRadius: 29,
    flex: 1,
    height: 58,
    overflow: "hidden",
  },
  newChatButtonContent: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    gap: 9,
    justifyContent: "center",
    paddingHorizontal: 18,
  },
  newChatButtonLabel: {
    color: UI_COLORS.white,
    fontSize: 16,
    fontWeight: "600",
  },
  newChatIcon: {
    height: 20,
    width: 20,
  },
  newChatFallbackIcon: {
    color: UI_COLORS.white,
    fontSize: 22,
    fontWeight: "500",
  },
  profileGlassButton: {
    borderRadius: 29,
    height: 58,
    overflow: "hidden",
    width: 58,
  },
  profileFallbackButton: {
    backgroundColor: "rgba(128, 128, 128, 0.14)",
    borderRadius: 29,
    height: 58,
    overflow: "hidden",
    width: 58,
  },
  profileButtonContent: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    padding: 3,
  },
  profileButtonImage: {
    borderRadius: 26,
    height: 52,
    width: 52,
  },
  pressed: {
    opacity: 0.64,
  },
});
