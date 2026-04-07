import React, { PropsWithChildren } from "react";
import { ScrollView, View } from "react-native";

export function ScreenShell({ children }: PropsWithChildren) {
  return (
    <ScrollView className="flex-1 bg-slate-50" contentContainerClassName="px-4 py-8">
      <View className="w-full max-w-2xl self-center">{children}</View>
    </ScrollView>
  );
}
