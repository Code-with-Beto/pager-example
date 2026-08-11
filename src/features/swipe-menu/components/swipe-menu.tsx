import {
  GlassContainer,
  GlassView,
  isGlassEffectAPIAvailable,
  isLiquidGlassAvailable,
} from "expo-glass-effect";
import { Image } from "expo-image";
import { SymbolView } from "expo-symbols";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type ViewStyle,
} from "react-native";
import Animated, { type AnimatedStyle } from "react-native-reanimated";

import { PROFILE, SWIPE_MENU_LAYOUT } from "../constants";
import type { Chat, ColorPalette, CourseLesson, Offering } from "../types";

type SwipeMenuProps = {
  chats: readonly Chat[];
  colors: ColorPalette;
  contentAnimatedStyle: AnimatedStyle<ViewStyle>;
  dockAnimatedStyle: AnimatedStyle<ViewStyle>;
  lessons: readonly CourseLesson[];
  menuWidth: number;
  offerings: readonly Offering[];
  onNewChat: () => void;
  onProfilePress: () => void;
  onSelectContent: (contentId: string) => void;
  safeAreaBottom: number;
  safeAreaTop: number;
  selectedContentId: string | null;
};

const SUPPORTS_LIQUID_GLASS =
  Platform.OS === "ios" &&
  isGlassEffectAPIAvailable() &&
  isLiquidGlassAvailable();

