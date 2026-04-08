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
        sceneStyle: { backgroundColor: colors.background },
        tabBarActiveTintColor: colors.tabActive,
        tabBarInactiveTintColor: colors.tabInactiveText,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 84,
          paddingTop: 12,
          paddingBottom: 14,
          backgroundColor: colors.tabBar,
          borderTopColor: colors.border,
          borderTopWidth: 1,
        },
        tabBarItemStyle: {
          marginHorizontal: 6,
          marginVertical: 6,
          borderRadius: 22,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Report Hub",
          tabBarIcon: ({ color, size, focused }) => (
            <AnimatedTabIcon
              focused={focused}
              label="Home"
              icon={<House color={color} size={size} strokeWidth={2.2} />}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size, focused }) => (
            <AnimatedTabIcon
              focused={focused}
              label="Profile"
              icon={<UserRound color={color} size={size} strokeWidth={2.2} />}
            />
          ),
        }}
      />
    </Tabs>
  );
}
