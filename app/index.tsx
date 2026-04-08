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
        <Box className="rounded-3xl bg-white p-6 shadow-sm">
          <Heading size="xl" className="text-center text-slate-900">
            Report Hub Login
          </Heading>
          <Text className="mt-2 text-center text-sm text-slate-600">
            Sign in to manage images and create PDF reports.
          </Text>

          <View className="mt-6 gap-4">
            <View>
              <Text className="mb-2 text-sm font-medium text-slate-700">Username</Text>
              <TextInput
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                placeholder="Enter username"
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900"
              />
            </View>

            <View>
              <Text className="mb-2 text-sm font-medium text-slate-700">Password</Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholder="Enter password"
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900"
              />
            </View>

            <ActionButton title="Log In" onPress={handleLogin} />
          </View>
        </Box>
      </View>
    </ScreenShell>
  );
}
