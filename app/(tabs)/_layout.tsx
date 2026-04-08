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
        headerStyle: { backgroundColor: "#eef2f7" },
        sceneStyle: { backgroundColor: "#eef2f7" },
        tabBarActiveTintColor: "#0f172a",
        tabBarInactiveTintColor: "#64748b",
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 74,
          paddingTop: 10,
          paddingBottom: 10,
          backgroundColor: "#eef2f7",
          borderTopColor: "#dde5ee",
          borderTopWidth: 0,
        },
        tabBarItemStyle: {
          marginHorizontal: 8,
          marginVertical: 4,
          borderRadius: 20,
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