export function SwipeMenu({
  chats,
  colors,
  contentAnimatedStyle,
  dockAnimatedStyle,
  lessons,
  menuWidth,
  offerings,
  onNewChat,
  onProfilePress,
  onSelectContent,
  safeAreaBottom,
  safeAreaTop,
  selectedContentId,
}: SwipeMenuProps) {
  const dockBottom = Math.max(
    safeAreaBottom,
    SWIPE_MENU_LAYOUT.minimumSafeAreaPadding,
  );

  return (
    <View
      style={[
        styles.menu,
        {
          backgroundColor: colors.menuBackground,
          paddingTop: Math.max(
            safeAreaTop,
            SWIPE_MENU_LAYOUT.minimumSafeAreaPadding,
          ),
          width: menuWidth,
        },
      ]}
    >
      <Animated.View style={[styles.menuBody, contentAnimatedStyle]}>
        <Text selectable style={[styles.title, { color: colors.text }]}>
          Code with Beto
        </Text>

        <ScrollView
          contentContainerStyle={styles.menuContent}
          contentInsetAdjustmentBehavior="never"
          showsVerticalScrollIndicator={false}
          style={styles.menuScroll}
        >
          <SectionTitle colors={colors}>Explore</SectionTitle>
          {offerings.map((offering) => {
            const selected = offering.id === selectedContentId;

            return (
              <Pressable
                accessibilityRole="button"
                accessibilityState={{ selected }}
                key={offering.id}
                onPress={() => onSelectContent(offering.id)}
                style={({ pressed }) => [
                  styles.offeringRow,
                  selected && { backgroundColor: colors.menuSelected },
                  pressed && styles.pressed,
                ]}
              >
                <SymbolView
                  name={offering.icon}
                  size={24}
                  tintColor={colors.text}
                />
                <Text
                  numberOfLines={1}
                  style={[
                    styles.offeringTitle,
                    (offering.id === "cwb-mcp" || offering.id === "youtube") &&
                      styles.offeringTitleSemibold,
                    { color: colors.text },
                  ]}
                >
                  {offering.title}
                </Text>
              </Pressable>
            );
          })}

          <SectionTitle colors={colors}>Course lessons</SectionTitle>
          {lessons.map((lesson) => {
            const selected = lesson.id === selectedContentId;

            return (
              <Pressable
                accessibilityRole="button"
                accessibilityState={{ selected }}
                key={lesson.id}
                onPress={() => onSelectContent(lesson.id)}
                style={({ pressed }) => [
                  styles.lessonRow,
                  selected && { backgroundColor: colors.menuSelected },
                  pressed && styles.pressed,
                ]}
              >
                <Text
                  numberOfLines={1}
                  style={[styles.lessonTitle, { color: colors.text }]}
                >
                  {lesson.title}
                </Text>
                <Text style={[styles.minutes, { color: colors.muted }]}>
                  {lesson.minutes} min
                </Text>
              </Pressable>
            );
          })}

          <SectionTitle colors={colors}>Recents</SectionTitle>
          {chats.map((chat) => {
            const selected = chat.id === selectedContentId;

            return (
              <Pressable
                accessibilityRole="button"
                accessibilityState={{ selected }}
                key={chat.id}
                onPress={() => onSelectContent(chat.id)}
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
      </Animated.View>

      <Animated.View
        pointerEvents="box-none"
        style={[
          styles.actionDock,
          {
            bottom: dockBottom,
            left: SWIPE_MENU_LAYOUT.horizontalPadding,
            right: SWIPE_MENU_LAYOUT.horizontalPadding,
          },
          dockAnimatedStyle,
        ]}
      >
        {SUPPORTS_LIQUID_GLASS ? (
          <GlassContainer
            spacing={SWIPE_MENU_LAYOUT.actionDockSpacing}
            style={styles.actionRow}
          >
            <GlassView
              colorScheme="auto"
              glassEffectStyle="regular"
              isInteractive
              style={styles.newChatSurface}
              tintColor={colors.accent}
            >
              <NewChatButton colors={colors} onPress={onNewChat} />
            </GlassView>
            <GlassView
              colorScheme="auto"
              glassEffectStyle="regular"
              isInteractive
              style={styles.profileSurface}
            >
              <ProfileButton onPress={onProfilePress} />
            </GlassView>
          </GlassContainer>
        ) : (
          <View style={styles.actionRow}>
            <View
              style={[
                styles.newChatSurface,
                { backgroundColor: colors.accent },
              ]}
            >
              <NewChatButton colors={colors} onPress={onNewChat} />
            </View>
            <View
              style={[
                styles.profileSurface,
                styles.profileFallback,
                {
                  backgroundColor: colors.surfaceBackground,
                  borderColor: colors.separator,
                },
              ]}
            >
              <ProfileButton onPress={onProfilePress} />
            </View>
          </View>
        )}
      </Animated.View>
    </View>
  );
}

function SectionTitle({
  children,
  colors,
}: {
  children: string;
  colors: ColorPalette;
}) {
  return (
    <Text selectable style={[styles.sectionTitle, { color: colors.text }]}>
      {children}
    </Text>
  );
}

function NewChatButton({
  colors,
  onPress,
}: {
  colors: ColorPalette;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.newChatButton, pressed && styles.pressed]}
    >
      <SymbolView
        name={{
          ios: "square.and.pencil",
          android: "add_comment",
          web: "add_comment",
        }}
        size={20}
        tintColor={colors.accentText}
      />
      <Text style={[styles.newChatLabel, { color: colors.accentText }]}>
        New chat
      </Text>
    </Pressable>
  );
}

function ProfileButton({ onPress }: { onPress: () => void }) {
  return (
    <Pressable
      accessibilityLabel={`Open ${PROFILE.name}'s profile`}
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.profileButton, pressed && styles.pressed]}
    >
      <Image
        contentFit="cover"
        source={{ uri: PROFILE.imageUrl }}
        style={styles.profileImage}
        transition={180}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    paddingHorizontal: SWIPE_MENU_LAYOUT.horizontalPadding,
  },
  menuBody: {
    flex: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    letterSpacing: -1,
    paddingBottom: 14,
  },
  menuScroll: {
    flex: 1,
  },
  menuContent: {
    paddingBottom: SWIPE_MENU_LAYOUT.scrollBottomPadding,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: -0.2,
    paddingBottom: 7,
    paddingHorizontal: 8,
    paddingTop: 18,
  },
  offeringRow: {
    alignItems: "center",
    borderCurve: "continuous",
    borderRadius: 14,
    flexDirection: "row",
    gap: 14,
    minHeight: 52,
    paddingHorizontal: 10,
  },
  offeringTitle: {
    flex: 1,
    fontSize: 17,
    fontWeight: "400",
    letterSpacing: -0.25,
  },
  offeringTitleSemibold: {
    fontWeight: "600",
  },
  lessonRow: {
    alignItems: "center",
    borderCurve: "continuous",
    borderRadius: 14,
    flexDirection: "row",
    gap: 10,
    minHeight: 50,
    paddingHorizontal: 10,
  },
  lessonTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "400",
    letterSpacing: -0.2,
  },
  minutes: {
    fontSize: 13,
    fontVariant: ["tabular-nums"],
  },
  chatRow: {
    borderCurve: "continuous",
    borderRadius: 12,
    justifyContent: "center",
    minHeight: 44,
    paddingHorizontal: 10,
  },
  chatRowText: {
    fontSize: 14,
    fontWeight: "500",
  },
  actionDock: {
    position: "absolute",
  },
  actionRow: {
    flexDirection: "row",
    gap: SWIPE_MENU_LAYOUT.actionDockSpacing,
    height: SWIPE_MENU_LAYOUT.actionDockHeight,
    width: "100%",
  },
  newChatSurface: {
    borderCurve: "continuous",
    borderRadius: 999,
    flex: 1,
    overflow: "hidden",
  },
  newChatButton: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    gap: 9,
    justifyContent: "center",
    paddingHorizontal: 18,
  },
  newChatLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
  profileSurface: {
    borderCurve: "continuous",
    borderRadius: 999,
    height: SWIPE_MENU_LAYOUT.actionDockHeight,
    overflow: "hidden",
    width: SWIPE_MENU_LAYOUT.actionDockHeight,
  },
  profileFallback: {
    borderWidth: StyleSheet.hairlineWidth,
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
  },
  profileButton: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  profileImage: {
    borderRadius: 22,
    height: 44,
    width: 44,
  },
  pressed: {
    opacity: 0.55,
  },
});
