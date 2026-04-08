import React, { PropsWithChildren } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import { useTheme } from "@/lib/theme-context";

export function ScreenShell({ children }: PropsWithChildren) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView className="flex-1" edges={["top", "left", "right"]} style={{ backgroundColor: colors.background }}>
      <KeyboardAvoidingView
        className="flex-1"
        style={{ backgroundColor: colors.background }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          className="flex-1"
          style={{ backgroundColor: colors.background }}
          contentContainerClassName="flex-grow px-5 pt-4"
          contentContainerStyle={{ paddingBottom: Math.max(insets.bottom + 90, 108) }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="none"
        >
          <View
            className="absolute -left-12 top-10 h-44 w-44 rounded-full"
            style={{ backgroundColor: colors.bubblePrimary }}
          />
          <View
            className="absolute -right-16 top-52 h-52 w-52 rounded-full"
            style={{ backgroundColor: colors.bubbleSecondary }}
          />
          <View className="w-full max-w-2xl self-center">{children}</View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
