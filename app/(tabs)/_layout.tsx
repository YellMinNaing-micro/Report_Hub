import React from "react";
import type { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { Redirect, Tabs } from "expo-router";
import { FileText, House, Settings2 } from "lucide-react-native/icons";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AnimatedTabIcon } from "@/components/animated-tab-icon";
import { RipplePressable } from "@/components/ripple-pressable";
import { useAuth } from "@/lib/auth-context";
import { useTheme } from "@/lib/theme-context";

type RippleTabButtonProps = Omit<BottomTabBarButtonProps, "ref"> & {
  rippleColor: string;
};

function RippleTabButton({ children, style, rippleColor, ...props }: RippleTabButtonProps) {
  return (
    <RipplePressable
      {...props}
      style={style}
      rippleColor={rippleColor}
    >
      {children}
    </RipplePressable>
  );
}

export default function TabLayout() {
  const { isAuthenticated } = useAuth();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const bottomOffset = Math.max(insets.bottom, Platform.OS === "android" ? 16 : 8);
  const tabBarHeight = 68;

  if (!isAuthenticated) {
    return <Redirect href="/" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: colors.background },
        tabBarActiveTintColor: colors.tabActive,
        tabBarInactiveTintColor: colors.tabInactiveText,
        tabBarShowLabel: false,
        tabBarButton: (props) => {
          const { ref: _ref, ...buttonProps } = props as BottomTabBarButtonProps & {
            ref?: unknown;
          };

          return <RippleTabButton {...buttonProps} rippleColor={colors.primarySoft} />;
        },
        tabBarStyle: {
          height: tabBarHeight,
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 6,
          paddingBottom: 6,
          left: 20,
          right: 20,
          bottom: bottomOffset,
          borderRadius: 20,
          backgroundColor: colors.tabBar,
          borderTopWidth: 0,
          position: "absolute",
          shadowColor: colors.shadow,
          shadowOpacity: 0.16,
          shadowOffset: { width: 0, height: 8 },
          shadowRadius: 20,
          elevation: 7,
        },
        tabBarItemStyle: {
          height: 56,
          justifyContent: "center",
          marginHorizontal: 3,
          borderRadius: 14,
          overflow: Platform.OS === "android" ? "hidden" : "visible",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ size, focused }) => (
            <AnimatedTabIcon
              focused={focused}
              label="Home"
              icon={
                <House
                  color={focused ? colors.primaryText : colors.tabInactiveText}
                  size={size}
                  strokeWidth={2.2}
                />
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ size, focused }) => (
            <AnimatedTabIcon
              focused={focused}
              label="History"
              icon={
                <FileText
                  color={focused ? colors.primaryText : colors.tabInactiveText}
                  size={size}
                  strokeWidth={2.2}
                />
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Settings",
          tabBarIcon: ({ size, focused }) => (
            <AnimatedTabIcon
              focused={focused}
              label="Settings"
              icon={
                <Settings2
                  color={focused ? colors.primaryText : colors.tabInactiveText}
                  size={size}
                  strokeWidth={2.2}
                />
              }
            />
          ),
        }}
      />
    </Tabs>
  );
}
