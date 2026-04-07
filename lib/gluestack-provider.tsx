import React, { PropsWithChildren } from "react";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";

export function AppGluestackProvider({ children }: PropsWithChildren) {
  return <GluestackUIProvider config={config}>{children}</GluestackUIProvider>;
}
