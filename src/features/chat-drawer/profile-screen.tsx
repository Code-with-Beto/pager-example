import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { PROFILE } from "./constants";
import { useTheme } from "./providers/theme-provider";

export function ProfileScreen() {
  const router = useRouter();
  const { colors } = useTheme();

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      contentInsetAdjustmentBehavior="automatic"
      style={{ backgroundColor: colors.chatBackground }}
    >
      <View
        style={[
          styles.card,
          {
            backgroundColor: colors.composer,
            borderColor: colors.separator,
          },
        ]}
      >
        <Image
          contentFit="cover"
          source={{ uri: PROFILE.imageUrl }}
          style={styles.image}
          transition={180}
        />
        <Text selectable style={[styles.name, { color: colors.text }]}>
          {PROFILE.name}
        </Text>
        <Text selectable style={[styles.handle, { color: colors.muted }]}>
          {PROFILE.handle}
        </Text>
        <Text selectable style={[styles.bio, { color: colors.text }]}>
          {PROFILE.bio}
        </Text>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.back()}
          style={({ pressed }) => [
            styles.closeButton,
            {
              backgroundColor: colors.modalButton,
              opacity: pressed ? 0.6 : 1,
            },
          ]}
        >
          <Text style={[styles.closeLabel, { color: colors.text }]}>Close</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },
  card: {
    alignItems: "center",
    borderCurve: "continuous",
    borderRadius: 28,
    borderWidth: 1,
    boxShadow: "0 12px 40px rgba(0, 0, 0, 0.14)",
    gap: 7,
    maxWidth: 360,
    padding: 24,
    width: "100%",
  },
  image: {
    borderRadius: 48,
    height: 96,
    marginBottom: 8,
    width: 96,
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    letterSpacing: -0.5,
  },
  handle: {
    fontSize: 14,
  },
  bio: {
    fontSize: 15,
    lineHeight: 21,
    paddingHorizontal: 8,
    paddingVertical: 12,
    textAlign: "center",
  },
  closeButton: {
    alignItems: "center",
    alignSelf: "stretch",
    borderCurve: "continuous",
    borderRadius: 18,
    justifyContent: "center",
    minHeight: 44,
  },
  closeLabel: {
    fontSize: 15,
    fontWeight: "600",
  },
});
