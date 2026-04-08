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
      className={`rounded-[24px] border bg-[#f3f6fa] ${className}`}
      style={[
        inset
          ? {
              borderColor: "#e2e8f0",
              shadowColor: "#ffffff",
              shadowOffset: { width: -2, height: -2 },
              shadowOpacity: 0.45,
              shadowRadius: 6,
              elevation: 1,
            }
          : {
              borderColor: "#f8fafc",
              shadowColor: "#64748b",
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 0.08,
              shadowRadius: 20,
              elevation: 3,
            },
        style,
      ]}
    >
      {children}
    </View>
  );
}
