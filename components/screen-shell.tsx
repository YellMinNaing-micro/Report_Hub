import React, { PropsWithChildren } from "react";
import { ScrollView, View } from "react-native";

export function ScreenShell({ children }: PropsWithChildren) {
  return (
    <ScrollView className="flex-1 bg-[#e8edf3]" contentContainerClassName="px-4 py-8">
      <View className="absolute -left-12 top-8 h-36 w-36 rounded-full bg-white/70" />
      <View className="absolute -right-10 top-44 h-40 w-40 rounded-full bg-slate-200/80" />
      <View className="absolute bottom-16 left-8 h-28 w-28 rounded-full bg-white/40" />
      <View className="w-full max-w-2xl self-center">{children}</View>
    </ScrollView>
  );
}
