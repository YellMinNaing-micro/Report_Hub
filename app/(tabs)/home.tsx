import React, { useMemo, useState } from "react";
import { Alert, TextInput, View } from "react-native";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import * as Sharing from "expo-sharing";
import { Camera, FileImage, FileText, Share2, UserRound } from "lucide-react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

import { ActionButton } from "@/components/action-button";
import { ImagePreviewGrid } from "@/components/image-preview-grid";
import { NeumorphCard } from "@/components/neumorph-card";
import { RipplePressable } from "@/components/ripple-pressable";
import { ScreenShell } from "@/components/screen-shell";
import { AppText } from "@/components/themed-text";
import { useImageSelection } from "@/lib/image-selection-context";
import { useTheme } from "@/lib/theme-context";
import { generatePdfFromImages, getPdfBaseName } from "@/utils/pdf";

const DEFAULT_PDF_FILE_NAME = "REPORT_V1";

export default function HomeScreen() {
  const { colors } = useTheme();
  const { images, addImages, clearImages, removeImage } = useImageSelection();
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfUri, setPdfUri] = useState<string | null>(null);
  const [pdfFileName, setPdfFileName] = useState(DEFAULT_PDF_FILE_NAME);

  const imageUris = useMemo(() => images.map((image) => image.uri), [images]);
  const hasImages = images.length > 0;
  const hasPdf = Boolean(pdfUri);

  const resetHomeState = () => {
    clearImages();
    setPdfUri(null);
    setPdfFileName(DEFAULT_PDF_FILE_NAME);
  };

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
    if (!hasImages) {
      Alert.alert("No Images", "Please add at least one image first.");
      return;
    }

    try {
      setIsGeneratingPdf(true);
      const newPdfUri = await generatePdfFromImages(imageUris, pdfFileName);
      setPdfUri(newPdfUri);
      setPdfFileName(getPdfBaseName(newPdfUri));
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

    try {
      await Sharing.shareAsync(pdfUri, {
        mimeType: "application/pdf",
        dialogTitle: "Share report PDF",
        UTI: "com.adobe.pdf",
      });

      resetHomeState();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to share PDF.";
      Alert.alert("Share Error", message);
    }
  };

  const handlePdfFileNameChange = (value: string) => {
    setPdfFileName(value);
    setPdfUri(null);
  };

  return (
    <ScreenShell>
      <Animated.View entering={FadeInDown.duration(260)} className="gap-5 pb-24">
        <View className="flex-row items-center justify-between">
          <View>
            <AppText className="text-xs uppercase tracking-[1.5px]" tone="primary" weight="semibold">
              Report Builder
            </AppText>
            <AppText className="mt-2 text-[34px] leading-9" weight="bold">
              Report Hub
            </AppText>
          </View>
          <RipplePressable
            onPress={() => router.push("/(tabs)/profile")}
            className="h-14 w-14 items-center justify-center rounded-full border"
            style={{ backgroundColor: colors.surface, borderColor: colors.border, overflow: "hidden" }}
          >
            <UserRound color={colors.textSubtle} size={22} strokeWidth={2.1} />
          </RipplePressable>
        </View>

        <NeumorphCard className="rounded-[28px] p-6">
          <View className="flex-row items-start justify-between gap-4">
            <View className="flex-1">
              <AppText className="text-[34px] leading-9" weight="bold">
                Image to PDF
              </AppText>
              <AppText className="mt-3 text-base leading-7" tone="muted">
                Combine your photos into a single professional PDF document.
              </AppText>
            </View>
            <View
              className="h-14 w-14 items-center justify-center rounded-2xl"
              style={{ backgroundColor: colors.primarySoft }}
            >
              <FileText color={colors.primary} size={24} strokeWidth={2.2} />
            </View>
          </View>
        </NeumorphCard>

        <View className="flex-row gap-4">
          <RipplePressable
            onPress={pickFromGallery}
            className="flex-1 rounded-[24px] border p-5"
            style={{ backgroundColor: colors.surface, borderColor: colors.borderStrong, overflow: "hidden" }}
          >
            <View
              className="h-12 w-12 items-center justify-center rounded-2xl"
              style={{ backgroundColor: colors.primarySoft }}
            >
              <FileImage color={colors.primary} size={22} strokeWidth={2.2} />
            </View>
            <AppText className="mt-8 text-base" weight="semibold">
              Gallery
            </AppText>
          </RipplePressable>

          <RipplePressable
            onPress={() => router.push("/camera")}
            className="flex-1 rounded-[24px] border p-5"
            style={{ backgroundColor: colors.surface, borderColor: colors.border, overflow: "hidden" }}
          >
            <View
              className="h-12 w-12 items-center justify-center rounded-2xl"
              style={{ backgroundColor: colors.successSoft }}
            >
              <Camera color={colors.success} size={22} strokeWidth={2.2} />
            </View>
            <AppText className="mt-8 text-base" weight="semibold">
              Camera
            </AppText>
          </RipplePressable>
        </View>

        <View>
          <View className="mb-3 flex-row items-center justify-between">
            <AppText className="text-xs uppercase tracking-[1.4px]" tone="subtle" weight="semibold">
              Selected Images ({images.length})
            </AppText>
            {hasImages ? (
              <RipplePressable onPress={clearImages} style={{ borderRadius: 999, overflow: "hidden" }}>
                <AppText className="text-xs uppercase tracking-[1.1px]" tone="danger" weight="bold">
                  Clear
                </AppText>
              </RipplePressable>
            ) : null}
          </View>

          <ImagePreviewGrid images={images} onRemove={removeImage} />
        </View>

        <NeumorphCard className="rounded-[22px] px-4 py-3">
          <View className="flex-row items-center gap-3">
            <View
              className="h-10 w-10 items-center justify-center rounded-xl"
              style={{ backgroundColor: colors.backgroundSecondary }}
            >
              <FileText color={colors.textSubtle} size={18} strokeWidth={2.1} />
            </View>
            <View className="flex-1">
              <AppText className="text-xs uppercase tracking-wide" tone="subtle" weight="semibold">
                File Name
              </AppText>
              <View className="flex-row items-center pt-1">
                <TextInput
                  value={pdfFileName}
                  onChangeText={handlePdfFileNameChange}
                  autoCapitalize="characters"
                  placeholder="REPORT_V1"
                  placeholderTextColor={colors.textSubtle}
                  className="flex-1 px-0 py-1 text-sm font-semibold"
                  style={{ color: colors.text }}
                />
                <AppText className="pl-2 text-sm" tone="muted" weight="medium">
                  .pdf
                </AppText>
              </View>
            </View>
          </View>
        </NeumorphCard>

        <ActionButton
          title={isGeneratingPdf ? "Generating PDF Report" : "Generate PDF Report"}
          onPress={generatePdf}
          disabled={!hasImages}
          loading={isGeneratingPdf}
          icon={<FileText color={colors.primaryText} size={18} strokeWidth={2.2} />}
        />

        {hasPdf ? (
          <NeumorphCard className="rounded-[24px] p-4" style={{ backgroundColor: colors.successSoft }}>
            <View className="flex-row items-center justify-between">
              <AppText className="text-xs" tone="success" weight="medium">
                Saved PDF
              </AppText>
              <NeumorphCard inset className="rounded-full px-3 py-1.5">
                <AppText className="text-xs" tone="success" weight="semibold">
                  Ready To Share
                </AppText>
              </NeumorphCard>
            </View>

            <View className="mt-3 gap-3">
              <ActionButton
                title="Share PDF"
                onPress={sharePdf}
                variant="outline"
                icon={<Share2 color={colors.textMuted} size={18} strokeWidth={2.2} />}
              />
            </View>

            <AppText selectable className="mt-3 text-xs" tone="success">
              {pdfUri}
            </AppText>
          </NeumorphCard>
        ) : null}
      </Animated.View>
    </ScreenShell>
  );
}
