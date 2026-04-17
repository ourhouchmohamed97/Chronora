// lib/pdf-utils.ts
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