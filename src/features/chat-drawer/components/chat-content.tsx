import { ScrollView, StyleSheet, Text, View } from "react-native";

import { EMPTY_CHAT_SUGGESTIONS } from "../constants";
import type { Chat, ColorPalette } from "../types";

type ChatContentProps = {
  chat?: Chat;
  colors: ColorPalette;
};

export function ChatContent({ chat, colors }: ChatContentProps) {
  if (!chat) {
    return (
      <ScrollView
        contentContainerStyle={styles.emptyContent}
        contentInsetAdjustmentBehavior="never"
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.mark, { borderColor: colors.separator }]}>
          <Text style={[styles.markText, { color: colors.text }]}>✦</Text>
        </View>
        <Text selectable style={[styles.greeting, { color: colors.text }]}>
          How can I help?
        </Text>
        <View style={styles.suggestions}>
          {EMPTY_CHAT_SUGGESTIONS.map((suggestion) => (
            <View
              key={suggestion}
              style={[styles.suggestion, { borderColor: colors.separator }]}
            >
              <Text
                selectable
                style={[styles.suggestionText, { color: colors.text }]}
              >
                {suggestion}
              </Text>
              <Text style={{ color: colors.muted }}>↗</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.conversation}
      contentInsetAdjustmentBehavior="never"
      showsVerticalScrollIndicator={false}
    >
      <Text
        selectable
        style={[styles.conversationTitle, { color: colors.text }]}
      >
        {chat.title}
      </Text>
      <View
        style={[styles.userMessage, { backgroundColor: colors.userBubble }]}
      >
        <Text selectable style={[styles.messageText, { color: colors.text }]}>
          {chat.prompt}
        </Text>
      </View>
      <View style={styles.assistantMessage}>
        <View style={[styles.assistantMark, { borderColor: colors.separator }]}>
          <Text style={[styles.assistantMarkText, { color: colors.text }]}>✦</Text>
        </View>
        <Text selectable style={[styles.messageText, { color: colors.text }]}>
          {chat.response}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  emptyContent: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 22,
    paddingVertical: 32,
  },
  mark: {
    alignItems: "center",
    borderCurve: "continuous",
    borderRadius: 18,
    borderWidth: 1,
    height: 56,
    justifyContent: "center",
    width: 56,
  },
  markText: {
    fontSize: 26,
  },
  greeting: {
    fontSize: 26,
    fontWeight: "600",
    letterSpacing: -0.8,
    paddingTop: 18,
  },
  suggestions: {
    gap: 10,
    maxWidth: 460,
    paddingTop: 32,
    width: "100%",
  },
  suggestion: {
    alignItems: "center",
    borderCurve: "continuous",
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: 54,
    paddingHorizontal: 16,
  },
  suggestionText: {
    fontSize: 14,
    fontWeight: "500",
  },
  conversation: {
    gap: 24,
    marginHorizontal: "auto",
    maxWidth: 680,
    paddingHorizontal: 22,
    paddingVertical: 34,
    width: "100%",
  },
  conversationTitle: {
    fontSize: 23,
    fontWeight: "700",
    letterSpacing: -0.6,
    paddingBottom: 6,
  },
  userMessage: {
    alignSelf: "flex-end",
    borderCurve: "continuous",
    borderRadius: 20,
    maxWidth: "84%",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  assistantMessage: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: 12,
  },
  assistantMark: {
    alignItems: "center",
    borderCurve: "continuous",
    borderRadius: 10,
    borderWidth: 1,
    height: 32,
    justifyContent: "center",
    width: 32,
  },
  assistantMarkText: {
    fontSize: 15,
  },
  messageText: {
    flexShrink: 1,
    fontSize: 16,
    lineHeight: 24,
  },
});
