import React, { useEffect } from "react";
import { View } from "react-native";
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
  const { colors } = useTheme();
  const progress = useSharedValue(focused ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(focused ? 1 : 0, { duration: 220 });
  }, [focused, progress]);

  const containerStyle = useAnimatedStyle(() => ({
    backgroundColor: focused ? colors.tabActive : "transparent",
    opacity: interpolate(progress.value, [0, 1], [0.86, 1]),
  }));

  const labelStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ translateY: interpolate(progress.value, [0, 1], [-2, 0]) }],
  }));

  const labelContainerStyle = useAnimatedStyle(() => ({
    height: interpolate(progress.value, [0, 1], [0, 15]),
  }));

  return (
    <Animated.View
      style={containerStyle}
      className="h-14 min-w-[64px] items-center justify-center rounded-[14px] px-3 py-1"
    >
      <View>{icon}</View>
      <Animated.View style={labelContainerStyle} className="overflow-hidden">
        <Animated.Text
          style={[
            labelStyle,
            { color: focused ? colors.primaryText : colors.tabInactiveText },
          ]}
          className={focused ? "mt-0.5 text-[10px] font-bold" : "mt-0.5 text-[10px] font-semibold"}
          numberOfLines={1}
        >
          {label}
        </Animated.Text>
      </Animated.View>
    </Animated.View>
  );
}
