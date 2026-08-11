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
} from "../constants";
import type { DrawerTuning } from "../types";
import { clamp, shouldOpenDrawer } from "../utils";

type UseDrawerControllerOptions = {
  drawerWidth: number;
  gesturesEnabled: boolean;
  tuning: DrawerTuning;
};

function playDrawerStateChangeHaptic() {
  Presets.System.impactLight();
}

export function useDrawerController({
  drawerWidth,
  gesturesEnabled,
  tuning,
}: UseDrawerControllerOptions) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const translateX = useSharedValue(0);
  const gestureStartX = useSharedValue(0);
  const previousDrawerWidth = useRef(drawerWidth);
  const springConfig = useMemo(
    () => ({
      damping: tuning.springDamping,
      mass: tuning.springMass,
      overshootClamping: tuning.overshootClamping,
      stiffness: tuning.springStiffness,
    }),
    [
      tuning.overshootClamping,
      tuning.springDamping,
      tuning.springMass,
      tuning.springStiffness,
    ],
  );

  const animateDrawer = useCallback(
    (open: boolean) => {
      setDrawerOpen(open);
      translateX.value = withSpring(
        open ? drawerWidth : 0,
        springConfig,
      );
    },
    [drawerWidth, springConfig, translateX],
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
        .enabled(gesturesEnabled)
        .activeOffsetX([
          -tuning.activationDistance,
          tuning.activationDistance,
        ])
        .failOffsetY([-tuning.verticalTolerance, tuning.verticalTolerance])
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
          const shouldOpen = shouldOpenDrawer(
            {
              currentPosition: translateX.value,
              drawerWidth,
              translationX: event.translationX,
              velocityX: event.velocityX,
            },
            tuning,
          );

          translateX.value = withSpring(
            shouldOpen ? drawerWidth : 0,
            springConfig,
          );

          if (shouldOpen !== startedOpen) {
            runOnJS(playDrawerStateChangeHaptic)();
          }

          runOnJS(setDrawerOpen)(shouldOpen);
        }),
    [
      drawerWidth,
      gestureStartX,
      gesturesEnabled,
      springConfig,
      translateX,
      tuning,
    ],
  );

  const menuAnimatedStyle = useAnimatedStyle(() => {
    const progress = translateX.value / drawerWidth;

    return {
      transform: [
        {
          translateY: interpolate(
            progress,
            DRAWER_ANIMATION.menuTranslateY.inputRange,
            [tuning.menuTranslateY, 0],
            Extrapolation.CLAMP,
          ),
        },
        {
          scale: interpolate(
            progress,
            DRAWER_ANIMATION.menuScale.inputRange,
            [tuning.menuMinimumScale, 1],
            Extrapolation.CLAMP,
          ),
        },
      ],
    };
  });

  const menuRevealOverlayAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateX.value / drawerWidth,
      [
        DRAWER_ANIMATION.menuOpacity.inputRange[0],
        DRAWER_ANIMATION.menuOpacity.inputRange[1],
        tuning.menuFadeEndProgress,
      ],
      [
        1 - tuning.menuMinimumOpacity,
        1 - tuning.menuMinimumOpacity,
        0,
      ],
      Extrapolation.CLAMP,
    ),
  }));

  const mainAnimatedStyle = useAnimatedStyle(() => {
    const progress = translateX.value / drawerWidth;

    return {
      borderRadius: interpolate(
        progress,
        [0, 1],
        [0, tuning.surfaceCornerRadius],
      ),
      transform: [{ translateX: translateX.value }],
    };
  });

  const clippedSurfaceAnimatedStyle = useAnimatedStyle(() => ({
    borderRadius: interpolate(
      translateX.value / drawerWidth,
      [0, 1],
      [0, tuning.surfaceCornerRadius],
    ),
  }));

  const scrimAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateX.value / drawerWidth,
      DRAWER_ANIMATION.scrimOpacity.inputRange,
      [0, tuning.scrimMaximumOpacity],
    ),
  }));

  return {
    animateDrawer,
    clippedSurfaceAnimatedStyle,
    drawerOpen,
    mainAnimatedStyle,
    menuAnimatedStyle,
    menuRevealOverlayAnimatedStyle,
    panGesture,
    scrimAnimatedStyle,
  };
}
