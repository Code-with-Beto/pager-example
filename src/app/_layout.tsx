import { Stack } from "expo-router/stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const ROOT_STYLE = { flex: 1 } as const;

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={ROOT_STYLE}>
      <Stack screenOptions={{ headerShown: false }} />
    </GestureHandlerRootView>
  );
}
