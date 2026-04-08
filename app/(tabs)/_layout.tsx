import React from "react";
import { Redirect, Tabs } from "expo-router";
import { FileText, House, Settings2 } from "lucide-react-native/icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AnimatedTabIcon } from "@/components/animated-tab-icon";
import { useAuth } from "@/lib/auth-context";
import { useTheme } from "@/lib/theme-context";

export default function TabLayout() {
  const { isAuthenticated } = useAuth();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

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
          height: 62 + insets.bottom,
          paddingTop: 6,
          paddingBottom: Math.max(insets.bottom, 10),
          marginHorizontal: 18,
          marginBottom: Math.max(insets.bottom > 0 ? 6 : 10, 6),
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
