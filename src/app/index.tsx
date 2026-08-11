import { Host, Switch } from "@expo/ui";
import {
  GlassContainer,
  GlassView,
  isGlassEffectAPIAvailable,
} from "expo-glass-effect";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  useWindowDimensions,
  View,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { Presets } from "react-native-pulsar";
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type ThemePreference = "system" | "light" | "dark";

type Chat = {
  id: string;
  title: string;
  prompt: string;
  response: string;
};

const chats: Chat[] = [
  {
    id: "reanimated",
    title: "Explain Reanimated gestures",
    prompt: "How does this drawer gesture stay so smooth?",
    response:
      "The drag updates a shared value on the UI thread. React only hears about the final open or closed state, so it never has to render every frame.",
  },
  {
    id: "onboarding",
    title: "Design an onboarding flow",
    prompt: "Help me simplify my app onboarding.",
    response:
      "Start with the single outcome users came for, ask only for permissions at the moment they are needed, and let people reach value before asking them to create an account.",
  },
  {
    id: "mexico-city",
    title: "Weekend in Mexico City",
    prompt: "Plan a relaxed weekend in Mexico City.",
    response:
      "I’d anchor the weekend around Roma Norte and Condesa, leave one morning for Chapultepec, and keep enough space for long lunches and spontaneous stops.",
  },
];

const profileImageUrl = "https://github.com/betomoedano.png";
const appleBlue = "#007AFF";

const palettes = {
  light: {
    accent: "#0f766e",
    accentText: "#ffffff",
    appBackground: "#f4f4f4",
    chatBackground: "#ffffff",
    composer: "#f4f4f2",
    menuBackground: "#f4f4f4",
    menuSelected: "#dededb",
    muted: "#6f6f6a",
    separator: "rgba(20, 20, 18, 0.09)",
    surfaceBorder: "transparent",
    text: "#171714",
    userBubble: "#ededeb",
  },
  dark: {
    accent: "#34d399",
    accentText: "#052e2b",
    appBackground: "#0f0f0f",
    chatBackground: "#212121",
    composer: "#2f2f2f",
    menuBackground: "#151515",
    menuSelected: "#2b2b2b",
    muted: "#a9a9a3",
    separator: "rgba(255, 255, 255, 0.09)",
    surfaceBorder: "rgba(255, 255, 255, 0.1)",
    text: "#f5f5f0",
    userBubble: "#303030",
  },
} as const;

const springConfig = {
  damping: 30,
  mass: 0.7,
  overshootClamping: true,
  stiffness: 420,
};

