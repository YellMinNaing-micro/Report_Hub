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
};

export function ActionButton({
  title,
  onPress,
  disabled = false,
  loading = false,
  variant = "solid",
  action,
}: ActionButtonProps) {
  const { colors, isDark } = useTheme();
  const resolvedAction = action ?? (variant === "solid" ? "primary" : "secondary");
  const isNegative = resolvedAction === "negative";
  const isOutline = variant === "outline";

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      className="overflow-hidden rounded-full"
      style={({ pressed }) => ({
        opacity: disabled || loading ? 0.55 : 1,
        transform: [{ scale: pressed ? 0.985 : 1 }],
      })}
    >
      <View
        className="min-h-14 flex-row items-center justify-center rounded-full border px-6 py-4"
        style={{
          backgroundColor: isOutline ? colors.surfaceInset : isNegative ? colors.danger : colors.primary,
          borderColor: isOutline ? (isNegative ? colors.danger : colors.border) : isNegative ? colors.danger : colors.primary,
          shadowColor: colors.shadow,
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: isOutline ? (isDark ? 0.12 : 0.05) : isDark ? 0.22 : 0.16,
          shadowRadius: 16,
          elevation: isOutline ? 1 : 4,
        }}
      >
        {loading ? (
          <ActivityIndicator
            color={isNegative ? (isOutline ? colors.danger : "#ffffff") : isOutline ? colors.textMuted : colors.primaryText}
            style={{ marginRight: 8 }}
          />
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
