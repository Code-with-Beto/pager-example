import { useRef, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  type TextInput as TextInputType,
  View,
} from "react-native";
import { KeyboardStickyView } from "react-native-keyboard-controller";

import { CHAT_COMPOSER_LAYOUT } from "../constants";
import type { ColorPalette } from "../types";

type ChatComposerProps = {
  colors: ColorPalette;
  onFocusChange: (focused: boolean) => void;
  onHeightChange: (height: number) => void;
  safeAreaBottom: number;
};

export function ChatComposer({
  colors,
  onFocusChange,
  onHeightChange,
  safeAreaBottom,
}: ChatComposerProps) {
  const inputRef = useRef<TextInputType>(null);
  const [message, setMessage] = useState("");
  const hasMessage = message.trim().length > 0;
  const openedKeyboardOffset =
    process.env.EXPO_OS === "android"
      ? safeAreaBottom + CHAT_COMPOSER_LAYOUT.keyboardGap
      : Math.max(safeAreaBottom - CHAT_COMPOSER_LAYOUT.keyboardGap, 0);

  function handleSend() {
    if (!hasMessage) {
      return;
    }

    setMessage("");
    inputRef.current?.focus();
  }

  return (
    <KeyboardStickyView
      offset={{ closed: 0, opened: openedKeyboardOffset }}
      onLayout={(event) => onHeightChange(event.nativeEvent.layout.height)}
      style={[styles.sticky, { bottom: safeAreaBottom }]}
    >
      <View
        style={[
          styles.area,
          {
            backgroundColor: colors.chatBackground,
            paddingBottom:
              safeAreaBottom === 0
                ? CHAT_COMPOSER_LAYOUT.minimumBottomPadding
                : 0,
          },
        ]}
      >
        <View
          style={[
            styles.composer,
            {
              backgroundColor: colors.composer,
              borderColor: colors.separator,
            },
          ]}
        >
          <Pressable
            accessibilityLabel="Add attachment"
            accessibilityRole="button"
            hitSlop={8}
            onPress={() => inputRef.current?.focus()}
            style={({ pressed }) => [
              styles.addButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={[styles.plusGlyph, { color: colors.text }]}>＋</Text>
          </Pressable>
          <TextInput
            ref={inputRef}
            accessibilityLabel="Message"
            multiline
            onBlur={() => onFocusChange(false)}
            onChangeText={setMessage}
            onFocus={() => onFocusChange(true)}
            placeholder="Message"
            placeholderTextColor={colors.muted}
            selectionColor={colors.accent}
            style={[styles.input, { color: colors.text }]}
            value={message}
          />
          <Pressable
            accessibilityLabel="Send message"
            accessibilityRole="button"
            accessibilityState={{ disabled: !hasMessage }}
            disabled={!hasMessage}
            onPress={handleSend}
            style={({ pressed }) => [
              styles.sendButton,
              {
                backgroundColor: hasMessage ? colors.text : colors.muted,
                opacity: pressed ? 0.58 : hasMessage ? 1 : 0.35,
              },
            ]}
          >
            <Text
              style={[styles.sendGlyph, { color: colors.chatBackground }]}
            >
              ↑
            </Text>
          </Pressable>
        </View>
        <Text selectable style={[styles.gestureHint, { color: colors.muted }]}>
          Swipe right anywhere to open · swipe left to close
        </Text>
      </View>
    </KeyboardStickyView>
  );
}

const styles = StyleSheet.create({
  sticky: {
    left: 0,
    position: "absolute",
    right: 0,
    zIndex: 3,
  },
  area: {
    gap: 8,
    paddingHorizontal: CHAT_COMPOSER_LAYOUT.horizontalPadding,
    paddingTop: 8,
  },
  composer: {
    alignItems: "flex-end",
    alignSelf: "center",
    borderCurve: "continuous",
    borderRadius: 24,
    borderWidth: 1,
    flexDirection: "row",
    gap: 6,
    maxWidth: 680,
    minHeight: 52,
    paddingHorizontal: 8,
    width: "100%",
  },
  addButton: {
    alignItems: "center",
    height: 50,
    justifyContent: "center",
    width: 32,
  },
  pressed: {
    opacity: 0.5,
  },
  plusGlyph: {
    fontSize: 25,
    fontWeight: "300",
  },
  input: {
    flex: 1,
    fontSize: 16,
    lineHeight: 22,
    maxHeight: 120,
    minHeight: 50,
    paddingBottom: 14,
    paddingTop: 14,
  },
  sendButton: {
    alignItems: "center",
    borderRadius: 18,
    height: 34,
    justifyContent: "center",
    marginBottom: 8,
    width: 34,
  },
  sendGlyph: {
    fontSize: 19,
    fontWeight: "700",
  },
  gestureHint: {
    fontSize: 10,
    textAlign: "center",
  },
});
