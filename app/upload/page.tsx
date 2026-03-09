"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import DropZone from "../components/upload/DropZone";
import FileCard from "../components/upload/FileCard";
import { estimateStudyDays } from "../../lib/pdf-parser";

export default function UploadPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [includePracticeQuiz, setIncludePracticeQuiz] = useState(true);
  const [deepDiveMode, setDeepDiveMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingStep, setLoadingStep] = useState<string>("");

  const handleGenerate = async () => {
    if (!file) return;
    setIsLoading(true);
    setError(null);

    try {
      setLoadingStep("Reading your PDF…");
      const formData = new FormData();
      formData.append("file", file);

      setLoadingStep("AI is analyzing your document…");
      const res = await fetch("/api/process-pdf", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error ?? "Something went wrong.");
      }

      setLoadingStep("Building your study plan…");

      // Store result in sessionStorage to pass to results page
      sessionStorage.setItem("chronora_result", JSON.stringify(json));

      router.push("/results");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unexpected error.";
      setError(message);
      setIsLoading(false);
      setLoadingStep("");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-16"
      style={{
        fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
        background: "linear-gradient(160deg, #fafafa 0%, #f4f4f8 50%, #fafaf6 100%)",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=Fraunces:ital,opsz,wght@0,9..144,600;1,9..144,300&display=swap');
        .toggle-track { position:relative;width:36px;height:20px;border-radius:9999px;transition:background .2s;cursor:pointer;flex-shrink:0; }
        .toggle-track.on { background:linear-gradient(135deg,#f59e0b,#f97316); }
        .toggle-track.off { background:#d1d5db; }
        .toggle-knob { position:absolute;top:2px;width:16px;height:16px;border-radius:50%;background:white;box-shadow:0 1px 3px rgba(0,0,0,.2);transition:left .2s; }
        .toggle-track.on .toggle-knob { left:18px; }
        .toggle-track.off .toggle-knob { left:2px; }
        .generate-btn { background:linear-gradient(135deg,#1e293b 0%,#334155 100%);transition:transform .2s,box-shadow .2s,opacity .2s; }
        .generate-btn:hover:not(:disabled) { transform:translateY(-2px);box-shadow:0 12px 32px rgba(30,41,59,.35); }
        .generate-btn:disabled { opacity:.6;cursor:not-allowed; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)} }
        .f1{animation:fadeUp .5s ease both}
        .f2{animation:fadeUp .5s .1s ease both}
        .f3{animation:fadeUp .5s .2s ease both}
        .f4{animation:fadeUp .5s .3s ease both}
        .f5{animation:fadeUp .5s .4s ease both}
        .f6{animation:fadeUp .5s .5s ease both}
        @keyframes spin{to{transform:rotate(360deg)}}
        .spin{animation:spin 1s linear infinite}
      `}</style>

      <div className="w-full max-w-2xl flex flex-col gap-6">
        {/* Logo */}
        <div className="f1 text-center mb-2">
          <span className="text-2xl font-bold tracking-tight text-slate-900" style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
            Chronora
          </span>
        </div>

        {/* Heading */}
        <div className="f2 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3 leading-tight" style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
            Transform your study materials.
          </h1>
          <p className="text-slate-500 text-base md:text-lg max-w-md mx-auto leading-relaxed">
            Upload any PDF and Chronora's AI will generate a summary, a day-by-day study plan, a quiz, and flashcards — instantly.
          </p>
        </div>

        {/* Estimate hint */}
        {file && (
          <div className="f3 flex items-center justify-center gap-2 text-sm text-amber-600 font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Estimated study time: ~{estimateStudyDays(Math.round(file.size / 6))} days
          </div>
        )}

        {/* Drop Zone */}
        <div className="f3">
          <DropZone onFileSelect={setFile} disabled={isLoading} />
        </div>

        {/* File card */}
        {file && (
          <div className="f4">
            <FileCard file={file} onRemove={() => setFile(null)} disabled={isLoading} />
          </div>
        )}

        {/* Toggles */}
        <div className="f5 flex items-center justify-center gap-8">
          {[
            { label: "Include Practice Quiz", value: includePracticeQuiz, set: setIncludePracticeQuiz },
            { label: "Deep Dive Mode", value: deepDiveMode, set: setDeepDiveMode },
          ].map(({ label, value, set }) => (
            <button key={label} className="flex items-center gap-2.5" onClick={() => set((v: boolean) => !v)}>
              <div className={`toggle-track ${value ? "on" : "off"}`}>
                <div className="toggle-knob" />
              </div>
              <span className="text-sm font-medium text-slate-700">{label}</span>
            </button>
          ))}
        </div>

        {/* Error */}
        {error && (
          <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 flex items-start gap-3">
            <svg className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Generate button */}
        <button
          className="generate-btn f6 w-full py-4 rounded-xl text-white font-bold text-base flex items-center justify-center gap-2.5 shadow-lg"
          disabled={!file || isLoading}
          onClick={handleGenerate}
        >
          {isLoading ? (
            <>
              <svg className="spin w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" />
              </svg>
              {loadingStep || "Processing…"}
            </>
          ) : (
            <>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" />
              </svg>
              Generate AI Summary
            </>
          )}
        </button>

        {/* Footer */}
        <div className="f6 text-center">
          <p className="text-xs font-semibold tracking-widest mb-3 text-slate-400">POWERED BY ADVANCED LANGUAGE MODELS</p>
          <div className="flex items-center justify-center gap-6">
            {[
              { icon: "⚡", label: "FastProcess" },
              { icon: "🔒", label: "SecureDocs" },
              { icon: "🧠", label: "NeuralAnalyze" },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                <span>{icon}</span>{label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}