import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Pressable, StyleSheet, useWindowDimensions, View } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { SwipeMenu } from "./components/swipe-menu";
import { SwipeMenuSurface } from "./components/swipe-menu-surface";
import {
  CHATS,
  SWIPE_MENU_SURFACE_SHADOW,
  SWIPE_MENU_WIDTH_RATIO,
} from "./constants";
import { useAppTheme } from "./hooks/use-app-theme";
import { useSwipeMenu } from "./hooks/use-swipe-menu";

export function SwipeMenuScreen() {
  const { width: screenWidth } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { colorScheme, colors } = useAppTheme();
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const menuWidth = screenWidth * SWIPE_MENU_WIDTH_RATIO;
  const {
    animateMenu,
    clippedSurfaceAnimatedStyle,
    isMenuOpen,
    mainAnimatedStyle,
    menuAnimatedStyle,
    swipeGesture,
  } = useSwipeMenu(menuWidth);
  const selectedChat = CHATS.find((chat) => chat.id === selectedChatId);

  const selectChat = useCallback(
    (chatId: string | null) => {
      setSelectedChatId(chatId);
      animateMenu(false);
    },
    [animateMenu],
  );

  const openProfile = useCallback(() => {
    animateMenu(false);
    router.push("/profile");
  }, [animateMenu, router]);

  return (
    <GestureDetector gesture={swipeGesture}>
      <View style={[styles.root, { backgroundColor: colors.appBackground }]}>
        <Animated.View
          accessibilityElementsHidden={!isMenuOpen}
          importantForAccessibility={
            isMenuOpen ? "auto" : "no-hide-descendants"
          }
          pointerEvents={isMenuOpen ? "auto" : "none"}
          style={[StyleSheet.absoluteFill, menuAnimatedStyle]}
        >
          <SwipeMenu
            chats={CHATS}
            colors={colors}
            menuWidth={menuWidth}
            onNewChat={() => selectChat(null)}
            onProfilePress={openProfile}
            onSelectChat={selectChat}
            safeAreaBottom={insets.bottom}
            safeAreaTop={insets.top}
            selectedChatId={selectedChatId}
          />
        </Animated.View>

        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            styles.mainShadow,
            { boxShadow: SWIPE_MENU_SURFACE_SHADOW },
            mainAnimatedStyle,
          ]}
        >
          <Animated.View
            style={[
              styles.surface,
              {
                backgroundColor: colors.surfaceBackground,
                borderColor: colors.surfaceBorder,
                borderWidth: colorScheme === "dark" ? 1 : 0,
              },
              clippedSurfaceAnimatedStyle,
            ]}
          >
            <SwipeMenuSurface
              chat={selectedChat}
              colors={colors}
              isMenuOpen={isMenuOpen}
              onOpenMenu={() => animateMenu(true)}
              safeAreaBottom={insets.bottom}
              safeAreaTop={insets.top}
            />

            <View
              pointerEvents={isMenuOpen ? "auto" : "none"}
              style={StyleSheet.absoluteFill}
            >
              <Pressable
                accessibilityLabel="Close swipe menu"
                accessibilityRole="button"
                onPress={() => animateMenu(false)}
                style={StyleSheet.absoluteFill}
              />
            </View>
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
  surface: {
    borderCurve: "continuous",
    flex: 1,
    overflow: "hidden",
  },
});
