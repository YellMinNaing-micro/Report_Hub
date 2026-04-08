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
              ? "border-rose-300 bg-[#e8edf3]"
              : "border-slate-300 bg-[#e8edf3]"
            : isNegative
              ? "border-rose-500 bg-rose-500"
              : "border-white/70 bg-[#e8edf3]"
        }`}
        style={{
          shadowColor: isOutline ? "#ffffff" : "#94a3b8",
          shadowOffset: isOutline ? { width: -4, height: -4 } : { width: 8, height: 8 },
          shadowOpacity: isOutline ? 0.85 : 0.2,
          shadowRadius: isOutline ? 10 : 14,
          elevation: isOutline ? 2 : 6,
        }}
      >
        {loading ? (
          <ActivityIndicator
            color={isNegative ? "#e11d48" : isOutline ? "#475569" : "#334155"}
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
                : "text-slate-800"
          }`}
        >
          {title}
        </Text>
      </View>
    </Pressable>
  );
}
