import React, { PropsWithChildren } from "react";
import { ScrollView, View } from "react-native";

export function ScreenShell({ children }: PropsWithChildren) {
  return (
    <ScrollView className="flex-1 bg-[#eef2f7]" contentContainerClassName="px-4 py-8">
      <View className="absolute -left-10 top-6 h-32 w-32 rounded-full bg-white/45" />
      <View className="absolute -right-10 top-40 h-36 w-36 rounded-full bg-slate-200/45" />
      <View className="w-full max-w-2xl self-center">{children}</View>
    </ScrollView>
  );
}
