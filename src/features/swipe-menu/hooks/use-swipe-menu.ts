import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Gesture } from "react-native-gesture-handler";
import {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { SWIPE_GESTURE, SWIPE_MENU_REVEAL, SWIPE_SPRING } from "../constants";

type SwipeEndState = {
  currentPosition: number;
  menuWidth: number;
  translationX: number;
  velocityX: number;
};

function clamp(value: number, minimum: number, maximum: number) {
  "worklet";

  return Math.min(maximum, Math.max(minimum, value));
}

function shouldOpenMenu({
  currentPosition,
  menuWidth,
  translationX,
  velocityX,
}: SwipeEndState) {
  "worklet";

  const hasDirectionalIntent =
    Math.abs(translationX) > SWIPE_GESTURE.directionDistanceThreshold ||
    Math.abs(velocityX) > SWIPE_GESTURE.velocityThreshold;

  if (hasDirectionalIntent) {
    const projectedDirection =
      translationX + velocityX * SWIPE_GESTURE.velocityInfluence;

    return projectedDirection > 0;
  }

  return currentPosition > menuWidth * SWIPE_GESTURE.openPositionThreshold;
}

export function useSwipeMenu(menuWidth: number) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const translateX = useSharedValue(0);
  const gestureStartX = useSharedValue(0);
  const previousMenuWidth = useRef(menuWidth);

  const animateMenu = useCallback(
    (open: boolean) => {
      setIsMenuOpen(open);
      translateX.value = withSpring(open ? menuWidth : 0, SWIPE_SPRING);
    },
    [menuWidth, translateX],
  );

  useEffect(() => {
    if (previousMenuWidth.current === menuWidth) {
      return;
    }

    translateX.value = isMenuOpen ? menuWidth : 0;
    previousMenuWidth.current = menuWidth;
  }, [isMenuOpen, menuWidth, translateX]);

  const swipeGesture = useMemo(
    () =>
      Gesture.Pan()
        .activeOffsetX([
          -SWIPE_GESTURE.activationDistance,
          SWIPE_GESTURE.activationDistance,
        ])
        .failOffsetY([
          -SWIPE_GESTURE.verticalTolerance,
          SWIPE_GESTURE.verticalTolerance,
        ])
        .onBegin(() => {
          gestureStartX.value = translateX.value;
        })
        .onUpdate((event) => {
          translateX.value = clamp(
            gestureStartX.value + event.translationX,
            0,
            menuWidth,
          );
        })
        .onEnd((event) => {
          const shouldOpen = shouldOpenMenu({
            currentPosition: translateX.value,
            menuWidth,
            translationX: event.translationX,
            velocityX: event.velocityX,
          });

          translateX.value = withSpring(
            shouldOpen ? menuWidth : 0,
            SWIPE_SPRING,
          );

          runOnJS(setIsMenuOpen)(shouldOpen);
        }),
    [gestureStartX, menuWidth, translateX],
  );

  const mainAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const menuContentAnimatedStyle = useAnimatedStyle(() => {
    const progress = translateX.value / menuWidth;

    return {
      opacity: interpolate(
        progress,
        [
          0,
          SWIPE_MENU_REVEAL.fadeStartProgress,
          SWIPE_MENU_REVEAL.fadeEndProgress,
        ],
        [0, 0, 1],
        Extrapolation.CLAMP,
      ),
      transform: [
        {
          translateY: interpolate(
            progress,
            [0, 1],
            [SWIPE_MENU_REVEAL.startVerticalOffset, 0],
            Extrapolation.CLAMP,
          ),
        },
        {
          scale: interpolate(
            progress,
            [0, 1],
            [SWIPE_MENU_REVEAL.startScale, 1],
            Extrapolation.CLAMP,
          ),
        },
      ],
    };
  });

  const menuDockAnimatedStyle = useAnimatedStyle(() => {
    const progress = translateX.value / menuWidth;

    return {
      opacity: interpolate(
        progress,
        [
          0,
          SWIPE_MENU_REVEAL.fadeStartProgress,
          SWIPE_MENU_REVEAL.fadeEndProgress,
        ],
        [
          SWIPE_MENU_REVEAL.glassSafeStartOpacity,
          SWIPE_MENU_REVEAL.glassSafeStartOpacity,
          1,
        ],
        Extrapolation.CLAMP,
      ),
      transform: [
        {
          translateY: interpolate(
            progress,
            [0, 1],
            [SWIPE_MENU_REVEAL.startVerticalOffset, 0],
            Extrapolation.CLAMP,
          ),
        },
        {
          scale: interpolate(
            progress,
            [0, 1],
            [SWIPE_MENU_REVEAL.startScale, 1],
            Extrapolation.CLAMP,
          ),
        },
      ],
    };
  });

  return {
    animateMenu,
    isMenuOpen,
    mainAnimatedStyle,
    menuContentAnimatedStyle,
    menuDockAnimatedStyle,
    swipeGesture,
  };
}
