import React from "react";
import { Redirect, Tabs } from "expo-router";
import { House, UserRound } from "lucide-react-native/icons";

import { AnimatedTabIcon } from "@/components/animated-tab-icon";
import { useAuth } from "@/lib/auth-context";

export default function TabLayout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href="/" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerTitleAlign: "center",
        headerShadowVisible: false,
        headerStyle: { backgroundColor: "#f8fafc" },
        sceneStyle: { backgroundColor: "#f8fafc" },
        tabBarActiveTintColor: "#2563eb",
        tabBarInactiveTintColor: "#64748b",
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 78,
          paddingTop: 10,
          paddingBottom: 14,
          backgroundColor: "#ffffff",
          borderTopColor: "#e2e8f0",
          borderTopWidth: 1,
        },
        tabBarItemStyle: {
          marginHorizontal: 6,
          marginVertical: 6,
          borderRadius: 24,
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
              label=""
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
              label=""
              icon={<UserRound color={color} size={size} strokeWidth={2.2} />}
            />
          ),
        }}
      />
    </Tabs>
  );
}
