// lib/pdf-utils.ts

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

export function estimateStudyDays(wordCount: number): number {
    const readingMinutes = wordCount / 200;
    const days = Math.ceil(readingMinutes / 30);
    return Math.min(Math.max(days, 1), 14);
  }
  
  export function formatFileSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }