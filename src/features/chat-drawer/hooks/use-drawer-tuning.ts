import { useCallback, useEffect, useRef, useState } from "react";

import { DEFAULT_DRAWER_TUNING } from "../constants";
import type {
  DrawerTuning,
  NumericDrawerTuningKey,
} from "../types";

export function useDrawerTuning(defaultSurfaceCornerRadius: number) {
  const createDefaults = useCallback(
    (): DrawerTuning => ({
      ...DEFAULT_DRAWER_TUNING,
      surfaceCornerRadius: defaultSurfaceCornerRadius,
    }),
    [defaultSurfaceCornerRadius],
  );
  const [tuning, setTuning] = useState<DrawerTuning>(createDefaults);
  const previousDefaultCornerRadius = useRef(defaultSurfaceCornerRadius);

  useEffect(() => {
    setTuning((current) => {
      if (
        current.surfaceCornerRadius !== previousDefaultCornerRadius.current ||
        current.surfaceCornerRadius === defaultSurfaceCornerRadius
      ) {
        return current;
      }

      return {
        ...current,
        surfaceCornerRadius: defaultSurfaceCornerRadius,
      };
    });
    previousDefaultCornerRadius.current = defaultSurfaceCornerRadius;
  }, [defaultSurfaceCornerRadius]);

  const setNumericValue = useCallback(
    (key: NumericDrawerTuningKey, value: number) => {
      setTuning((current) => ({ ...current, [key]: value }));
    },
    [],
  );

  const setOvershootClamping = useCallback((enabled: boolean) => {
    setTuning((current) => ({ ...current, overshootClamping: enabled }));
  }, []);

  const resetTuning = useCallback(() => {
    setTuning(createDefaults());
  }, [createDefaults]);

  return {
    resetTuning,
    setNumericValue,
    setOvershootClamping,
    tuning,
  };
}
