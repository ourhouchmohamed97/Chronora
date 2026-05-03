// lib/pdf-parser.ts  — SERVER ONLY (Node.js runtime)
import "server-only";
import { PDFParse } from "pdf-parse";

export interface ParsedPDF {
  text: string;
  numPages: number;
  wordCount: number;
  title: string | null;
}

export async function extractTextFromPDF(file: File): Promise<ParsedPDF> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  let numPages = 0;
  let rawText = "";

  try {
    const parser = new PDFParse({ data: buffer });
    const info = await parser.getInfo();
    numPages = info.total ?? 0;

    const result = await parser.getText();
    rawText = result.text ?? "";

    await parser.destroy();
  } catch (err) {
    console.error("[pdf-parser] error:", err);
    throw new Error(
      "Could not read the PDF. Make sure the file is not password-protected or corrupted."
    );
  }

  if (!rawText.trim()) {
    throw new Error(
      "This PDF appears to be a scanned image with no readable text. Only text-based PDFs are supported."
    );
  }

  const cleaned = cleanText(rawText);
  const wordCount = cleaned.split(/\s+/).filter(Boolean).length;

  return {
    text: cleaned,
    numPages,
    wordCount,
    title: file.name.replace(/\.pdf$/i, ""),
  };
}

export function cleanText(raw: string): string {
  return raw
    // Remove only non-printable control characters (except newline/tab/cr)
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, " ")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/^\s+|\s+$/gm, "")
    .trim();
}

// Re-export for any server-side code that still imports from here
export { validatePDFFile } from "./pdf-utils";