import React, { PropsWithChildren } from "react";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { SafeAreaProvider } from "react-native-safe-area-context";

export function AppGluestackProvider({ children }: PropsWithChildren) {
  return (
    <SafeAreaProvider>
      <GluestackUIProvider config={config}>{children}</GluestackUIProvider>
    </SafeAreaProvider>
  );
}
