import "@/global.css";
import React from "react";
import { Stack } from "expo-router";

import { AppGluestackProvider } from "@/lib/gluestack-provider";
import { AuthProvider } from "@/lib/auth-context";
import { ImageSelectionProvider } from "@/lib/image-selection-context";

export default function RootLayout() {
  return (
    <AppGluestackProvider>
      <AuthProvider>
        <ImageSelectionProvider>
          <Stack
            screenOptions={{
              headerTitleAlign: "center",
              headerShadowVisible: false,
              headerStyle: { backgroundColor: "#f8fafc" },
              contentStyle: { backgroundColor: "#f8fafc" },
            }}
          >
            <Stack.Screen name="index" options={{ title: "Login" }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="camera" options={{ title: "Capture Image" }} />
          </Stack>
        </ImageSelectionProvider>
      </AuthProvider>
    </AppGluestackProvider>
  );
}
