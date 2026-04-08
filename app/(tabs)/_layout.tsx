import React from "react";
import { Redirect, Tabs } from "expo-router";
import { House, Settings2 } from "lucide-react-native/icons";

import { AnimatedTabIcon } from "@/components/animated-tab-icon";
import { useAuth } from "@/lib/auth-context";
import { useTheme } from "@/lib/theme-context";

export default function TabLayout() {
  const { isAuthenticated } = useAuth();
  const { colors } = useTheme();

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
        tabBarStyle: {
          height: 86,
          paddingTop: 10,
          paddingBottom: 14,
          marginHorizontal: 14,
          marginBottom: 12,
          borderRadius: 26,
          backgroundColor: colors.tabBar,
          borderTopWidth: 0,
          position: "absolute",
          shadowColor: colors.shadow,
          shadowOpacity: 0.18,
          shadowOffset: { width: 0, height: 10 },
          shadowRadius: 24,
          elevation: 8,
        },
        tabBarItemStyle: {
          marginHorizontal: 6,
          marginVertical: 8,
          borderRadius: 18,
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
