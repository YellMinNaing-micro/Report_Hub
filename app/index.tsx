import React, { useState } from "react";
import { Alert, Text, TextInput, View } from "react-native";
import { Redirect, router } from "expo-router";
import { Heading } from "@gluestack-ui/themed";

import { ScreenShell } from "@/components/screen-shell";
import { ActionButton } from "@/components/action-button";
import { NeumorphCard } from "@/components/neumorph-card";
import { useAuth } from "@/lib/auth-context";
import { useTheme } from "@/lib/theme-context";

export default function LoginScreen() {
  const { isAuthenticated, login } = useAuth();
  const { colors } = useTheme();
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
        <NeumorphCard className="p-7">
          <View className="items-center">
            <View
              className="h-16 w-16 items-center justify-center rounded-2xl"
              style={{ backgroundColor: colors.primary }}
            >
              <Text className="text-2xl font-bold text-white">RH</Text>
            </View>

            <Heading size="xl" className="mt-5 text-center" style={{ color: colors.text }}>
              Report Hub Login
            </Heading>
            <Text className="mt-2 text-center text-sm leading-6" style={{ color: colors.textMuted }}>
              Sign in to manage images, create polished PDF reports, and keep your work organized.
            </Text>
          </View>

          <View className="mt-7 gap-4">
            <View>
              <Text className="mb-2 text-sm font-medium" style={{ color: colors.textMuted }}>
                Username
              </Text>
              <NeumorphCard inset className="rounded-[18px] px-4 py-1">
                <TextInput
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                  placeholder="Enter username"
                  placeholderTextColor={colors.textSubtle}
                  className="px-1 py-3"
                  style={{ color: colors.text }}
                />
              </NeumorphCard>
            </View>

            <View>
              <Text className="mb-2 text-sm font-medium" style={{ color: colors.textMuted }}>
                Password
              </Text>
              <NeumorphCard inset className="rounded-[18px] px-4 py-1">
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  placeholder="Enter password"
                  placeholderTextColor={colors.textSubtle}
                  className="px-1 py-3"
                  style={{ color: colors.text }}
                />
              </NeumorphCard>
            </View>

            <View className="pt-2">
              <ActionButton title="Log In" onPress={handleLogin} />
            </View>
          </View>
        </NeumorphCard>
      </View>
    </ScreenShell>
  );
}
