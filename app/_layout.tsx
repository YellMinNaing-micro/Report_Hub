import "@/global.css";
import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { AppGluestackProvider } from "@/lib/gluestack-provider";
import { AuthProvider } from "@/lib/auth-context";
import { ImageSelectionProvider } from "@/lib/image-selection-context";
import { ThemeProvider, useTheme } from "@/lib/theme-context";

function AppNavigator() {
  const { colors, isDark } = useTheme();

  return (
    <>
      <StatusBar style={isDark ? "light" : "dark"} backgroundColor={colors.background} />
      <Stack
        screenOptions={{
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerTitleStyle: { color: colors.text },
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="camera" options={{ title: "Capture Image" }} />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AppGluestackProvider>
        <ThemeProvider>
          <AuthProvider>
            <ImageSelectionProvider>
              <AppNavigator />
            </ImageSelectionProvider>
          </AuthProvider>
        </ThemeProvider>
      </AppGluestackProvider>
    </SafeAreaProvider>
  );
}
