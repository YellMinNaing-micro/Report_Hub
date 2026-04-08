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
    backgroundColor: focused ? colors.tabActive : "transparent",
    shadowColor: colors.shadow,
    shadowOpacity: interpolate(progress.value, [0, 1], [0, isDark ? 0.24 : 0.12]),
    shadowRadius: interpolate(progress.value, [0, 1], [0, 16]),
    shadowOffset: { width: 0, height: 10 },
    transform: [
      { translateY: interpolate(progress.value, [0, 1], [0, -2]) },
      { scale: interpolate(progress.value, [0, 1], [1, 1.03]) },
    ],
  }));

  const labelStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 1], [0.68, 1]),
    transform: [{ translateY: interpolate(progress.value, [0, 1], [0, 1]) }],
  }));

  return (
    <Animated.View
      style={containerStyle}
      className="min-w-[92px] items-center justify-center rounded-[18px] px-4 py-3"
    >
      <View>{icon}</View>
      <Animated.View style={labelStyle}>
        <Text
          className={focused ? "mt-1 text-[11px] font-bold" : "mt-1 text-[11px] font-semibold"}
          style={{ color: focused ? colors.primaryText : colors.tabInactiveText }}
        >
          {label}
        </Text>
      </Animated.View>
    </Animated.View>
  );
}