export default function DrawerPagerExample() {
  const systemColorScheme = useColorScheme();
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [themePreference, setThemePreference] =
    useState<ThemePreference>("system");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profileVisible, setProfileVisible] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  const colorScheme =
    themePreference === "system"
      ? systemColorScheme === "dark"
        ? "dark"
        : "light"
      : themePreference;
  const colors = palettes[colorScheme];
  const drawerWidth = width * 0.76;
  const surfaceCornerRadius =
    process.env.EXPO_OS === "ios"
      ? insets.top >= 44
        ? Math.min(54, Math.round(insets.top * 0.82))
        : 18
      : 28;
  const translateX = useSharedValue(0);
  const gestureStartX = useSharedValue(0);
  const previousDrawerWidth = useRef(drawerWidth);
  const selectedChat = chats.find((chat) => chat.id === selectedChatId);

  const animateDrawer = useCallback(
    (open: boolean) => {
      setDrawerOpen(open);
      translateX.value = withSpring(open ? drawerWidth : 0, springConfig);
    },
    [drawerWidth, translateX],
  );

  useEffect(() => {
    if (previousDrawerWidth.current !== drawerWidth) {
      translateX.value = drawerOpen ? drawerWidth : 0;
      previousDrawerWidth.current = drawerWidth;
    }
  }, [drawerOpen, drawerWidth, translateX]);

  const selectChat = useCallback(
    (chatId: string | null) => {
      setSelectedChatId(chatId);
      animateDrawer(false);
    },
    [animateDrawer],
  );

  const panGesture = useMemo(
    () =>
      Gesture.Pan()
        .activeOffsetX([-8, 8])
        .failOffsetY([-18, 18])
        .onBegin(() => {
          gestureStartX.value = translateX.value;
        })
        .onUpdate((event) => {
          translateX.value = Math.min(
            drawerWidth,
            Math.max(0, gestureStartX.value + event.translationX),
          );
        })
        .onEnd((event) => {
          const startedOpen = gestureStartX.value > drawerWidth * 0.5;
          const hasDirectionalIntent =
            Math.abs(event.translationX) > 12 ||
            Math.abs(event.velocityX) > 160;
          const intendedDirection = event.translationX + event.velocityX * 0.05;
          const shouldOpen = hasDirectionalIntent
            ? intendedDirection > 0
            : translateX.value > drawerWidth * 0.18;

          translateX.value = withSpring(
            shouldOpen ? drawerWidth : 0,
            springConfig,
          );

          if (shouldOpen !== startedOpen) {
            Presets.System.impactLight();
          }

          runOnJS(setDrawerOpen)(shouldOpen);
        }),
    [drawerWidth, gestureStartX, translateX],
  );

  const menuAnimatedStyle = useAnimatedStyle(() => {
    const progress = translateX.value / drawerWidth;

    return {
      opacity: interpolate(
        progress,
        [0, 0.22, 0.55],
        [0.16, 0.84, 1],
        Extrapolation.CLAMP,
      ),
      transform: [
        {
          translateY: interpolate(
            progress,
            [0, 0.42],
            [10, 0],
            Extrapolation.CLAMP,
          ),
        },
        {
          scale: interpolate(
            progress,
            [0, 0.46],
            [0.992, 1],
            Extrapolation.CLAMP,
          ),
        },
      ],
    };
  });

  const mainAnimatedStyle = useAnimatedStyle(() => {
    const progress = translateX.value / drawerWidth;

    return {
      borderRadius: interpolate(progress, [0, 1], [0, surfaceCornerRadius]),
      transform: [{ translateX: translateX.value }],
    };
  });

  const clippedSurfaceAnimatedStyle = useAnimatedStyle(() => ({
    borderRadius: interpolate(
      translateX.value / drawerWidth,
      [0, 1],
      [0, surfaceCornerRadius],
    ),
  }));

  const scrimAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value / drawerWidth, [0, 1], [0, 0.08]),
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <View style={[styles.root, { backgroundColor: colors.appBackground }]}>
        <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />

        <Animated.View
          accessibilityElementsHidden={!drawerOpen}
          importantForAccessibility={
            drawerOpen ? "auto" : "no-hide-descendants"
          }
          pointerEvents={drawerOpen ? "auto" : "none"}
          style={[StyleSheet.absoluteFill, menuAnimatedStyle]}
        >
          <View
            style={[
              styles.drawer,
              {
                backgroundColor: colors.menuBackground,
                paddingBottom: Math.max(insets.bottom, 16),
                paddingTop: Math.max(insets.top, 16),
                width: drawerWidth,
              },
            ]}
          >
            <View style={styles.drawerHeader}>
              <Text
                selectable
                style={[styles.drawerTitle, { color: colors.text }]}
              >
                Chats
              </Text>
              <Pressable
                accessibilityLabel="Search chats"
                accessibilityRole="button"
                hitSlop={10}
                style={({ pressed }) => [
                  styles.iconButton,
                  { opacity: pressed ? 0.5 : 1 },
                ]}
              >
                <View
                  style={[styles.searchCircle, { borderColor: colors.text }]}
                >
                  <View
                    style={[
                      styles.searchHandle,
                      { backgroundColor: colors.text },
                    ]}
                  />
                </View>
              </Pressable>
            </View>

            <Text
              selectable
              style={[styles.sectionLabel, { color: colors.muted }]}
            >
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
                    onPress={() => selectChat(chat.id)}
                    style={({ pressed }) => [
                      styles.chatRow,
                      selected && { backgroundColor: colors.menuSelected },
                      pressed && { opacity: 0.55 },
                    ]}
                  >
                    <Text
                      numberOfLines={1}
                      style={[styles.chatRowText, { color: colors.text }]}
                    >
                      {chat.title}
                    </Text>
                    <Text style={[styles.ellipsis, { color: colors.muted }]}>
                      •••
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>

            <View
              style={[
                styles.appearanceRow,
                { borderTopColor: colors.separator },
              ]}
            >
              <Host
                colorScheme={colorScheme}
                matchContents={{ vertical: true }}
                seedColor={colors.accent}
                style={{ width: drawerWidth - 40 }}
              >
                <Switch
                  label="Dark appearance"
                  onValueChange={(enabled) =>
                    setThemePreference(enabled ? "dark" : "light")
                  }
                  value={colorScheme === "dark"}
                />
              </Host>
            </View>

            <FloatingDrawerActions
              colorScheme={colorScheme}
              onNewChat={() => selectChat(null)}
              onProfile={() => setProfileVisible(true)}
            />
          </View>
        </Animated.View>

        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            styles.mainShadow,
            colorScheme === "light" && {
              boxShadow: "-1px 0 12px rgba(0, 0, 0, 0.08)",
            },
            mainAnimatedStyle,
          ]}
        >
          <Animated.View
            style={[
              styles.chatSurface,
              {
                backgroundColor: colors.chatBackground,
                borderColor: colors.surfaceBorder,
                borderWidth: colorScheme === "dark" ? 1 : 0,
              },
              clippedSurfaceAnimatedStyle,
            ]}
          >
            <View
              accessibilityElementsHidden={drawerOpen}
              importantForAccessibility={
                drawerOpen ? "no-hide-descendants" : "auto"
              }
              style={styles.chatContent}
            >
              <View
                style={[
                  styles.header,
                  {
                    borderBottomColor: colors.separator,
                    paddingTop: Math.max(insets.top, 12),
                  },
                ]}
              >
                <Pressable
                  accessibilityLabel="Open chats"
                  accessibilityRole="button"
                  hitSlop={10}
                  onPress={() => animateDrawer(true)}
                  style={({ pressed }) => [
                    styles.iconButton,
                    { opacity: pressed ? 0.45 : 1 },
                  ]}
                >
                  <Text style={[styles.menuGlyph, { color: colors.text }]}>
                    ☰
                  </Text>
                </Pressable>

                <View style={styles.headerTitleGroup}>
                  <Text
                    selectable
                    style={[styles.headerTitle, { color: colors.text }]}
                  >
                    ChatGPT
                  </Text>
                  <Text
                    selectable
                    style={[styles.headerSubtitle, { color: colors.muted }]}
                  >
                    Gesture prototype
                  </Text>
                </View>

                <View
                  style={[
                    styles.miniAvatar,
                    { backgroundColor: colors.accent },
                  ]}
                >
                  <Text
                    style={[
                      styles.miniAvatarText,
                      { color: colors.accentText },
                    ]}
                  >
                    B
                  </Text>
                </View>
              </View>

              <ChatContent chat={selectedChat} colors={colors} />

              <View
                style={[
                  styles.composerArea,
                  { paddingBottom: Math.max(insets.bottom, 12) },
                ]}
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
                  <Text style={[styles.plusGlyph, { color: colors.text }]}>
                    ＋
                  </Text>
                  <Text
                    selectable
                    style={[styles.placeholder, { color: colors.muted }]}
                  >
                    Message
                  </Text>
                  <View
                    style={[
                      styles.sendButton,
                      { backgroundColor: colors.text },
                    ]}
                  >
                    <Text
                      style={[
                        styles.sendGlyph,
                        { color: colors.chatBackground },
                      ]}
                    >
                      ↑
                    </Text>
                  </View>
                </View>
                <Text
                  selectable
                  style={[styles.gestureHint, { color: colors.muted }]}
                >
                  Swipe right anywhere to open · swipe left to close
                </Text>
              </View>
            </View>

            <Animated.View
              pointerEvents={drawerOpen ? "auto" : "none"}
              style={[
                StyleSheet.absoluteFill,
                styles.scrim,
                scrimAnimatedStyle,
              ]}
            >
              <Pressable
                accessibilityLabel="Close chats"
                accessibilityRole="button"
                onPress={() => animateDrawer(false)}
                style={StyleSheet.absoluteFill}
              />
            </Animated.View>
          </Animated.View>
        </Animated.View>

        <ProfileModal
          colorScheme={colorScheme}
          colors={colors}
          onClose={() => setProfileVisible(false)}
          visible={profileVisible}
        />
      </View>
    </GestureDetector>
  );
}

