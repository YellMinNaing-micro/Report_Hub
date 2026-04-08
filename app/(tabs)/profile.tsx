import React from "react";
import { View } from "react-native";
import { router } from "expo-router";
import { Heading } from "@gluestack-ui/themed";
import { LogOut, ShieldCheck, UserRound } from "lucide-react-native/icons";
import Animated, { FadeInDown } from "react-native-reanimated";

import { ActionButton } from "@/components/action-button";
import { NeumorphCard } from "@/components/neumorph-card";
import { ScreenShell } from "@/components/screen-shell";
import { AppText } from "@/components/themed-text";
import { useAuth } from "@/lib/auth-context";
import { useTheme } from "@/lib/theme-context";
import { MoonStar, SunMedium } from "lucide-react-native/icons";

export default function ProfileScreen() {
  const { logout } = useAuth();
  const { colors, isDark, toggleTheme } = useTheme();

  const handleLogout = () => {
    logout();
    router.replace("/");
  };

  return (
    <ScreenShell>
      <Animated.View entering={FadeInDown.duration(260)} className="gap-4">
        <NeumorphCard className="items-center px-6 py-8">
          <View
            className="h-20 w-20 items-center justify-center rounded-2xl"
            style={{ backgroundColor: colors.primary }}
          >
            <UserRound color="#ffffff" size={44} strokeWidth={2.2} />
          </View>
          <Heading size="xl" className="mt-4" style={{ color: colors.text }}>
            Admin Profile
          </Heading>
          <AppText className="mt-2 text-center text-sm leading-6" tone="muted">
            Manage your Report Hub session and keep access under the default admin account.
          </AppText>
        </NeumorphCard>

        <NeumorphCard className="p-5">
          <View className="flex-row items-center gap-3">
            <NeumorphCard
              inset
              className="h-12 w-12 items-center justify-center rounded-2xl"
              style={{ backgroundColor: colors.successSoft }}
            >
              <ShieldCheck color={colors.success} size={22} strokeWidth={2.2} />
            </NeumorphCard>
            <View className="flex-1">
              <AppText className="text-xs uppercase tracking-wide" tone="subtle" weight="semibold">
                Signed In As
              </AppText>
              <AppText className="mt-1 text-lg" weight="semibold">admin</AppText>
            </View>
          </View>

          <NeumorphCard inset className="mt-5 p-4">
            <AppText className="text-xs uppercase tracking-wide" tone="subtle" weight="semibold">
              Account Access
            </AppText>
            <AppText className="mt-2 text-sm leading-6" tone="muted">
              This profile uses the default local credentials for the app. Use the logout button
              below whenever you want to lock the session and return to the login screen.
            </AppText>
          </NeumorphCard>
        </NeumorphCard>

        <NeumorphCard className="p-5">
          <View className="flex-row items-center gap-3">
            <NeumorphCard inset className="h-11 w-11 items-center justify-center rounded-2xl">
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
                Switch between light and dark appearance.
              </AppText>
            </View>
          </View>

          <View className="mt-5">
            <ActionButton
              title={isDark ? "Switch To Light Mode" : "Switch To Dark Mode"}
              onPress={toggleTheme}
              variant="outline"
            />
          </View>
        </NeumorphCard>

        <NeumorphCard className="p-5">
          <View className="flex-row items-center gap-3">
            <NeumorphCard
              inset
              className="h-11 w-11 items-center justify-center rounded-2xl"
              style={{ backgroundColor: colors.dangerSoft }}
            >
              <LogOut color={colors.danger} size={20} strokeWidth={2.2} />
            </NeumorphCard>
            <View className="flex-1">
              <AppText className="text-base" weight="semibold">End Session</AppText>
              <AppText className="mt-1 text-sm" tone="muted">
                Sign out and go back to the login page.
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
