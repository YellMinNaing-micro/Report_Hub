import React, { useMemo, useState } from "react";
import { Alert, View } from "react-native";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import * as Sharing from "expo-sharing";
import { Heading } from "@gluestack-ui/themed";
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
          <AppText className="text-xs uppercase tracking-[1.4px]" tone="primary" weight="semibold">
            Report Builder
          </AppText>
          <Heading size="lg" className="mt-2" style={{ color: colors.text }}>
            Image To PDF Report
          </Heading>
          <AppText className="mt-2 text-sm leading-6" tone="muted">
            Choose photos from gallery or camera, then generate a single PDF report in seconds.
          </AppText>
        </NeumorphCard>

        <View className="gap-3">
          <ActionButton title="Pick Images From Gallery" onPress={pickFromGallery} />
          <ActionButton title="Open Camera And Capture" onPress={() => router.push("/camera")} />
        </View>

        <NeumorphCard className="p-4">
          <AppText className="mb-3 text-base" weight="semibold">
            Selected Images ({images.length})
          </AppText>
          <ImagePreviewGrid images={images} onRemove={removeImage} />
        </NeumorphCard>

        <View className="gap-3">
          <ActionButton
            title={isGeneratingPdf ? "Generating PDF..." : "Generate PDF"}
            onPress={generatePdf}
            disabled={!images.length}
            loading={isGeneratingPdf}
          />
          <ActionButton title="Share PDF" onPress={sharePdf} disabled={!pdfUri} />
          <ActionButton
            title={isRenamingPdf ? "Renaming PDF..." : "Rename PDF File"}
            onPress={handleRenamePdf}
            disabled={!pdfUri || !pdfFileName.trim()}
            loading={isRenamingPdf}
            variant="outline"
          />
          <ActionButton title="Clear All Images" onPress={clearImages} disabled={!images.length} />
        </View>

        {pdfUri ? (
          <NeumorphCard className="p-3" style={{ backgroundColor: colors.successSoft }}>
            <AppText className="text-xs" tone="success" weight="medium">Saved PDF</AppText>
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
            <AppText selectable className="mt-1 text-xs" tone="success">
              {pdfUri}
            </AppText>
          </NeumorphCard>
        ) : null}
      </Animated.View>
    </ScreenShell>
  );
}
