import React from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

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
        className={`min-h-14 flex-row items-center justify-center rounded-full border px-6 py-4 ${
          isOutline
            ? isNegative
              ? "border-rose-300 bg-white"
              : "border-slate-200 bg-white"
            : isNegative
              ? "border-rose-500 bg-rose-500"
              : "border-blue-600 bg-blue-600"
        }`}
        style={{
          shadowColor: "#64748b",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: isOutline ? 0.05 : 0.16,
          shadowRadius: 16,
          elevation: isOutline ? 1 : 4,
        }}
      >
        {loading ? (
          <ActivityIndicator
            color={isNegative ? "#e11d48" : isOutline ? "#475569" : "#ffffff"}
            style={{ marginRight: 8 }}
          />
        ) : null}
        <Text
          className={`text-base font-semibold ${
            isOutline
              ? isNegative
                ? "text-rose-600"
                : "text-slate-700"
              : isNegative
                ? "text-white"
                : "text-white"
          }`}
        >
          {title}
        </Text>
      </View>
    </Pressable>
  );
}
