import React from "react";
import { Pressable, View } from "react-native";
import { router } from "expo-router";
import { ChevronLeft, LogOut, MoonStar, Settings2, SunMedium } from "lucide-react-native/icons";
import Animated, { FadeInDown } from "react-native-reanimated";

import { ActionButton } from "@/components/action-button";
import { NeumorphCard } from "@/components/neumorph-card";
import { ScreenShell } from "@/components/screen-shell";
import { AppText } from "@/components/themed-text";
import { useAuth } from "@/lib/auth-context";
import { useTheme } from "@/lib/theme-context";

export default function ProfileScreen() {
  const { logout } = useAuth();
  const { colors, isDark, toggleTheme } = useTheme();

  const handleLogout = () => {
    logout();
    router.replace("/");
  };

  return (
    <ScreenShell>
      <Animated.View entering={FadeInDown.duration(260)} className="gap-5 pb-24">
        <View className="flex-row items-center justify-between">
          <Pressable
            onPress={() => router.back()}
            className="h-12 w-12 items-center justify-center rounded-full border"
            style={{ backgroundColor: colors.surface, borderColor: colors.border }}
          >
            <ChevronLeft color={colors.text} size={22} strokeWidth={2.1} />
          </Pressable>
          <AppText className="text-[32px] leading-9" weight="bold">
            Settings
          </AppText>
          <View className="w-12" />
        </View>

        <NeumorphCard className="rounded-[28px] p-6">
          <View className="flex-row items-center gap-3">
            <NeumorphCard
              inset
              className="h-14 w-14 items-center justify-center rounded-2xl"
              style={{ backgroundColor: colors.primarySoft }}
            >
              <Settings2 color={colors.primary} size={24} strokeWidth={2.2} />
            </NeumorphCard>
            <View className="flex-1">
              <AppText className="text-xs uppercase tracking-wide" tone="primary" weight="semibold">
                Session
              </AppText>
              <AppText className="mt-1 text-2xl" weight="bold">
                Admin
              </AppText>
            </View>
          </View>

          <NeumorphCard inset className="mt-5 rounded-[22px] p-4">
            <AppText className="text-xs uppercase tracking-wide" tone="subtle" weight="semibold">
              Account Access
            </AppText>
            <AppText className="mt-2 text-sm leading-6" tone="muted">
              Manage your local Report Hub session here. You can switch theme appearance or sign
              out whenever needed.
            </AppText>
          </NeumorphCard>
        </NeumorphCard>

        <NeumorphCard className="rounded-[24px] p-5">
          <View className="flex-row items-center gap-3">
            <NeumorphCard
              inset
              className="h-12 w-12 items-center justify-center rounded-2xl"
              style={{ backgroundColor: colors.primarySoft }}
            >
              {isDark ? (
                <MoonStar color={colors.primary} size={20} strokeWidth={2.2} />
              ) : (
                <SunMedium color={colors.primary} size={20} strokeWidth={2.2} />
              )}
            </NeumorphCard>
            <View className="flex-1">
              <AppText className="text-base" weight="semibold">
                Theme
              </AppText>
              <AppText className="mt-1 text-sm" tone="muted">
                Switch between dark and light theme styles.
              </AppText>
            </View>
          </View>

          <View className="mt-5">
            <ActionButton
              title={isDark ? "Switch To Light Theme" : "Switch To Dark Theme"}
              onPress={toggleTheme}
              variant="outline"
            />
          </View>
        </NeumorphCard>

        <NeumorphCard className="rounded-[24px] p-5">
          <View className="flex-row items-center gap-3">
            <NeumorphCard
              inset
              className="h-12 w-12 items-center justify-center rounded-2xl"
              style={{ backgroundColor: colors.dangerSoft }}
            >
              <LogOut color={colors.danger} size={20} strokeWidth={2.2} />
            </NeumorphCard>
            <View className="flex-1">
              <AppText className="text-base" weight="semibold">
                End Session
              </AppText>
              <AppText className="mt-1 text-sm" tone="muted">
                Sign out and return to the login screen.
              </AppText>
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
