import React, { useCallback, useState } from "react";
import { Pressable, View } from "react-native";
import { useFocusEffect } from "expo-router";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system/legacy";
import { FileText, Share2 } from "lucide-react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

import { NeumorphCard } from "@/components/neumorph-card";
import { ScreenShell } from "@/components/screen-shell";
import { AppText } from "@/components/themed-text";
import { useTheme } from "@/lib/theme-context";

type PdfHistoryItem = {
  name: string;
  uri: string;
  sizeLabel: string;
  dateLabel: string;
  modifiedAt: number;
};

const formatFileSize = (sizeInBytes: number) => {
  if (sizeInBytes < 1024 * 1024) {
    return `${Math.max(sizeInBytes / 1024, 0.1).toFixed(1)} KB`;
  }

  return `${(sizeInBytes / (1024 * 1024)).toFixed(1)} MB`;
};

const formatModifiedDate = (timestamp: number) => {
  const modifiedDate = new Date(timestamp);
  const now = new Date();
  const diffInDays = Math.floor((now.getTime() - modifiedDate.getTime()) / (1000 * 60 * 60 * 24));

  if (diffInDays <= 0) {
    return "Today";
  }

  if (diffInDays === 1) {
    return "Yesterday";
  }

  return `${diffInDays} days ago`;
};

export default function HistoryScreen() {
  const { colors } = useTheme();
  const [items, setItems] = useState<PdfHistoryItem[]>([]);

  const loadHistory = useCallback(async () => {
    if (!FileSystem.documentDirectory) {
      setItems([]);
      return;
    }

    const entries = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);
    const pdfEntries = entries.filter((entry) => entry.toLowerCase().endsWith(".pdf"));

    const nextItems = await Promise.all(
      pdfEntries.map(async (entry) => {
        const uri = `${FileSystem.documentDirectory}${entry}`;
        const info = await FileSystem.getInfoAsync(uri);
        const sizeInBytes = info.exists && "size" in info && typeof info.size === "number" ? info.size : 0;
        const modifiedAt =
          info.exists && "modificationTime" in info && typeof info.modificationTime === "number"
            ? info.modificationTime * 1000
            : 0;

        return {
          name: entry.toUpperCase(),
          uri,
          sizeLabel: formatFileSize(sizeInBytes),
          dateLabel: formatModifiedDate(modifiedAt || Date.now()),
          modifiedAt,
        };
      }),
    );

    setItems(nextItems.sort((a, b) => b.modifiedAt - a.modifiedAt));
  }, []);

  useFocusEffect(
    useCallback(() => {
      void loadHistory();
    }, [loadHistory]),
  );

  const sharePdf = async (uri: string) => {
    const canShare = await Sharing.isAvailableAsync();
    if (!canShare) {
      return;
    }

    await Sharing.shareAsync(uri, {
      mimeType: "application/pdf",
      dialogTitle: "Share report PDF",
      UTI: "com.adobe.pdf",
    });
  };

  return (
    <ScreenShell>
      <Animated.View entering={FadeInDown.duration(260)} className="gap-5 pb-24">
        <View>
          <AppText className="text-xs uppercase tracking-[1.5px]" tone="primary" weight="semibold">
            Archive
          </AppText>
          <AppText className="mt-2 text-[34px] leading-9" weight="bold">
            History
          </AppText>
        </View>

        {items.length ? (
          <View className="gap-3">
            {items.map((item) => (
              <NeumorphCard key={item.uri} className="rounded-[22px] px-4 py-4">
                <View className="flex-row items-center gap-3">
                  <View
                    className="h-14 w-14 items-center justify-center rounded-2xl"
                    style={{ backgroundColor: colors.dangerSoft }}
                  >
                    <FileText color={colors.danger} size={22} strokeWidth={2.1} />
                  </View>

                  <View className="flex-1">
                    <AppText className="text-sm" weight="bold">
                      {item.name}
                    </AppText>
                    <AppText className="mt-1 text-xs" tone="muted">
                      {item.dateLabel} - {item.sizeLabel}
                    </AppText>
                  </View>

                  <Pressable
                    onPress={() => void sharePdf(item.uri)}
                    className="h-10 w-10 items-center justify-center rounded-full"
                    style={{ backgroundColor: colors.surfaceInset }}
                  >
                    <Share2 color={colors.textSubtle} size={17} strokeWidth={2.1} />
                  </Pressable>
                </View>
              </NeumorphCard>
            ))}
          </View>
        ) : (
          <NeumorphCard className="rounded-[24px] px-5 py-10">
            <View className="items-center">
              <View
                className="h-14 w-14 items-center justify-center rounded-2xl"
                style={{ backgroundColor: colors.surfaceInset }}
              >
                <FileText color={colors.textSubtle} size={20} strokeWidth={2} />
              </View>
              <AppText className="mt-4 text-base" weight="semibold">
                No PDF history yet
              </AppText>
              <AppText className="mt-2 text-center text-sm leading-6" tone="muted">
                Generated PDF files will appear here after you create them.
              </AppText>
            </View>
          </NeumorphCard>
        )}
      </Animated.View>
    </ScreenShell>
  );
}
