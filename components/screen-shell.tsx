import React, { PropsWithChildren } from "react";
import { ScrollView, View } from "react-native";
import { useTheme } from "@/lib/theme-context";

export function ScreenShell({ children }: PropsWithChildren) {
  const { colors } = useTheme();

  return (
    <ScrollView
      className="flex-1"
      style={{ backgroundColor: colors.background }}
      contentContainerClassName="px-4 py-8"
    >
      <View
        className="absolute -left-10 top-6 h-32 w-32 rounded-full"
        style={{ backgroundColor: colors.bubblePrimary }}
      />
      <View
        className="absolute -right-10 top-40 h-36 w-36 rounded-full"
        style={{ backgroundColor: colors.bubbleSecondary }}
      />
      <View className="w-full max-w-2xl self-center">{children}</View>
    </ScrollView>
  );
}
