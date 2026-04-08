import React from "react";
import { Redirect, Tabs } from "expo-router";
import { House, UserRound } from "lucide-react-native/icons";

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
        headerTitleAlign: "center",
        headerShadowVisible: false,
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
        headerTitleStyle: { color: colors.text },
        sceneStyle: { backgroundColor: colors.background },
        tabBarActiveTintColor: colors.tabActive,
        tabBarInactiveTintColor: colors.tabInactiveText,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 78,
          paddingTop: 10,
          paddingBottom: 12,
          backgroundColor: colors.tabBar,
          borderTopColor: colors.border,
          borderTopWidth: 1,
        },
        tabBarItemStyle: {
          marginHorizontal: 10,
          marginVertical: 6,
          borderRadius: 18,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Report Hub",
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
          title: "Profile",
          tabBarIcon: ({ size, focused }) => (
            <AnimatedTabIcon
              focused={focused}
              label="Profile"
              icon={
                <UserRound
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
