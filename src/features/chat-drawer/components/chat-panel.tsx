import { useState } from "react";
import { StyleSheet, View } from "react-native";

import { CHAT_COMPOSER_LAYOUT } from "../constants";
import type {
  AppColorScheme,
  Chat,
  ColorPalette,
  DrawerTuning,
  NumericDrawerTuningKey,
} from "../types";
import { ChatComposer } from "./chat-composer";
import { ChatContent } from "./chat-content";
import { ChatHeader } from "./chat-header";
import { GestureTuner } from "./gesture-tuner";

type ChatPanelProps = {
  chat?: Chat;
  colorScheme: AppColorScheme;
  colors: ColorPalette;
  drawerOpen: boolean;
  onCloseTuner: () => void;
  onComposerFocusChange: (focused: boolean) => void;
  onNumericTuningChange: (
    key: NumericDrawerTuningKey,
    value: number,
  ) => void;
  onOpenDrawer: () => void;
  onOvershootClampingChange: (enabled: boolean) => void;
  onResetTuning: () => void;
  onShareTuning: () => void;
  onToggleTuner: () => void;
  safeAreaBottom: number;
  safeAreaTop: number;
  tunerVisible: boolean;
  tuning: DrawerTuning;
};

export function ChatPanel({
  chat,
  colorScheme,
  colors,
  drawerOpen,
  onCloseTuner,
  onComposerFocusChange,
  onNumericTuningChange,
  onOpenDrawer,
  onOvershootClampingChange,
  onResetTuning,
  onShareTuning,
  onToggleTuner,
  safeAreaBottom,
  safeAreaTop,
  tunerVisible,
  tuning,
}: ChatPanelProps) {
  const [composerHeight, setComposerHeight] = useState<number>(
    CHAT_COMPOSER_LAYOUT.estimatedHeight,
  );
  const contentBottomPadding =
    composerHeight + safeAreaBottom + CHAT_COMPOSER_LAYOUT.contentBottomGap;

  return (
    <View
      accessibilityElementsHidden={drawerOpen}
      importantForAccessibility={drawerOpen ? "no-hide-descendants" : "auto"}
      style={styles.root}
    >
      <ChatHeader
        colors={colors}
        onOpenDrawer={onOpenDrawer}
        onToggleTuner={onToggleTuner}
        safeAreaTop={safeAreaTop}
        tunerVisible={tunerVisible}
      />

      {tunerVisible ? (
        <GestureTuner
          colorScheme={colorScheme}
          colors={colors}
          onClose={onCloseTuner}
          onNumericValueChange={onNumericTuningChange}
          onOvershootClampingChange={onOvershootClampingChange}
          onReset={onResetTuning}
          onShare={onShareTuning}
          tuning={tuning}
        />
      ) : (
        <>
          <ChatContent
            bottomPadding={contentBottomPadding}
            chat={chat}
            colors={colors}
          />
          <ChatComposer
            colors={colors}
            onFocusChange={onComposerFocusChange}
            onHeightChange={setComposerHeight}
            safeAreaBottom={safeAreaBottom}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
