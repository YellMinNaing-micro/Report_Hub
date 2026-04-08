import React, { useEffect } from "react";
import { Text, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useTheme } from "@/lib/theme-context";

type AnimatedTabIconProps = {
  icon: React.ReactNode;
  label: string;
  focused: boolean;
};

export function AnimatedTabIcon({ icon, label, focused }: AnimatedTabIconProps) {
  const { colors, isDark } = useTheme();
  const progress = useSharedValue(focused ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(focused ? 1 : 0, { duration: 220 });
  }, [focused, progress]);

  const containerStyle = useAnimatedStyle(() => ({
    backgroundColor: focused ? colors.tabActive : colors.surface,
    borderColor: focused ? colors.tabActive : colors.border,
    borderWidth: 1,
    shadowColor: colors.shadow,
    shadowOpacity: interpolate(progress.value, [0, 1], [0.02, isDark ? 0.3 : 0.16]),
    shadowRadius: interpolate(progress.value, [0, 1], [6, 14]),
    shadowOffset: { width: 0, height: 8 },
    transform: [
      { translateY: interpolate(progress.value, [0, 1], [0, -3]) },
      { scale: interpolate(progress.value, [0, 1], [1, 1.04]) },
    ],
  }));

  const iconWrapStyle = useAnimatedStyle(() => ({
    backgroundColor: focused
      ? isDark
        ? "rgba(15, 23, 42, 0.22)"
        : "rgba(255,255,255,0.24)"
      : "transparent",
    transform: [{ scale: interpolate(progress.value, [0, 1], [1, 1.08]) }],
  }));

  const labelStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 1], [0.82, 1]),
    transform: [{ translateY: interpolate(progress.value, [0, 1], [0, -1]) }],
  }));

  return (
    <Animated.View
      style={containerStyle}
      className="min-w-[112px] flex-row items-center justify-center gap-2 rounded-[20px] px-3 py-3"
    >
      <Animated.View style={iconWrapStyle} className="rounded-full p-2">
        <View>{icon}</View>
      </Animated.View>
      <Animated.View style={labelStyle}>
        <Text
          className={focused ? "text-xs font-bold" : "text-xs font-semibold"}
          style={{ color: focused ? colors.primaryText : colors.tabInactiveText }}
        >
          {label}
        </Text>
      </Animated.View>
    </Animated.View>
  );
}
