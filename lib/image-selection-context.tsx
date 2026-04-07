import React, { PropsWithChildren, createContext, useContext, useMemo, useState } from "react";

export type SelectedImage = {
  id: string;
  uri: string;
  source: "camera" | "gallery";
};

type ImageSelectionContextValue = {
  images: SelectedImage[];
  addImages: (uris: string[], source: SelectedImage["source"]) => void;
  clearImages: () => void;
  removeImage: (id: string) => void;
};

const ImageSelectionContext = createContext<ImageSelectionContextValue | null>(null);

export function ImageSelectionProvider({ children }: PropsWithChildren) {
  const [images, setImages] = useState<SelectedImage[]>([]);

  const addImages = (uris: string[], source: SelectedImage["source"]) => {
    setImages((previous) => {
      const next = uris.map((uri) => ({
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        uri,
        source,
      }));
      return [...previous, ...next];
    });
  };

  const clearImages = () => setImages([]);

  const removeImage = (id: string) => {
    setImages((previous) => previous.filter((image) => image.id !== id));
  };

  const value = useMemo(
    () => ({ images, addImages, clearImages, removeImage }),
    [images]
  );

  return <ImageSelectionContext.Provider value={value}>{children}</ImageSelectionContext.Provider>;
}

export function useImageSelection() {
  const context = useContext(ImageSelectionContext);
  if (!context) {
    throw new Error("useImageSelection must be used inside ImageSelectionProvider");
  }
  return context;
}
