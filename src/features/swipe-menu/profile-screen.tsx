import { Image } from "expo-image";
import { ScrollView, StyleSheet, Text } from "react-native";

import { PROFILE } from "./constants";
import { useAppTheme } from "./hooks/use-app-theme";

export function ProfileScreen() {
  const { colors } = useAppTheme();

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      contentInsetAdjustmentBehavior="automatic"
      style={{ backgroundColor: colors.surfaceBackground }}
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
      <Text selectable style={[styles.username, { color: colors.muted }]}>
        {PROFILE.username}
      </Text>
      <Text selectable style={[styles.description, { color: colors.text }]}>
        {PROFILE.description}
      </Text>
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
  image: {
    borderRadius: 52,
    height: 104,
    marginBottom: 16,
    width: 104,
  },
  name: {
    fontSize: 24,
    fontWeight: "700",
    letterSpacing: -0.6,
  },
  username: {
    fontSize: 15,
    paddingTop: 4,
  },
  description: {
    fontSize: 16,
    lineHeight: 23,
    maxWidth: 320,
    paddingTop: 18,
    textAlign: "center",
  },
});
