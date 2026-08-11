import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Gesture } from "react-native-gesture-handler";
import { Presets } from "react-native-pulsar";
import {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import {
  DRAWER_ANIMATION,
  DRAWER_GESTURE,
  DRAWER_SPRING_CONFIG,
} from "../constants";
import { clamp, shouldOpenDrawer } from "../utils";

type UseDrawerControllerOptions = {
  drawerWidth: number;
  surfaceCornerRadius: number;
};

function playDrawerStateChangeHaptic() {
  Presets.System.impactLight();
}

export function useDrawerController({
  drawerWidth,
  surfaceCornerRadius,
}: UseDrawerControllerOptions) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const translateX = useSharedValue(0);
  const gestureStartX = useSharedValue(0);
  const previousDrawerWidth = useRef(drawerWidth);

  const animateDrawer = useCallback(
    (open: boolean) => {
      setDrawerOpen(open);
      translateX.value = withSpring(
        open ? drawerWidth : 0,
        DRAWER_SPRING_CONFIG,
      );
    },
    [drawerWidth, translateX],
  );

  useEffect(() => {
    if (previousDrawerWidth.current === drawerWidth) {
      return;
    }

    translateX.value = drawerOpen ? drawerWidth : 0;
    previousDrawerWidth.current = drawerWidth;
  }, [drawerOpen, drawerWidth, translateX]);

  const panGesture = useMemo(
    () =>
      Gesture.Pan()
        .activeOffsetX(DRAWER_GESTURE.activeOffsetX)
        .failOffsetY(DRAWER_GESTURE.failOffsetY)
        .onBegin(() => {
          gestureStartX.value = translateX.value;
        })
        .onUpdate((event) => {
          translateX.value = clamp(
            gestureStartX.value + event.translationX,
            0,
            drawerWidth,
          );
        })
        .onEnd((event) => {
          const startedOpen =
            gestureStartX.value >
            drawerWidth * DRAWER_GESTURE.openStateThreshold;
          const shouldOpen = shouldOpenDrawer({
            currentPosition: translateX.value,
            drawerWidth,
            translationX: event.translationX,
            velocityX: event.velocityX,
          });

          translateX.value = withSpring(
            shouldOpen ? drawerWidth : 0,
            DRAWER_SPRING_CONFIG,
          );

          if (shouldOpen !== startedOpen) {
            runOnJS(playDrawerStateChangeHaptic)();
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
        DRAWER_ANIMATION.menuOpacity.inputRange,
        DRAWER_ANIMATION.menuOpacity.outputRange,
        Extrapolation.CLAMP,
      ),
      transform: [
        {
          translateY: interpolate(
            progress,
            DRAWER_ANIMATION.menuTranslateY.inputRange,
            DRAWER_ANIMATION.menuTranslateY.outputRange,
            Extrapolation.CLAMP,
          ),
        },
        {
          scale: interpolate(
            progress,
            DRAWER_ANIMATION.menuScale.inputRange,
            DRAWER_ANIMATION.menuScale.outputRange,
            Extrapolation.CLAMP,
          ),
        },
      ],
    };
  });

  const mainAnimatedStyle = useAnimatedStyle(() => {
    const progress = translateX.value / drawerWidth;

    return {
      borderRadius: interpolate(
        progress,
        [0, 1],
        [0, surfaceCornerRadius],
      ),
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
    opacity: interpolate(
      translateX.value / drawerWidth,
      DRAWER_ANIMATION.scrimOpacity.inputRange,
      DRAWER_ANIMATION.scrimOpacity.outputRange,
    ),
  }));

  return {
    animateDrawer,
    clippedSurfaceAnimatedStyle,
    drawerOpen,
    mainAnimatedStyle,
    menuAnimatedStyle,
    panGesture,
    scrimAnimatedStyle,
  };
}
