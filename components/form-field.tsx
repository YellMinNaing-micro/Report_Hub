import React from "react";
import { TextInput, TextInputProps, View } from "react-native";

import { useTheme } from "@/lib/theme-context";
import { NeumorphCard } from "@/components/neumorph-card";
import { AppText } from "@/components/themed-text";

type FormFieldProps = TextInputProps & {
  label: string;
  suffix?: string;
};

export function FormField({ label, suffix, className = "", style, ...props }: FormFieldProps) {
  const { colors } = useTheme();

  return (
    <View>
      <AppText className="mb-2 text-sm" tone="muted" weight="medium">
        {label}
      </AppText>
      <NeumorphCard inset className="rounded-[18px] px-4 py-1">
        <View className="flex-row items-center">
          <TextInput
            placeholderTextColor={colors.textSubtle}
            className={`flex-1 px-1 py-3 ${className}`.trim()}
            style={[{ color: colors.text }, style]}
            {...props}
          />
          {suffix ? (
            <AppText className="pl-2 text-sm" tone="muted" weight="medium">
              {suffix}
            </AppText>
          ) : null}
        </View>
      </NeumorphCard>
    </View>
  );
}
