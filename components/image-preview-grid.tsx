import React from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import { SelectedImage } from "@/lib/image-selection-context";

type ImagePreviewGridProps = {
  images: SelectedImage[];
  onRemove: (id: string) => void;
};

export function ImagePreviewGrid({ images, onRemove }: ImagePreviewGridProps) {
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
            className="mt-1 rounded-md bg-black/70 px-2 py-1"
          >
            <Text className="text-center text-xs font-semibold text-white">
              Remove #{index + 1}
            </Text>
          </Pressable>
        </View>
      )}
      ListEmptyComponent={
        <View className="rounded-2xl border border-dashed border-slate-300 bg-white p-5">
          <Text className="text-center text-sm text-slate-500">
            No images selected yet. Add from gallery or camera.
          </Text>
        </View>
      }
    />
  );
}
