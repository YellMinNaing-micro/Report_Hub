import * as FileSystem from "expo-file-system/legacy";
import * as Print from "expo-print";

const guessMimeType = (uri: string) => {
  const lower = uri.toLowerCase();
  if (lower.endsWith(".png")) return "image/png";
  if (lower.endsWith(".webp")) return "image/webp";
  return "image/jpeg";
};

const imageToDataUri = async (uri: string) => {
  const base64 = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });
  return `data:${guessMimeType(uri)};base64,${base64}`;
};

const PDF_EXTENSION = ".pdf";

const sanitizePdfFileName = (name: string) =>
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

export async function generatePdfFromImages(imageUris: string[]) {
  if (!imageUris.length) {
    throw new Error("At least one image is required.");
  }

  if (!FileSystem.documentDirectory) {
    throw new Error("Document directory is unavailable on this device.");
  }

  const dataUris = await Promise.all(imageUris.map(imageToDataUri));

  const html = `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h1 { margin-bottom: 18px; }
          .item { page-break-inside: avoid; margin-bottom: 24px; }
          img { width: 100%; max-width: 100%; border: 1px solid #e2e8f0; border-radius: 8px; }
        </style>
      </head>
      <body>
        <h1>Report Images</h1>
        ${dataUris
          .map(
            (dataUri, index) => `
          <div class="item">
            <p><strong>Image ${index + 1}</strong></p>
            <img src="${dataUri}" />
          </div>
        `
          )
          .join("")}
      </body>
    </html>
  `;

  const printed = await Print.printToFileAsync({ html });
  const outputUri = `${FileSystem.documentDirectory}report-${Date.now()}.pdf`;
  await FileSystem.copyAsync({ from: printed.uri, to: outputUri });

  return outputUri;
}
