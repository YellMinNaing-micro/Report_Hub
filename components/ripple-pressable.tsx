import React from "react";
import {
  Pressable,
  type PressableProps,
  type PressableStateCallbackType,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { useTheme } from "@/lib/theme-context";

type RipplePressableProps = Omit<PressableProps, "android_ripple" | "style"> & {
  rippleColor?: string;
  style?: StyleProp<ViewStyle> | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>);
};

export function RipplePressable({
  children,
  rippleColor,
  style,
  ...props
}: RipplePressableProps) {
  const { colors } = useTheme();

  return (
    <Pressable
      {...props}
      android_ripple={{
        color: rippleColor ?? colors.primarySoft,
        borderless: false,
      }}
      style={style}
    >
      {children}
    </Pressable>
  );
}
