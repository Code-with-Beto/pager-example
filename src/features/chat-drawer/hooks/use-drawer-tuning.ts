import { useCallback, useState } from "react";

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
