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
    backgroundColor: `rgba(255, 255, 255, ${interpolate(progress.value, [0, 1], [0.55, 1])})`,
    transform: [
      { translateY: interpolate(progress.value, [0, 1], [0, -1]) },
      { scale: interpolate(progress.value, [0, 1], [1, 1.01]) },
    ],
  }));

  const labelStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 1], [0.85, 1]),
  }));

  return (
    <Animated.View
      style={containerStyle}
      className="min-w-[96px] items-center justify-center rounded-2xl px-3 py-2"
    >
      <Animated.View style={{ marginBottom: 4 }}>{icon}</Animated.View>
      <Animated.View style={labelStyle}>
        <Text
          className={focused ? "text-[11px] font-semibold text-slate-900" : "text-[11px] font-medium text-slate-500"}
        >
          {label}
        </Text>
      </Animated.View>
    </Animated.View>
  );
}
