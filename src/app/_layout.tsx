import { Stack } from "expo-router/stack";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";

import {
  AppThemeProvider,
  useTheme,
} from "@/features/chat-drawer/providers/theme-provider";

const ROOT_STYLE = { flex: 1 } as const;

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={ROOT_STYLE}>
      <KeyboardProvider>
        <AppThemeProvider>
          <RootNavigator />
        </AppThemeProvider>
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
}

function RootNavigator() {
  const { colorScheme, colors } = useTheme();

  return (
    <>
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: colors.chatBackground },
          headerShadowVisible: false,
          headerStyle: { backgroundColor: colors.chatBackground },
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
