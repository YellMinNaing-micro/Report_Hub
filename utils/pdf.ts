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

  const dataUris = await Promise.all(imageUris.map(imageToDataUri));

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
