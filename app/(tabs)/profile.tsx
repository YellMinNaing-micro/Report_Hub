import React, { useState } from "react";
import { Pressable, Switch, View } from "react-native";
import { router } from "expo-router";
import { LogOut, UserRound } from "lucide-react-native/icons";
import Animated, { FadeInDown } from "react-native-reanimated";

import { NeumorphCard } from "@/components/neumorph-card";
import { ScreenShell } from "@/components/screen-shell";
import { AppText } from "@/components/themed-text";
import { useAuth } from "@/lib/auth-context";
import { useTheme } from "@/lib/theme-context";

function SettingsRow({
  label,
  value,
  trailing,
}: {
  label: string;
  value?: string;
  trailing?: React.ReactNode;
}) {
  return (
    <View className="flex-row items-center justify-between py-4">
      <AppText className="text-sm" weight="semibold">
        {label}
      </AppText>
      {trailing ?? (
        <AppText className="text-sm" tone="muted">
          {value}
        </AppText>
      )}
    </View>
  );
}

export default function ProfileScreen() {
  const { logout } = useAuth();
  const { colors, isDark, toggleTheme } = useTheme();
  const [isHighQualityEnabled, setIsHighQualityEnabled] = useState(true);

  const handleLogout = () => {
    logout();
    router.replace("/");
  };

  return (
    <ScreenShell>
      <Animated.View entering={FadeInDown.duration(260)} className="gap-5 pb-24">
        <View>
          <AppText className="text-xs uppercase tracking-[1.5px]" tone="primary" weight="semibold">
            App Config
          </AppText>
          <AppText className="mt-2 text-[34px] leading-9" weight="bold">
            Settings
          </AppText>
        </View>

        <View>
          <AppText className="mb-3 text-xs uppercase tracking-[1.4px]" tone="subtle" weight="semibold">
            General
          </AppText>
          <NeumorphCard className="rounded-[24px] px-4 py-1">
            <SettingsRow
              label="High Quality Images"
              trailing={
                <Switch
                  value={isHighQualityEnabled}
                  onValueChange={setIsHighQualityEnabled}
                  trackColor={{ false: colors.borderStrong, true: colors.primary }}
                  thumbColor="#ffffff"
                />
              }
            />
            <View style={{ height: 1, backgroundColor: colors.borderSoft }} />
            <SettingsRow
              label="Dark Mode"
              trailing={
                <Switch
                  value={isDark}
                  onValueChange={toggleTheme}
                  trackColor={{ false: colors.borderStrong, true: colors.primary }}
                  thumbColor="#ffffff"
                />
              }
            />
            <View style={{ height: 1, backgroundColor: colors.borderSoft }} />
            <SettingsRow label="Language" value="English" />
          </NeumorphCard>
        </View>

        <View>
          <AppText className="mb-3 text-xs uppercase tracking-[1.4px]" tone="subtle" weight="semibold">
            Account
          </AppText>
          <NeumorphCard className="rounded-[24px] p-4">
            <View className="flex-row items-center gap-3">
              <View
                className="h-12 w-12 items-center justify-center rounded-2xl"
                style={{ backgroundColor: colors.surfaceInset }}
              >
                <UserRound color={colors.textSubtle} size={20} strokeWidth={2.1} />
              </View>
              <View className="flex-1">
                <AppText className="text-sm" weight="semibold">
                  admin
                </AppText>
              </View>
            </View>
          </NeumorphCard>
        </View>

        <Pressable onPress={handleLogout}>
          <NeumorphCard className="rounded-[24px] p-4">
            <View className="flex-row items-center gap-3">
              <View
                className="h-12 w-12 items-center justify-center rounded-2xl"
                style={{ backgroundColor: colors.dangerSoft }}
              >
                <LogOut color={colors.danger} size={20} strokeWidth={2.2} />
              </View>
              <View className="flex-1">
                <AppText className="text-sm" weight="semibold">
                  Log Out
                </AppText>
                <AppText className="mt-1 text-xs" tone="muted">
                  End the current session and return to login.
                </AppText>
              </View>
            </View>
          </NeumorphCard>
        </Pressable>
      </Animated.View>
    </ScreenShell>
  );
}
