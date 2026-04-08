import React from "react";
import { Text, View } from "react-native";
import { router } from "expo-router";
import { Heading } from "@gluestack-ui/themed";
import { LogOut, ShieldCheck, UserRound } from "lucide-react-native/icons";
import Animated, { FadeInDown } from "react-native-reanimated";

import { ActionButton } from "@/components/action-button";
import { NeumorphCard } from "@/components/neumorph-card";
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
      <Animated.View entering={FadeInDown.duration(260)} className="gap-4">
        <NeumorphCard className="items-center px-6 py-8">
          <NeumorphCard inset className="h-24 w-24 items-center justify-center rounded-full">
            <UserRound color="#334155" size={44} strokeWidth={2.2} />
          </NeumorphCard>
          <Heading size="xl" className="mt-4 text-slate-900">
            Admin Profile
          </Heading>
          <Text className="mt-2 text-center text-sm text-slate-600">
            Manage your Report Hub session and keep access under the default admin account.
          </Text>
        </NeumorphCard>

        <NeumorphCard className="p-5">
          <View className="flex-row items-center gap-3">
            <NeumorphCard
              inset
              className="h-12 w-12 items-center justify-center rounded-full bg-[#e6f2ea]"
            >
              <ShieldCheck color="#047857" size={22} strokeWidth={2.2} />
            </NeumorphCard>
            <View className="flex-1">
              <Text className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Signed In As
              </Text>
              <Text className="mt-1 text-lg font-semibold text-slate-900">admin</Text>
            </View>
          </View>

          <NeumorphCard inset className="mt-5 p-4">
            <Text className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Account Access
            </Text>
            <Text className="mt-2 text-sm leading-6 text-slate-600">
              This profile uses the default local credentials for the app. Use the logout button
              below whenever you want to lock the session and return to the login screen.
            </Text>
          </NeumorphCard>
        </NeumorphCard>

        <NeumorphCard className="p-5">
          <View className="flex-row items-center gap-3">
            <NeumorphCard
              inset
              className="h-11 w-11 items-center justify-center rounded-full bg-[#f7e7eb]"
            >
              <LogOut color="#be123c" size={20} strokeWidth={2.2} />
            </NeumorphCard>
            <View className="flex-1">
              <Text className="text-base font-semibold text-slate-900">End Session</Text>
              <Text className="mt-1 text-sm text-slate-600">
                Sign out and go back to the login page.
              </Text>
            </View>
          </View>

          <View className="mt-5">
            <ActionButton
              title="Log Out"
              onPress={handleLogout}
              variant="outline"
              action="negative"
            />
          </View>
        </NeumorphCard>
      </Animated.View>
    </ScreenShell>
  );
}
