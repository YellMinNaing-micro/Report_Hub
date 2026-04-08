import React from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

import { useTheme } from "@/lib/theme-context";

type ActionButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: "solid" | "outline";
  action?: "primary" | "secondary" | "negative";
  icon?: React.ReactNode;
};

export function ActionButton({
  title,
  onPress,
  disabled = false,
  loading = false,
  variant = "solid",
  action,
  icon,
}: ActionButtonProps) {
  const { colors, isDark } = useTheme();
  const resolvedAction = action ?? (variant === "solid" ? "primary" : "secondary");
  const isNegative = resolvedAction === "negative";
  const isOutline = variant === "outline";

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      className="overflow-hidden rounded-[20px]"
      style={({ pressed }) => ({
        opacity: disabled || loading ? 0.55 : 1,
        transform: [{ scale: pressed ? 0.988 : 1 }],
      })}
    >
      <View
        className="min-h-14 flex-row items-center justify-center rounded-[20px] border px-6 py-4"
        style={{
          backgroundColor: isOutline ? colors.surfaceInset : isNegative ? colors.danger : colors.primary,
          borderColor: isOutline ? (isNegative ? colors.danger : colors.borderSoft) : isNegative ? colors.danger : colors.primary,
          shadowColor: colors.shadow,
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: isOutline ? (isDark ? 0.1 : 0.06) : isDark ? 0.28 : 0.16,
          shadowRadius: isOutline ? 10 : 18,
          elevation: isOutline ? 1 : 5,
        }}
      >
        {loading ? (
          <ActivityIndicator
            color={isNegative ? (isOutline ? colors.danger : "#ffffff") : isOutline ? colors.textMuted : colors.primaryText}
            style={{ marginRight: 8 }}
          />
        ) : icon ? (
          <View style={{ marginRight: 8 }}>{icon}</View>
        ) : null}
        <Text
          className="text-base font-semibold"
          style={{
            color: isOutline ? (isNegative ? colors.danger : colors.textMuted) : colors.primaryText,
          }}
        >
          {title}
        </Text>
      </View>
    </Pressable>
  );
}
