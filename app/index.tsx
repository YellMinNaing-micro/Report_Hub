import React, { useState } from "react";
import { Alert, Text, TextInput, View } from "react-native";
import { Redirect, router } from "expo-router";
import { Box, Heading } from "@gluestack-ui/themed";

import { ScreenShell } from "@/components/screen-shell";
import { ActionButton } from "@/components/action-button";
import { useAuth } from "@/lib/auth-context";

export default function LoginScreen() {
  const { isAuthenticated, login } = useAuth();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("Password@123");

  if (isAuthenticated) {
    return <Redirect href="/(tabs)/home" />;
  }

  const handleLogin = () => {
    const isValid = login(username, password);

    if (!isValid) {
      Alert.alert("Login Failed", "Use username admin and password Password@123.");
      return;
    }

    router.replace("/(tabs)/home");
  };

  return (
    <ScreenShell>
      <View className="min-h-full justify-center py-10">
        <View className="absolute left-0 top-10 h-36 w-36 rounded-full bg-white/70" />
        <View className="absolute -right-6 top-40 h-40 w-40 rounded-full bg-slate-200/90" />
        <View className="absolute bottom-16 left-6 h-28 w-28 rounded-full bg-slate-300/50" />

        <Box
          className="rounded-[34px] border border-[#f8fafc] bg-[#e8edf3] p-7"
          style={{
            shadowColor: "#94a3b8",
            shadowOffset: { width: 10, height: 10 },
            shadowOpacity: 0.25,
            shadowRadius: 20,
            elevation: 10,
          }}
        >
          <View
            className="rounded-[28px] border border-white/80 bg-[#e8edf3] p-6"
            style={{
              shadowColor: "#ffffff",
              shadowOffset: { width: -8, height: -8 },
              shadowOpacity: 0.9,
              shadowRadius: 16,
            }}
          >
            <View className="items-center">
              <View
                className="h-20 w-20 items-center justify-center rounded-full bg-[#e8edf3]"
                style={{
                  shadowColor: "#94a3b8",
                  shadowOffset: { width: 8, height: 8 },
                  shadowOpacity: 0.2,
                  shadowRadius: 12,
                }}
              >
                <Text className="text-2xl font-bold text-slate-700">RH</Text>
              </View>

              <Heading size="xl" className="mt-5 text-center text-slate-900">
                Report Hub Login
              </Heading>
              <Text className="mt-2 text-center text-sm leading-6 text-slate-600">
                Sign in to manage images, create polished PDF reports, and keep your work organized.
              </Text>
            </View>

            <View className="mt-7 gap-4">
              <View>
                <Text className="mb-2 text-sm font-medium text-slate-700">Username</Text>
                <TextInput
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                  placeholder="Enter username"
                  placeholderTextColor="#94a3b8"
                  className="rounded-[22px] border border-white/70 bg-[#eef2f6] px-4 py-4 text-slate-900"
                  style={{
                    shadowColor: "#ffffff",
                    shadowOffset: { width: -4, height: -4 },
                    shadowOpacity: 0.9,
                    shadowRadius: 8,
                  }}
                />
              </View>

              <View>
                <Text className="mb-2 text-sm font-medium text-slate-700">Password</Text>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  placeholder="Enter password"
                  placeholderTextColor="#94a3b8"
                  className="rounded-[22px] border border-white/70 bg-[#eef2f6] px-4 py-4 text-slate-900"
                  style={{
                    shadowColor: "#ffffff",
                    shadowOffset: { width: -4, height: -4 },
                    shadowOpacity: 0.9,
                    shadowRadius: 8,
                  }}
                />
              </View>

              <View className="pt-2">
                <ActionButton title="Log In" onPress={handleLogin} />
              </View>
            </View>
          </View>
        </Box>
      </View>
    </ScreenShell>
  );
}
