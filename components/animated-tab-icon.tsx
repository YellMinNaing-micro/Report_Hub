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
    borderColor: focused ? colors.tabActive : "transparent",
    borderWidth: 1,
    shadowColor: colors.shadow,
    shadowOpacity: interpolate(progress.value, [0, 1], [0, isDark ? 0.22 : 0.12]),
    shadowRadius: interpolate(progress.value, [0, 1], [0, 12]),
    shadowOffset: { width: 0, height: 8 },
    transform: [
      { translateY: interpolate(progress.value, [0, 1], [0, -2]) },
      { scale: interpolate(progress.value, [0, 1], [1, 1.02]) },
    ],
  }));

  const labelStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 1], [0.72, 1]),
    transform: [{ translateX: interpolate(progress.value, [0, 1], [0, 1]) }],
  }));

  return (
    <Animated.View
      style={containerStyle}
      className="min-w-[112px] flex-row items-center justify-center gap-2 rounded-full px-4 py-3"
    >
      <View>{icon}</View>
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
