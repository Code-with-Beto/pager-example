import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  Pressable,
  Share,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import { KeyboardController } from "react-native-keyboard-controller";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ChatPanel } from "./components/chat-panel";
import { DrawerMenu } from "./components/drawer-menu";
import { CHATS, UI_COLORS } from "./constants";
import { useDrawerController } from "./hooks/use-drawer-controller";
import { useDrawerTuning } from "./hooks/use-drawer-tuning";
import { useTheme } from "./providers/theme-provider";
import {
  formatDrawerTuningForShare,
  getDrawerWidth,
  getSurfaceBoxShadow,
  getSurfaceCornerRadius,
} from "./utils";

export function ChatDrawerScreen() {
  const { width: screenWidth } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { colorScheme, colors, setThemePreference } = useTheme();
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [tunerVisible, setTunerVisible] = useState(false);
  const [composerFocused, setComposerFocused] = useState(false);

  const defaultSurfaceCornerRadius = getSurfaceCornerRadius(
    process.env.EXPO_OS,
    insets.top,
  );
  const {
    resetTuning,
    setNumericValue,
    setOvershootClamping,
    tuning,
  } = useDrawerTuning(defaultSurfaceCornerRadius);
  const drawerWidth = getDrawerWidth(screenWidth, tuning.drawerWidthRatio);
  const {
    animateDrawer,
    clippedSurfaceAnimatedStyle,
    drawerOpen,
    mainAnimatedStyle,
    menuAnimatedStyle,
    menuRevealOverlayAnimatedStyle,
    panGesture,
    scrimAnimatedStyle,
  } = useDrawerController({
    drawerWidth,
    gesturesEnabled: !tunerVisible && !composerFocused,
    tuning,
  });
  const selectedChat = CHATS.find((chat) => chat.id === selectedChatId);

  const selectChat = useCallback(
    (chatId: string | null) => {
      setSelectedChatId(chatId);
      animateDrawer(false);
    },
    [animateDrawer],
  );

  const openDrawer = useCallback(() => {
    KeyboardController.dismiss();
    setComposerFocused(false);
    setTunerVisible(false);
    animateDrawer(true);
  }, [animateDrawer]);

  const toggleTuner = useCallback(() => {
    KeyboardController.dismiss();
    setComposerFocused(false);
    animateDrawer(false);
    setTunerVisible((visible) => !visible);
  }, [animateDrawer]);

  const openProfile = useCallback(() => {
    KeyboardController.dismiss();
    setComposerFocused(false);
    animateDrawer(false);
    router.push("/profile");
  }, [animateDrawer, router]);

  const shareTuning = useCallback(async () => {
    await Share.share({ message: formatDrawerTuningForShare(tuning) });
  }, [tuning]);

  return (
    <GestureDetector gesture={panGesture}>
      <View style={[styles.root, { backgroundColor: colors.appBackground }]}>
        <Animated.View
          accessibilityElementsHidden={!drawerOpen}
          importantForAccessibility={
            drawerOpen ? "auto" : "no-hide-descendants"
          }
          pointerEvents={drawerOpen ? "auto" : "none"}
          style={[StyleSheet.absoluteFill, menuAnimatedStyle]}
        >
          <DrawerMenu
            chats={CHATS}
            colorScheme={colorScheme}
            colors={colors}
            drawerWidth={drawerWidth}
            onAppearanceChange={setThemePreference}
            onNewChat={() => selectChat(null)}
            onProfilePress={openProfile}
            onSelectChat={selectChat}
            safeAreaBottom={insets.bottom}
            safeAreaTop={insets.top}
            selectedChatId={selectedChatId}
          />
          <Animated.View
            pointerEvents="none"
            style={[
              StyleSheet.absoluteFill,
              { backgroundColor: colors.chatBackground },
              menuRevealOverlayAnimatedStyle,
            ]}
          />
        </Animated.View>

        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            styles.mainShadow,
            { boxShadow: getSurfaceBoxShadow(tuning) },
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
            <ChatPanel
              chat={selectedChat}
              colorScheme={colorScheme}
              colors={colors}
              drawerOpen={drawerOpen}
              onCloseTuner={() => setTunerVisible(false)}
              onComposerFocusChange={setComposerFocused}
              onNumericTuningChange={setNumericValue}
              onOpenDrawer={openDrawer}
              onOvershootClampingChange={setOvershootClamping}
              onResetTuning={resetTuning}
              onShareTuning={shareTuning}
              onToggleTuner={toggleTuner}
              safeAreaBottom={insets.bottom}
              safeAreaTop={insets.top}
              tunerVisible={tunerVisible}
              tuning={tuning}
            />

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
      </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    overflow: "hidden",
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
  scrim: {
    backgroundColor: UI_COLORS.black,
  },
});
