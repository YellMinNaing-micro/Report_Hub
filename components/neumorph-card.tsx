import React, { PropsWithChildren } from "react";
import { View, ViewStyle } from "react-native";

type NeumorphCardProps = PropsWithChildren<{
  className?: string;
  inset?: boolean;
  style?: ViewStyle;
}>;

export function NeumorphCard({
  children,
  className = "",
  inset = false,
  style,
}: NeumorphCardProps) {
  return (
    <View
      className={`rounded-[28px] border border-white/70 bg-[#e8edf3] ${className}`}
      style={[
        inset
          ? {
              shadowColor: "#ffffff",
              shadowOffset: { width: -6, height: -6 },
              shadowOpacity: 0.95,
              shadowRadius: 12,
              elevation: 2,
            }
          : {
              shadowColor: "#94a3b8",
              shadowOffset: { width: 10, height: 10 },
              shadowOpacity: 0.2,
              shadowRadius: 18,
              elevation: 8,
            },
        style,
      ]}
    >
      {children}
    </View>
  );
}