function FloatingDrawerActions({
  colorScheme,
  onNewChat,
  onProfile,
}: {
  colorScheme: "light" | "dark";
  onNewChat: () => void;
  onProfile: () => void;
}) {
  const canUseLiquidGlass =
    process.env.EXPO_OS === "ios" && isGlassEffectAPIAvailable();

  const newChatContent = (
    <Pressable
      accessibilityLabel="New chat"
      accessibilityRole="button"
      onPress={onNewChat}
      style={({ pressed }) => [
        styles.newChatButtonContent,
        { opacity: pressed ? 0.62 : 1 },
      ]}
    >
      {process.env.EXPO_OS === "ios" ? (
        <Image
          source="sf:square.and.pencil"
          style={styles.newChatIcon}
          tintColor="#ffffff"
        />
      ) : (
        <Text style={styles.newChatFallbackIcon}>＋</Text>
      )}
      <Text style={styles.newChatButtonLabel}>New chat</Text>
    </Pressable>
  );

  const profileContent = (
    <Pressable
      accessibilityLabel="Open Beto's profile"
      accessibilityRole="button"
      onPress={onProfile}
      style={({ pressed }) => [
        styles.profileButtonContent,
        { opacity: pressed ? 0.68 : 1 },
      ]}
    >
      <Image
        contentFit="cover"
        source={{ uri: profileImageUrl }}
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
          tintColor={appleBlue}
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

function ProfileModal({
  colorScheme,
  colors,
  onClose,
  visible,
}: {
  colorScheme: "light" | "dark";
  colors: (typeof palettes)["light"] | (typeof palettes)["dark"];
  onClose: () => void;
  visible: boolean;
}) {
  return (
    <Modal
      animationType="fade"
      onRequestClose={onClose}
      presentationStyle="overFullScreen"
      statusBarTranslucent
      transparent
      visible={visible}
    >
      <View style={styles.modalRoot}>
        <Pressable
          accessibilityLabel="Close profile"
          accessibilityRole="button"
          onPress={onClose}
          style={StyleSheet.absoluteFill}
        />
        <View
          style={[
            styles.profileModalCard,
            {
              backgroundColor: colors.chatBackground,
              borderColor: colors.separator,
            },
          ]}
        >
          <Image
            contentFit="cover"
            source={{ uri: profileImageUrl }}
            style={styles.profileModalImage}
            transition={180}
          />
          <Text
            selectable
            style={[styles.profileModalName, { color: colors.text }]}
          >
            Beto
          </Text>
          <Text
            selectable
            style={[styles.profileModalHandle, { color: colors.muted }]}
          >
            @betomoedano
          </Text>
          <Text
            selectable
            style={[styles.profileModalBio, { color: colors.text }]}
          >
            Mobile developer and creator behind Code with Beto.
          </Text>
          <Pressable
            accessibilityRole="button"
            onPress={onClose}
            style={({ pressed }) => [
              styles.modalCloseButton,
              {
                backgroundColor: colorScheme === "dark" ? "#303030" : "#eeeeee",
                opacity: pressed ? 0.6 : 1,
              },
            ]}
          >
            <Text style={[styles.modalCloseLabel, { color: colors.text }]}>
              Close
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

function ChatContent({
  chat,
  colors,
}: {
  chat: Chat | undefined;
  colors: (typeof palettes)["light"] | (typeof palettes)["dark"];
}) {
  if (!chat) {
    return (
      <ScrollView
        contentContainerStyle={styles.emptyContent}
        contentInsetAdjustmentBehavior="never"
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.mark, { borderColor: colors.separator }]}>
          <Text style={[styles.markText, { color: colors.text }]}>✦</Text>
        </View>
        <Text selectable style={[styles.greeting, { color: colors.text }]}>
          How can I help?
        </Text>
        <View style={styles.suggestions}>
          {[
            "Explain a tricky concept",
            "Plan a mobile app",
            "Brainstorm a new feature",
          ].map((suggestion) => (
            <View
              key={suggestion}
              style={[styles.suggestion, { borderColor: colors.separator }]}
            >
              <Text
                selectable
                style={[styles.suggestionText, { color: colors.text }]}
              >
                {suggestion}
              </Text>
              <Text style={{ color: colors.muted }}>↗</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.conversation}
      contentInsetAdjustmentBehavior="never"
      showsVerticalScrollIndicator={false}
    >
      <Text
        selectable
        style={[styles.conversationTitle, { color: colors.text }]}
      >
        {chat.title}
      </Text>
      <View
        style={[styles.userMessage, { backgroundColor: colors.userBubble }]}
      >
        <Text selectable style={[styles.messageText, { color: colors.text }]}>
          {chat.prompt}
        </Text>
      </View>
      <View style={styles.assistantMessage}>
        <View style={[styles.assistantMark, { borderColor: colors.separator }]}>
          <Text style={[styles.assistantMarkText, { color: colors.text }]}>
            ✦
          </Text>
        </View>
        <Text selectable style={[styles.messageText, { color: colors.text }]}>
          {chat.response}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    overflow: "hidden",
  },
  drawer: {
    flex: 1,
    gap: 16,
    paddingHorizontal: 20,
  },
  drawerHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: 44,
  },
  drawerTitle: {
    fontSize: 24,
    fontWeight: "700",
    letterSpacing: -0.7,
  },
  iconButton: {
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
    backgroundColor: appleBlue,
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
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  newChatIcon: {
    height: 20,
    width: 20,
  },
  newChatFallbackIcon: {
    color: "#ffffff",
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
  mainShadow: {
    borderCurve: "continuous",
    zIndex: 2,
  },
  chatSurface: {
    borderCurve: "continuous",
    flex: 1,
    overflow: "hidden",
  },
  chatContent: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: 96,
    paddingBottom: 12,
    paddingHorizontal: 12,
  },
  menuGlyph: {
    fontSize: 21,
    fontWeight: "500",
  },
  headerTitleGroup: {
    alignItems: "center",
    gap: 1,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: -0.2,
  },
  headerSubtitle: {
    fontSize: 11,
  },
  miniAvatar: {
    alignItems: "center",
    borderCurve: "continuous",
    borderRadius: 10,
    height: 32,
    justifyContent: "center",
    width: 32,
  },
  miniAvatarText: {
    fontSize: 12,
    fontWeight: "800",
  },
  emptyContent: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 22,
    paddingVertical: 32,
  },
  mark: {
    alignItems: "center",
    borderCurve: "continuous",
    borderRadius: 18,
    borderWidth: 1,
    height: 56,
    justifyContent: "center",
    width: 56,
  },
  markText: {
    fontSize: 26,
  },
  greeting: {
    fontSize: 26,
    fontWeight: "600",
    letterSpacing: -0.8,
    paddingTop: 18,
  },
  suggestions: {
    gap: 10,
    maxWidth: 460,
    paddingTop: 32,
    width: "100%",
  },
  suggestion: {
    alignItems: "center",
    borderCurve: "continuous",
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: 54,
    paddingHorizontal: 16,
  },
  suggestionText: {
    fontSize: 14,
    fontWeight: "500",
  },
  conversation: {
    gap: 24,
    marginHorizontal: "auto",
    maxWidth: 680,
    paddingHorizontal: 22,
    paddingVertical: 34,
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
  assistantMessage: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: 12,
  },
  assistantMark: {
    alignItems: "center",
    borderCurve: "continuous",
    borderRadius: 10,
    borderWidth: 1,
    height: 32,
    justifyContent: "center",
    width: 32,
  },
  assistantMarkText: {
    fontSize: 15,
  },
  messageText: {
    flexShrink: 1,
    fontSize: 16,
    lineHeight: 24,
  },
  composerArea: {
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
  scrim: {
    backgroundColor: "#000000",
  },
  modalRoot: {
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.34)",
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  profileModalCard: {
    alignItems: "center",
    borderCurve: "continuous",
    borderRadius: 28,
    borderWidth: 1,
    boxShadow: "0 12px 40px rgba(0, 0, 0, 0.22)",
    gap: 7,
    maxWidth: 360,
    padding: 24,
    width: "100%",
  },
  profileModalImage: {
    borderRadius: 48,
    height: 96,
    marginBottom: 8,
    width: 96,
  },
  profileModalName: {
    fontSize: 22,
    fontWeight: "700",
    letterSpacing: -0.5,
  },
  profileModalHandle: {
    fontSize: 14,
  },
  profileModalBio: {
    fontSize: 15,
    lineHeight: 21,
    paddingHorizontal: 8,
    paddingVertical: 12,
    textAlign: "center",
  },
  modalCloseButton: {
    alignItems: "center",
    alignSelf: "stretch",
    borderCurve: "continuous",
    borderRadius: 18,
    justifyContent: "center",
    minHeight: 44,
  },
  modalCloseLabel: {
    fontSize: 15,
    fontWeight: "600",
  },
});
