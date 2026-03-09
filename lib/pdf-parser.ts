// lib/pdf-parser.ts
import { Buffer } from "buffer";

export interface ParsedPDF {
  text: string;
  numPages: number;
  wordCount: number;
  title: string | null;
}

type PDFParseFunction = (data: Buffer) => Promise<{
  text: string;
  numpages: number;
  info?: { Title?: string };
}>;

/**
 * Extracts text from a PDF file using pdf-parse.
 */
export async function extractTextFromPDF(file: File): Promise<ParsedPDF> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  let result;

  try {
    const pdfParseModule: unknown = await import("pdf-parse");
    const pdfParse = (pdfParseModule as any).default ?? (pdfParseModule as PDFParseFunction);

    result = await pdfParse(buffer);
  } catch (err) {
    console.error("[pdf-parser] error:", err);
    throw new Error(
      "Could not read the PDF. Make sure the file is not password-protected or corrupted."
    );
  }

  const rawText = result.text ?? "";

  if (!rawText.trim()) {
    throw new Error(
      "This PDF appears to be a scanned image with no readable text. Only text-based PDFs are supported."
    );
  }

  const cleaned = cleanText(rawText);
  const wordCount = cleaned.split(/\s+/).filter(Boolean).length;
  const title = result.info?.Title?.trim() || null;

  return {
    text: cleaned,
    numPages: result.numpages,
    wordCount,
    title,
  };
}

/**
 * Cleans raw text extracted from PDFs.
 */
export function cleanText(raw: string): string {
  return raw
    .replace(/[^\x20-\x7E\n\r\t]/g, " ")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/^\s+|\s+$/gm, "")
    .trim();
}

/**
 * Estimates study days based on word count.
 */
export function estimateStudyDays(wordCount: number): number {
  const readingMinutes = wordCount / 200; // 200 WPM
  const days = Math.ceil(readingMinutes / 30); // 30 min/day
  return Math.min(Math.max(days, 1), 14);
}

/**
 * Formats file size in human-readable form.
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Validates a PDF file for type and size.
 */
export function validatePDFFile(file: File): { valid: boolean; error?: string } {
  const MAX_SIZE = 50 * 1024 * 1024; // 50MB
  if (file.type !== "application/pdf") {
    return { valid: false, error: "Only PDF files are supported." };
  }
  if (file.size > MAX_SIZE) {
    return { valid: false, error: "File is too large. Maximum size is 50MB." };
  }
  return { valid: true };
}