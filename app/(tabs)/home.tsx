import React, { useMemo, useState } from "react";
import { Alert, View } from "react-native";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import * as Sharing from "expo-sharing";
import { Heading } from "@gluestack-ui/themed";
import { FileText } from "lucide-react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

import { ActionButton } from "@/components/action-button";
import { FormField } from "@/components/form-field";
import { ImagePreviewGrid } from "@/components/image-preview-grid";
import { NeumorphCard } from "@/components/neumorph-card";
import { ScreenShell } from "@/components/screen-shell";
import { AppText } from "@/components/themed-text";
import { useImageSelection } from "@/lib/image-selection-context";
import { useTheme } from "@/lib/theme-context";
import { generatePdfFromImages, getPdfBaseName, getPdfFileName, renamePdfFile } from "@/utils/pdf";

export default function HomeScreen() {
  const { colors } = useTheme();
  const { images, addImages, clearImages, removeImage } = useImageSelection();
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [isRenamingPdf, setIsRenamingPdf] = useState(false);
  const [pdfUri, setPdfUri] = useState<string | null>(null);
  const [pdfFileName, setPdfFileName] = useState("");

  const imageUris = useMemo(() => images.map((image) => image.uri), [images]);
  const hasImages = images.length > 0;
  const hasPdf = Boolean(pdfUri);

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
      setPdfFileName("");
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

    await Sharing.shareAsync(pdfUri, {
      mimeType: "application/pdf",
      dialogTitle: "Share report PDF",
      UTI: "com.adobe.pdf",
    });
  };

  const handleRenamePdf = async () => {
    if (!pdfUri) {
      Alert.alert("No PDF", "Generate a PDF first.");
      return;
    }

    try {
      setIsRenamingPdf(true);
      const renamedPdfUri = await renamePdfFile(pdfUri, pdfFileName);
      setPdfUri(renamedPdfUri);
      setPdfFileName(getPdfBaseName(renamedPdfUri));
      Alert.alert("PDF Renamed", `Saved as:\n${getPdfFileName(renamedPdfUri)}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to rename PDF.";
      Alert.alert("Rename Error", message);
    } finally {
      setIsRenamingPdf(false);
    }
  };

  return (
    <ScreenShell>
      <Animated.View entering={FadeInDown.duration(260)} className="gap-4">
        <NeumorphCard className="p-5">
          <View className="flex-row items-start justify-between gap-4">
            <View className="flex-1">
              <AppText className="text-xs uppercase tracking-[1.4px]" tone="primary" weight="semibold">
                Report Builder
              </AppText>
              <Heading size="lg" className="mt-2" style={{ color: colors.text }}>
                Image To PDF Report
              </Heading>
              <AppText className="mt-2 text-sm leading-6" tone="muted">
                Choose photos, organize them, and generate a clean PDF report in seconds.
              </AppText>
            </View>
            <NeumorphCard
              inset
              className="h-14 w-14 items-center justify-center rounded-2xl"
              style={{ backgroundColor: colors.primary }}
            >
              <FileText color={colors.primaryText} size={24} strokeWidth={2.2} />
            </NeumorphCard>
          </View>

          <View className="mt-5 flex-row gap-3">
            <NeumorphCard inset className="flex-1 rounded-[20px] px-4 py-3">
              <AppText className="text-xs uppercase tracking-wide" tone="subtle" weight="semibold">
                Images
              </AppText>
              <AppText className="mt-1 text-lg" weight="semibold">
                {images.length}
              </AppText>
            </NeumorphCard>
            <NeumorphCard inset className="flex-1 rounded-[20px] px-4 py-3">
              <AppText className="text-xs uppercase tracking-wide" tone="subtle" weight="semibold">
                PDF
              </AppText>
              <AppText className="mt-1 text-lg" weight="semibold">
                {hasPdf ? "Ready" : "Not Yet"}
              </AppText>
            </NeumorphCard>
          </View>
        </NeumorphCard>

        <NeumorphCard className="p-4">
          <AppText className="text-base" weight="semibold">
            Add Images
          </AppText>
          <AppText className="mt-1 text-sm leading-6" tone="muted">
            Import from gallery or capture new photos directly from the camera.
          </AppText>

          <View className="mt-4 gap-3">
            <ActionButton title="Pick Images From Gallery" onPress={pickFromGallery} variant="outline" />
            <ActionButton title="Open Camera And Capture" onPress={() => router.push("/camera")} variant="outline" />
          </View>
        </NeumorphCard>

        <NeumorphCard className="p-4">
          <View className="mb-3 flex-row items-center justify-between">
            <AppText className="text-base" weight="semibold">
              Selected Images
            </AppText>
            <NeumorphCard inset className="rounded-full px-3 py-1.5">
              <AppText className="text-xs" tone="subtle" weight="semibold">
                {images.length} total
              </AppText>
            </NeumorphCard>
          </View>
          <ImagePreviewGrid images={images} onRemove={removeImage} />

          {hasImages ? (
            <View className="mt-4">
              <ActionButton
                title="Clear All Images"
                onPress={clearImages}
                variant="outline"
                action="negative"
              />
            </View>
          ) : null}
        </NeumorphCard>

        <NeumorphCard className="p-4">
          <AppText className="text-base" weight="semibold">
            Build PDF
          </AppText>
          <AppText className="mt-1 text-sm leading-6" tone="muted">
            Generate a PDF after selecting the images you want in the report.
          </AppText>

          <View className="mt-4">
            <ActionButton
              title={isGeneratingPdf ? "Generating PDF..." : "Generate PDF"}
              onPress={generatePdf}
              disabled={!hasImages}
              loading={isGeneratingPdf}
            />
          </View>
        </NeumorphCard>

        {hasPdf ? (
          <NeumorphCard className="p-3" style={{ backgroundColor: colors.successSoft }}>
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

            <View className="mt-3">
              <FormField
                label="File Name"
                value={pdfFileName}
                onChangeText={setPdfFileName}
                autoCapitalize="none"
                placeholder="report"
                suffix=".pdf"
              />
            </View>

            <View className="mt-3 gap-3">
              <ActionButton title="Share PDF" onPress={sharePdf} variant="outline" />
              <ActionButton
                title={isRenamingPdf ? "Renaming PDF..." : "Rename PDF File"}
                onPress={handleRenamePdf}
                disabled={!pdfFileName.trim()}
                loading={isRenamingPdf}
                variant="outline"
              />
            </View>

            <AppText selectable className="mt-1 text-xs" tone="success">
              {pdfUri}
            </AppText>
          </NeumorphCard>
        ) : null}
      </Animated.View>
    </ScreenShell>
  );
}
