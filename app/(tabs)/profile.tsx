import React from "react";
import { Text, View } from "react-native";
import { router } from "expo-router";
import { Box, Heading } from "@gluestack-ui/themed";
import LogOut from "lucide-react-native/dist/esm/icons/log-out";
import ShieldCheck from "lucide-react-native/dist/esm/icons/shield-check";
import UserRound from "lucide-react-native/dist/esm/icons/user-round";

import { ActionButton } from "@/components/action-button";
import { ScreenShell } from "@/components/screen-shell";
import { useAuth } from "@/lib/auth-context";

export default function ProfileScreen() {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.replace("/");
  };

  return (
    <ScreenShell>
      <View className="gap-4">
        <Box className="items-center rounded-[32px] bg-slate-900 px-6 py-8 shadow-sm">
          <View className="h-24 w-24 items-center justify-center rounded-full bg-white/10">
            <UserRound color="#f8fafc" size={44} strokeWidth={2.2} />
          </View>
          <Heading size="xl" className="mt-4 text-white">
            Admin Profile
          </Heading>
          <Text className="mt-2 text-center text-sm text-slate-300">
            Manage your Report Hub session and keep access under the default admin account.
          </Text>
        </Box>

        <Box className="rounded-[28px] bg-white p-5 shadow-sm">
          <View className="flex-row items-center gap-3">
            <View className="h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
              <ShieldCheck color="#047857" size={22} strokeWidth={2.2} />
            </View>
            <View className="flex-1">
              <Text className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Signed In As
              </Text>
              <Text className="mt-1 text-lg font-semibold text-slate-900">admin</Text>
            </View>
          </View>

          <View className="mt-5 rounded-3xl bg-slate-50 p-4">
            <Text className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Account Access
            </Text>
            <Text className="mt-2 text-sm leading-6 text-slate-600">
              This profile uses the default local credentials for the app. Use the logout button
              below whenever you want to lock the session and return to the login screen.
            </Text>
          </View>
        </Box>

        <Box className="rounded-[28px] bg-white p-5 shadow-sm">
          <View className="flex-row items-center gap-3">
            <View className="h-11 w-11 items-center justify-center rounded-full bg-rose-100">
              <LogOut color="#be123c" size={20} strokeWidth={2.2} />
            </View>
            <View className="flex-1">
              <Text className="text-base font-semibold text-slate-900">End Session</Text>
              <Text className="mt-1 text-sm text-slate-600">
                Sign out and go back to the login page.
              </Text>
            </View>
          </View>

          <View className="mt-5">
            <ActionButton title="Log Out" onPress={handleLogout} />
          </View>
        </Box>
      </View>
    </ScreenShell>
  );
}
