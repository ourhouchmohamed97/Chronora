import { NextRequest, NextResponse } from "next/server";
import { extractTextFromPDF, validatePDFFile } from "../../../lib/pdf-parser";
import { processDocumentWithAI } from "../../../lib/openrouter";

export const runtime = "nodejs"; // pdf-parse requires Node.js runtime (not Edge)
export const maxDuration = 60;   // allow up to 60s for large PDFs + AI call

export async function POST(req: NextRequest) {
  try {
    // ── 1. Parse the incoming form data ──────────────────────────────────────
    let formData: FormData;
    try {
      formData = await req.formData();
    } catch {
      return errorResponse("Invalid request. Expected multipart/form-data.", 400);
    }

    const file = formData.get("file");
    if (!file || !(file instanceof File)) {
      return errorResponse("No file provided. Send the PDF as a 'file' field.", 400);
    }

    // ── 2. Validate the file before doing any heavy work ─────────────────────
    const validation = validatePDFFile(file);
    if (!validation.valid) {
      return errorResponse(validation.error!, 400);
    }

    // ── 3. Extract text from the PDF ─────────────────────────────────────────
    let parsed;
    try {
      parsed = await extractTextFromPDF(file);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to read the PDF.";
      return errorResponse(message, 422);
    }

    // Sanity check — make sure we actually got text
    if (parsed.wordCount < 50) {
      return errorResponse(
        "The PDF has too little text to generate a study plan. Try a longer document.",
        422
      );
    }

    // ── 4. Send text to OpenRouter AI ─────────────────────────────────────────
    let studyContent;
    try {
      studyContent = await processDocumentWithAI(parsed.text);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "AI processing failed.";
      return errorResponse(message, 502);
    }

    // ── 5. Return the full result ─────────────────────────────────────────────
    return NextResponse.json(
      {
        success: true,
        meta: {
          fileName: file.name,
          fileSize: file.size,
          numPages: parsed.numPages,
          wordCount: parsed.wordCount,
          detectedTitle: parsed.title,
        },
        data: studyContent,
      },
      { status: 200 }
    );

  } catch (err: unknown) {
    // Catch-all for any unexpected errors
    console.error("[Chronora /api/process-pdf] Unexpected error:", err);
    return errorResponse("Something went wrong on our end. Please try again.", 500);
  }
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function errorResponse(message: string, status: number) {
  return NextResponse.json(
    { success: false, error: message },
    { status }
  );
}