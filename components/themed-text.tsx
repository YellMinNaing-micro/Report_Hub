import React, { PropsWithChildren } from "react";
import { Text, TextProps } from "react-native";

import { useTheme } from "@/lib/theme-context";

type AppTextProps = PropsWithChildren<
  TextProps & {
    tone?: "default" | "muted" | "subtle" | "primary" | "success" | "danger";
    weight?: "medium" | "semibold" | "bold";
  }
>;

export function AppText({
  children,
  tone = "default",
  weight,
  className = "",
  style,
  ...props
}: AppTextProps) {
  const { colors } = useTheme();

  const color = {
    default: colors.text,
    muted: colors.textMuted,
    subtle: colors.textSubtle,
    primary: colors.primary,
    success: colors.success,
    danger: colors.danger,
  }[tone];

  const weightClassName =
    weight === "bold" ? "font-bold" : weight === "semibold" ? "font-semibold" : weight === "medium" ? "font-medium" : "";

  return (
    <Text
      className={`${weightClassName} ${className}`.trim()}
      style={[{ color }, style]}
      {...props}
    >
      {children}
    </Text>
  );
}
