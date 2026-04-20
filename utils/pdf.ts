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
          }

          .page {
            min-height: 273mm;
            display: flex;
            flex-direction: column;
            page-break-after: always;
            break-after: page;
          }

          .page:last-child {
            page-break-after: auto;
            break-after: auto;
          }

          .page-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8mm;
            padding-bottom: 4mm;
            border-bottom: 1px solid #cbd5e1;
          }

          .page-title {
            font-size: 18px;
            font-weight: 700;
            margin: 0;
          }

          .page-label {
            font-size: 12px;
            font-weight: 600;
            color: #475569;
            margin: 0;
          }

          .image-frame {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid #cbd5e1;
            border-radius: 10px;
            overflow: hidden;
            background: #f8fafc;
          }

          .image-frame img {
            display: block;
            width: auto;
            height: auto;
            max-width: 100%;
            max-height: 248mm;
            object-fit: contain;
          }
        </style>
      </head>
      <body>
        ${dataUris
          .map(
            (dataUri, index) => `
          <section class="page">
            <div class="page-header">
              <p class="page-title">Report Image</p>
              <p class="page-label">Page ${index + 1} of ${dataUris.length}</p>
            </div>
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
