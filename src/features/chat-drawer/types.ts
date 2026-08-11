export type AppColorScheme = "dark" | "light";

export type ThemePreference = "system" | AppColorScheme;

export type Chat = {
  id: string;
  prompt: string;
  response: string;
  title: string;
};

export type ColorPalette = {
  accent: string;
  accentText: string;
  appBackground: string;
  chatBackground: string;
  composer: string;
  menuBackground: string;
  menuSelected: string;
  modalButton: string;
  muted: string;
  separator: string;
  surfaceBorder: string;
  text: string;
  userBubble: string;
};

export type DrawerEndState = {
  currentPosition: number;
  drawerWidth: number;
  translationX: number;
  velocityX: number;
};

export type DrawerTuning = {
  activationDistance: number;
  directionalTranslationThreshold: number;
  drawerWidthRatio: number;
  menuFadeEndProgress: number;
  menuMinimumOpacity: number;
  menuMinimumScale: number;
  menuTranslateY: number;
  overshootClamping: boolean;
  positionThreshold: number;
  scrimMaximumOpacity: number;
  springDamping: number;
  springMass: number;
  springStiffness: number;
  surfaceCornerRadius: number;
  surfaceShadowBlurRadius: number;
  surfaceShadowOffsetX: number;
  surfaceShadowOpacity: number;
  velocityProjection: number;
  velocityThreshold: number;
  verticalTolerance: number;
};

export type NumericDrawerTuningKey = {
  [Key in keyof DrawerTuning]: DrawerTuning[Key] extends number ? Key : never;
}[keyof DrawerTuning];

export type TuningValueFormat = "decimal" | "integer" | "percent";

export type TuningSliderDefinition = {
  description: string;
  format: TuningValueFormat;
  key: NumericDrawerTuningKey;
  label: string;
  maximumValue: number;
  minimumValue: number;
  step: number;
};

export type TuningSection = {
  controls: readonly TuningSliderDefinition[];
  title: string;
};
