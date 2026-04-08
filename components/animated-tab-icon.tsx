import React, { useEffect } from "react";
import { Text } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type AnimatedTabIconProps = {
  icon: React.ReactNode;
  label: string;
  focused: boolean;
};

export function AnimatedTabIcon({ icon, label, focused }: AnimatedTabIconProps) {
  const progress = useSharedValue(focused ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(focused ? 1 : 0, { duration: 220 });
  }, [focused, progress]);

  const containerStyle = useAnimatedStyle(() => ({
    backgroundColor: `rgba(37, 99, 235, ${interpolate(progress.value, [0, 1], [0, 0.14])})`,
    transform: [
      { translateY: interpolate(progress.value, [0, 1], [0, -2]) },
      { scale: interpolate(progress.value, [0, 1], [1, 1.03]) },
    ],
  }));

  const labelStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 1], [0.72, 1]),
    transform: [{ translateX: interpolate(progress.value, [0, 1], [0, 2]) }],
  }));

  return (
    <Animated.View
      style={containerStyle}
      className="min-w-[108px] flex-row items-center justify-center gap-2 rounded-full px-4 py-3"
    >
      {icon}
      <Animated.View style={labelStyle}>
        <Text className={focused ? "text-sm font-bold text-blue-600" : "text-sm font-semibold text-slate-500"}>
          {label}
        </Text>
      </Animated.View>
    </Animated.View>
  );
}
