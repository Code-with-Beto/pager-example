import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  Platform,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import ScreenCornerSurface from "../../../modules/screen-corner-surface";
import { SwipeMenu } from "./components/swipe-menu";
import { SwipeMenuSurface } from "./components/swipe-menu-surface";
import {
  ANDROID_SCREEN_CORNER_RADIUS,
  CHATS,
  COURSE_LESSONS,
  IOS_LEGACY_SCREEN_CORNER_RADIUS,
  MENU_CONTENT,
  OFFERINGS,
  SWIPE_MENU_SURFACE_SHADOW,
  SWIPE_MENU_WIDTH_RATIO,
  WEB_SCREEN_CORNER_RADIUS,
} from "./constants";
import { useAppTheme } from "./hooks/use-app-theme";
import { useSwipeMenu } from "./hooks/use-swipe-menu";

export function SwipeMenuScreen() {
  const { width: screenWidth } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { colorScheme, colors } = useAppTheme();
  const [selectedContentId, setSelectedContentId] = useState<string | null>(
    null,
  );
  const menuWidth = screenWidth * SWIPE_MENU_WIDTH_RATIO;
  const {
    animateMenu,
    isMenuOpen,
    mainAnimatedStyle,
    menuContentAnimatedStyle,
    menuDockAnimatedStyle,
    swipeGesture,
  } = useSwipeMenu(menuWidth);
  const selectedContent = MENU_CONTENT.find(
    (content) => content.id === selectedContentId,
  );
  const fallbackCornerRadius = Platform.select({
    android: ANDROID_SCREEN_CORNER_RADIUS,
    default: WEB_SCREEN_CORNER_RADIUS,
    ios: IOS_LEGACY_SCREEN_CORNER_RADIUS,
  });

  const selectContent = useCallback(
    (contentId: string | null) => {
      setSelectedContentId(contentId);
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
      <View style={[styles.root, { backgroundColor: colors.menuBackground }]}>
        <View
          accessibilityElementsHidden={!isMenuOpen}
          importantForAccessibility={
            isMenuOpen ? "auto" : "no-hide-descendants"
          }
          pointerEvents={isMenuOpen ? "auto" : "none"}
          style={StyleSheet.absoluteFill}
        >
          <SwipeMenu
            chats={CHATS}
            colors={colors}
            contentAnimatedStyle={menuContentAnimatedStyle}
            dockAnimatedStyle={menuDockAnimatedStyle}
            lessons={COURSE_LESSONS}
            menuWidth={menuWidth}
            offerings={OFFERINGS}
            onNewChat={() => selectContent(null)}
            onProfilePress={openProfile}
            onSelectContent={selectContent}
            safeAreaBottom={insets.bottom}
            safeAreaTop={insets.top}
            selectedContentId={selectedContentId}
          />
        </View>

        <Animated.View style={[StyleSheet.absoluteFill, mainAnimatedStyle]}>
          <ScreenCornerSurface
            castsShadow
            fallbackRadius={fallbackCornerRadius}
            fallbackShadow={SWIPE_MENU_SURFACE_SHADOW}
            style={[
              styles.mainShadow,
              { backgroundColor: colors.surfaceBackground },
            ]}
          >
            <ScreenCornerSurface
              fallbackRadius={fallbackCornerRadius}
              style={[
                styles.surface,
                {
                  backgroundColor: colors.surfaceBackground,
                  borderColor: colors.surfaceBorder,
                  borderWidth: colorScheme === "dark" ? 1 : 0,
                },
              ]}
            >
              <SwipeMenuSurface
                colors={colors}
                content={selectedContent}
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
            </ScreenCornerSurface>
          </ScreenCornerSurface>
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
    flex: 1,
    zIndex: 2,
  },
  surface: {
    flex: 1,
    overflow: "hidden",
  },
});
