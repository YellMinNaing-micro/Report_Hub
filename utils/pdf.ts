import * as FileSystem from "expo-file-system/legacy";
import { Image } from "react-native";
import { SaveFormat, manipulateAsync } from "expo-image-manipulator";
import * as Print from "expo-print";

const PDF_IMAGE_MAX_WIDTH = 1080;
const PDF_IMAGE_MAX_HEIGHT = 1600;
const PDF_IMAGE_COMPRESS_QUALITY = 0.6;
const guessMimeType = (uri: string) => {
  const lower = uri.toLowerCase();
  if (lower.endsWith(".png")) return "image/png";
  if (lower.endsWith(".webp")) return "image/webp";
  return "image/jpeg";
};

const getImageSize = (uri: string) =>
  new Promise<{ width: number; height: number }>((resolve, reject) => {
    Image.getSize(
      uri,
      (width, height) => resolve({ width, height }),
      (error) => reject(error)
    );
  });

const getResizedDimensions = (width: number, height: number) => {
  const widthRatio = PDF_IMAGE_MAX_WIDTH / width;
  const heightRatio = PDF_IMAGE_MAX_HEIGHT / height;
  const scale = Math.min(widthRatio, heightRatio, 1);

  return {
    width: Math.max(1, Math.round(width * scale)),
    height: Math.max(1, Math.round(height * scale)),
  };
};

const optimizeImageForPdf = async (uri: string) => {
  const { width, height } = await getImageSize(uri);
  const targetSize = getResizedDimensions(width, height);

  return manipulateAsync(
    uri,
    [{ resize: targetSize }],
    {
      compress: PDF_IMAGE_COMPRESS_QUALITY,
      format: SaveFormat.JPEG,
    }
  );
};

const imageToDataUri = async (uri: string) => {
  const optimizedImage = await optimizeImageForPdf(uri);
  const base64 = await FileSystem.readAsStringAsync(optimizedImage.uri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  if (optimizedImage.uri !== uri) {
    await FileSystem.deleteAsync(optimizedImage.uri, { idempotent: true });
  }

  return `data:${guessMimeType(optimizedImage.uri)};base64,${base64}`;
};

const PDF_EXTENSION = ".pdf";

export const sanitizePdfFileName = (name: string) =>
  name
    .trim()
    .replace(/\.pdf$/i, "")
    .replace(/[<>:"/\\|?*\u0000-\u001F]/g, "")
    .replace(/\s+/g, "-");

export const getPdfFileName = (uri: string) => {
  const segments = uri.split("/");
  return segments[segments.length - 1] ?? "";
};

export const getPdfBaseName = (uri: string) => getPdfFileName(uri).replace(/\.pdf$/i, "");

export async function renamePdfFile(uri: string, nextName: string) {
  if (!FileSystem.documentDirectory) {
    throw new Error("Document directory is unavailable on this device.");
  }

  const sanitizedName = sanitizePdfFileName(nextName);

  if (!sanitizedName) {
    throw new Error("Please enter a valid PDF file name.");
  }

  const nextUri = `${FileSystem.documentDirectory}${sanitizedName}${PDF_EXTENSION}`;

  if (nextUri === uri) {
    return uri;
  }

  const existingFile = await FileSystem.getInfoAsync(nextUri);
  if (existingFile.exists) {
    throw new Error("A PDF with that name already exists.");
  }

  await FileSystem.moveAsync({ from: uri, to: nextUri });
  return nextUri;
}

export async function generatePdfFromImages(imageUris: string[], fileName?: string) {
  if (!imageUris.length) {
    throw new Error("At least one image is required.");
  }

  if (!FileSystem.documentDirectory) {
    throw new Error("Document directory is unavailable on this device.");
  }

  const dataUris: string[] = [];
  for (const imageUri of imageUris) {
    dataUris.push(await imageToDataUri(imageUri));
  }

  const html = `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          @page {
            size: A4 portrait;
            margin: 12mm;
          }

          * {
            box-sizing: border-box;
          }

          html, body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            color: #0f172a;
            background: #ffffff;
            width: 100%;
            height: 100%;
          }

          .page {
            height: 273mm;
            padding: 0;
            overflow: hidden;
            page-break-after: always;
            break-after: page;
          }

          .page:last-child {
            page-break-after: auto;
            break-after: auto;
          }

          .image-frame {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            padding: 2mm;
            overflow: hidden;
            background: #ffffff;
          }

          .image-frame img {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
        </style>
      </head>
      <body>
        ${dataUris
          .map(
            (dataUri) => `
          <section class="page">
            <div class="image-frame">
              <img src="${dataUri}" />
            </div>
          </section>
        `,
          )
          .join("")}
      </body>
    </html>
  `;

  const printed = await Print.printToFileAsync({ html });
  const safeName = sanitizePdfFileName(fileName ?? "") || `report-${Date.now()}`;
  const outputUri = `${FileSystem.documentDirectory}${safeName}.pdf`;
  await FileSystem.copyAsync({ from: printed.uri, to: outputUri });

  return outputUri;
}
