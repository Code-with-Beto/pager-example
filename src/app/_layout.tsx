import { Stack } from "expo-router/stack";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { useAppTheme } from "@/features/swipe-menu/hooks/use-app-theme";

const ROOT_STYLE = { flex: 1 } as const;

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={ROOT_STYLE}>
      <RootNavigator />
    </GestureHandlerRootView>
  );
}

function RootNavigator() {
  const { colorScheme, colors } = useAppTheme();

  return (
    <>
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: colors.surfaceBackground },
          headerShadowVisible: false,
          headerStyle: { backgroundColor: colors.surfaceBackground },
          headerTintColor: colors.text,
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="profile"
          options={{
            headerBackButtonDisplayMode: "minimal",
            presentation: "modal",
            title: "Profile",
          }}
        />
      </Stack>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
    </>
  );
}
