import React, { useEffect } from "react";
import { Text } from "react-native";
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
    backgroundColor: focused ? colors.surface : "transparent",
    borderColor: focused ? colors.tabActive : colors.border,
    borderWidth: focused ? 1.5 : 1,
    shadowColor: colors.shadow,
    shadowOpacity: interpolate(progress.value, [0, 1], [0, isDark ? 0.18 : 0.12]),
    shadowRadius: interpolate(progress.value, [0, 1], [0, 12]),
    shadowOffset: { width: 0, height: 6 },
    transform: [
      { translateY: interpolate(progress.value, [0, 1], [0, -2]) },
      { scale: interpolate(progress.value, [0, 1], [1, 1.03]) },
    ],
  }));

  const labelStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 1], [0.85, 1]),
  }));

  return (
    <Animated.View
      style={containerStyle}
      className="min-w-[108px] items-center justify-center rounded-2xl px-3 py-2"
    >
      <Animated.View
        style={{
          marginBottom: 6,
          width: 28,
          height: 3,
          borderRadius: 999,
          backgroundColor: focused ? colors.tabActive : "transparent",
        }}
      />
      <Animated.View style={{ marginBottom: 4 }}>{icon}</Animated.View>
      <Animated.View style={labelStyle}>
        <Text
          className={focused ? "text-[11px] font-semibold" : "text-[11px] font-medium"}
          style={{ color: focused ? colors.tabActiveText : colors.tabInactiveText }}
        >
          {label}
        </Text>
      </Animated.View>
    </Animated.View>
  );
}
