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
  const bottomInset = Math.max(insets.bottom, Platform.OS === "android" ? 12 : 8);
  const tabBarHeight = 68 + bottomInset;

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
          paddingTop: 8,
          paddingBottom: bottomInset,
          left: 18,
          right: 18,
          bottom: Platform.OS === "android" ? 8 : 0,
          borderRadius: 22,
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
          marginHorizontal: 4,
          marginVertical: 4,
          borderRadius: 16,
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
