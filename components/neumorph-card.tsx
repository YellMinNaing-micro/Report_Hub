import React, { PropsWithChildren } from "react";
import { View, ViewStyle } from "react-native";
import { useTheme } from "@/lib/theme-context";

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
  const { colors, isDark } = useTheme();

  return (
    <View
      className={`rounded-[24px] border ${className}`}
      style={[
        inset
          ? {
              backgroundColor: colors.surfaceInset,
              borderColor: colors.border,
              shadowColor: colors.shadowSoft,
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: isDark ? 0.08 : 0.18,
              shadowRadius: 4,
              elevation: 1,
            }
          : {
              backgroundColor: colors.surface,
              borderColor: colors.borderSoft,
              shadowColor: colors.shadow,
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: isDark ? 0.25 : 0.08,
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
