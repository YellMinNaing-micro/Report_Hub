import "@/global.css";
import React from "react";
import { Stack } from "expo-router";

import { AppGluestackProvider } from "@/lib/gluestack-provider";
import { AuthProvider } from "@/lib/auth-context";
import { ImageSelectionProvider } from "@/lib/image-selection-context";
import { ThemeProvider, useTheme } from "@/lib/theme-context";

function AppNavigator() {
  const { colors, isDark } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerTitleAlign: "center",
        headerShadowVisible: false,
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
        headerTitleStyle: { color: colors.text },
        contentStyle: { backgroundColor: colors.background },
        statusBarStyle: isDark ? "light" : "dark",
      }}
    >
      <Stack.Screen name="index" options={{ title: "Login" }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="camera" options={{ title: "Capture Image" }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AppGluestackProvider>
      <ThemeProvider>
        <AuthProvider>
          <ImageSelectionProvider>
            <AppNavigator />
          </ImageSelectionProvider>
        </AuthProvider>
      </ThemeProvider>
    </AppGluestackProvider>
  );
}
