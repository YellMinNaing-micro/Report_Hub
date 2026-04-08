import React from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import { SelectedImage } from "@/lib/image-selection-context";
import { useTheme } from "@/lib/theme-context";

type ImagePreviewGridProps = {
  images: SelectedImage[];
  onRemove: (id: string) => void;
};

export function ImagePreviewGrid({ images, onRemove }: ImagePreviewGridProps) {
  const { colors, isDark } = useTheme();

  return (
    <FlatList
      data={images}
      keyExtractor={(item) => item.id}
      numColumns={3}
      scrollEnabled={false}
      columnWrapperStyle={{ gap: 8 }}
      contentContainerStyle={{ gap: 8 }}
      renderItem={({ item, index }) => (
        <View className="flex-1">
          <Image source={{ uri: item.uri }} className="h-28 w-full rounded-xl bg-slate-200" />
          <Pressable
            onPress={() => onRemove(item.id)}
            className="mt-1 rounded-md px-2 py-1"
            style={{ backgroundColor: isDark ? "rgba(15, 23, 42, 0.78)" : "rgba(15, 23, 42, 0.72)" }}
          >
            <Text className="text-center text-xs font-semibold text-white">
              Remove #{index + 1}
            </Text>
          </Pressable>
        </View>
      )}
      ListEmptyComponent={
        <View
          className="rounded-2xl border border-dashed p-5"
          style={{ borderColor: colors.border, backgroundColor: colors.surfaceInset }}
        >
          <Text className="text-center text-sm" style={{ color: colors.textSubtle }}>
            No images selected yet. Add from gallery or camera.
          </Text>
        </View>
      }
    />
  );
}
