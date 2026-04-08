import React from "react";
import { View } from "react-native";
import { Redirect, Tabs } from "expo-router";
import { House, UserRound } from "lucide-react-native/icons";

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
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "700",
        },
        tabBarStyle: {
          height: 68,
          paddingTop: 8,
          paddingBottom: 10,
          backgroundColor: "#ffffff",
          borderTopColor: "#e2e8f0",
        },
        tabBarItemStyle: {
          marginHorizontal: 8,
          marginVertical: 6,
          borderRadius: 18,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Report Hub",
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <View
              className={focused ? "rounded-full bg-blue-100 px-4 py-2" : "rounded-full px-4 py-2"}
            >
              <House color={color} size={size} strokeWidth={2.2} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size, focused }) => (
            <View
              className={focused ? "rounded-full bg-blue-100 px-4 py-2" : "rounded-full px-4 py-2"}
            >
              <UserRound color={color} size={size} strokeWidth={2.2} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
