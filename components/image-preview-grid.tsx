import React from "react";
import { FlatList, Image, Pressable, View } from "react-native";
import { ImageIcon, Trash2 } from "lucide-react-native";

import { AppText } from "@/components/themed-text";
import { SelectedImage } from "@/lib/image-selection-context";
import { useTheme } from "@/lib/theme-context";

type ImagePreviewGridProps = {
  images: SelectedImage[];
  onRemove: (id: string) => void;
};

export function ImagePreviewGrid({ images, onRemove }: ImagePreviewGridProps) {
  const { colors } = useTheme();

  return (
    <FlatList
      data={images}
      keyExtractor={(item) => item.id}
      numColumns={3}
      scrollEnabled={false}
      columnWrapperStyle={{ gap: 10 }}
      contentContainerStyle={{ gap: 10 }}
      renderItem={({ item, index }) => (
        <View
          className="flex-1 overflow-hidden rounded-[18px] border p-2"
          style={{ backgroundColor: colors.surface, borderColor: colors.border }}
        >
          <Image source={{ uri: item.uri }} className="h-24 w-full rounded-[14px] bg-slate-200" />
          <Pressable
            onPress={() => onRemove(item.id)}
            className="absolute right-3 top-3 h-7 w-7 items-center justify-center rounded-full"
            style={{ backgroundColor: colors.dangerSoft }}
          >
            <Trash2 color={colors.danger} size={14} strokeWidth={2.3} />
          </Pressable>
          <AppText className="pt-3 text-center text-xs" tone="subtle" weight="semibold">
            IMG_{index + 1}
          </AppText>
        </View>
      )}
      ListEmptyComponent={
        <View
          className="items-center rounded-[22px] border border-dashed px-5 py-8"
          style={{ borderColor: colors.borderStrong, backgroundColor: colors.background }}
        >
          <View
            className="mb-3 h-12 w-12 items-center justify-center rounded-2xl"
            style={{ backgroundColor: colors.surface }}
          >
            <ImageIcon color={colors.textSubtle} size={18} strokeWidth={2} />
          </View>
          <AppText className="text-center text-sm" tone="subtle">
            No images selected
          </AppText>
        </View>
      }
    />
  );
}
