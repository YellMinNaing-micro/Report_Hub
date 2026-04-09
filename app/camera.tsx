import React, { useRef, useState } from "react";
import { Alert, Text, View } from "react-native";
import { Redirect, router } from "expo-router";
import { CameraView, useCameraPermissions } from "expo-camera";

import { ActionButton } from "@/components/action-button";
import { RipplePressable } from "@/components/ripple-pressable";
import { useAuth } from "@/lib/auth-context";
import { useImageSelection } from "@/lib/image-selection-context";
import { useTheme } from "@/lib/theme-context";

export default function CameraScreen() {
  const { isAuthenticated } = useAuth();
  const { colors } = useTheme();
  const cameraRef = useRef<CameraView | null>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [isCapturing, setIsCapturing] = useState(false);
  const [facing, setFacing] = useState<"back" | "front">("back");
  const { addImages, images } = useImageSelection();

  if (!isAuthenticated) {
    return <Redirect href="/" />;
  }

  const toggleFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const takePhoto = async () => {
    if (!cameraRef.current || isCapturing) {
      return;
    }

    try {
      setIsCapturing(true);
      const photo = await cameraRef.current.takePictureAsync({ quality: 1 });
      if (photo?.uri) {
        addImages([photo.uri], "camera");
      }
    } catch {
      Alert.alert("Camera Error", "Failed to capture photo. Please try again.");
    } finally {
      setIsCapturing(false);
    }
  };

  if (!permission) {
    return (
      <View className="flex-1 items-center justify-center px-6" style={{ backgroundColor: colors.backgroundSecondary }}>
        <Text className="text-center text-white">Checking camera permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 items-center justify-center px-6" style={{ backgroundColor: colors.backgroundSecondary }}>
        <Text className="mb-4 text-center" style={{ color: colors.text }}>
          Camera access is needed to capture report images.
        </Text>
        <View className="w-full max-w-xs">
          <ActionButton title="Allow Camera Access" onPress={requestPermission} />
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black">
      <CameraView ref={cameraRef} style={{ flex: 1 }} facing={facing} />

      <View className="absolute inset-0 justify-between p-5">
        <View className="rounded-xl bg-black/40 p-3">
          <Text className="text-center text-sm text-white">
            Captured images in report: {images.length}
          </Text>
        </View>

        <View className="mb-6 gap-3">
          <RipplePressable
            onPress={takePhoto}
            disabled={isCapturing}
            className="h-16 items-center justify-center rounded-full bg-white"
            style={{ overflow: "hidden" }}
          >
            <Text className="text-base font-semibold text-slate-900">
              {isCapturing ? "Capturing..." : "Capture Photo"}
            </Text>
          </RipplePressable>

          <RipplePressable
            onPress={toggleFacing}
            className="h-12 items-center justify-center rounded-2xl bg-black/50"
            style={{ overflow: "hidden" }}
          >
            <Text className="text-sm font-medium text-white">Flip Camera</Text>
          </RipplePressable>

          <RipplePressable
            onPress={() => router.back()}
            className="h-12 items-center justify-center rounded-2xl"
            style={{ backgroundColor: colors.primary, overflow: "hidden" }}
          >
            <Text className="text-sm font-semibold" style={{ color: colors.primaryText }}>Done</Text>
          </RipplePressable>
        </View>
      </View>
    </View>
  );
}
