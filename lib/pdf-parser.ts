// lib/pdf-parser.ts
import { extractText, getDocumentProxy } from "unpdf";

export interface ParsedPDF {
  text: string;
  numPages: number;
  wordCount: number;
  title: string | null;
}

export async function extractTextFromPDF(file: File): Promise<ParsedPDF> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  let numPages: number;
  let rawText: string;

  try {
    const pdf = await getDocumentProxy(buffer);
    numPages = pdf.numPages;
    const { text } = await extractText(pdf, { mergePages: true });
    rawText = Array.isArray(text) ? text.join("\n") : text;
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
    .replace(/[^\x20-\x7E\n\r\t]/g, " ")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/^\s+|\s+$/gm, "")
    .trim();
}

export function validatePDFFile(file: File): { valid: boolean; error?: string } {
  const MAX_SIZE = 50 * 1024 * 1024;
  if (file.type !== "application/pdf") {
    return { valid: false, error: "Only PDF files are supported." };
  }
  if (file.size > MAX_SIZE) {
    return { valid: false, error: "File is too large. Maximum size is 50MB." };
  }
  return { valid: true };
}