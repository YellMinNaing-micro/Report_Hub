import React, { useMemo, useState } from "react";
import { Alert, Text, View } from "react-native";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import * as Sharing from "expo-sharing";
import { Box, Heading } from "@gluestack-ui/themed";
import Animated, { FadeInDown } from "react-native-reanimated";

import { ActionButton } from "@/components/action-button";
import { ImagePreviewGrid } from "@/components/image-preview-grid";
import { ScreenShell } from "@/components/screen-shell";
import { useImageSelection } from "@/lib/image-selection-context";
import { generatePdfFromImages } from "@/utils/pdf";

export default function HomeScreen() {
  const { images, addImages, clearImages, removeImage } = useImageSelection();
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfUri, setPdfUri] = useState<string | null>(null);

  const imageUris = useMemo(() => images.map((image) => image.uri), [images]);

  const pickFromGallery = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission Required", "Gallery permission is needed to pick images.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsMultipleSelection: true,
      selectionLimit: 0,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      addImages(result.assets.map((asset) => asset.uri), "gallery");
      setPdfUri(null);
    }
  };

  const generatePdf = async () => {
    if (!images.length) {
      Alert.alert("No Images", "Please add at least one image first.");
      return;
    }

    try {
      setIsGeneratingPdf(true);
      const newPdfUri = await generatePdfFromImages(imageUris);
      setPdfUri(newPdfUri);
      Alert.alert("PDF Ready", `Saved locally:\n${newPdfUri}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to create PDF.";
      Alert.alert("PDF Error", message);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const sharePdf = async () => {
    if (!pdfUri) {
      Alert.alert("No PDF", "Generate a PDF first.");
      return;
    }

    const canShare = await Sharing.isAvailableAsync();
    if (!canShare) {
      Alert.alert("Sharing Not Available", "Sharing is not available on this device.");
      return;
    }

    await Sharing.shareAsync(pdfUri, {
      mimeType: "application/pdf",
      dialogTitle: "Share report PDF",
      UTI: "com.adobe.pdf",
    });
  };

  return (
    <ScreenShell>
      <Animated.View entering={FadeInDown.duration(260)} className="gap-4">
        <Box className="rounded-3xl bg-white p-5 shadow-sm">
          <Heading size="lg" className="text-slate-900">
            Image To PDF Report
          </Heading>
          <Text className="mt-2 text-sm text-slate-600">
            Choose multiple gallery photos or capture one-by-one with camera, then generate one
            PDF file.
          </Text>
        </Box>

        <View className="gap-3">
          <ActionButton title="Pick Images From Gallery" onPress={pickFromGallery} />
          <ActionButton title="Open Camera And Capture" onPress={() => router.push("/camera")} />
        </View>

        <Box className="rounded-3xl bg-white p-4 shadow-sm">
          <Text className="mb-3 text-base font-semibold text-slate-900">
            Selected Images ({images.length})
          </Text>
          <ImagePreviewGrid images={images} onRemove={removeImage} />
        </Box>

        <View className="gap-3">
          <ActionButton
            title={isGeneratingPdf ? "Generating PDF..." : "Generate PDF"}
            onPress={generatePdf}
            disabled={!images.length}
            loading={isGeneratingPdf}
          />
          <ActionButton title="Share PDF" onPress={sharePdf} disabled={!pdfUri} />
          <ActionButton title="Clear All Images" onPress={clearImages} disabled={!images.length} />
        </View>

        {pdfUri ? (
          <View className="rounded-2xl border border-emerald-200 bg-emerald-50 p-3">
            <Text className="text-xs font-medium text-emerald-800">Saved PDF</Text>
            <Text selectable className="mt-1 text-xs text-emerald-700">
              {pdfUri}
            </Text>
          </View>
        ) : null}
      </Animated.View>
    </ScreenShell>
  );
}
