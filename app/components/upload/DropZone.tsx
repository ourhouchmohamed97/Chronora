"use client";

import React, { useRef, useState, useCallback } from "react";
import { validatePDFFile } from "../../../lib/pdf-parser";

interface DropZoneProps {
  onFileSelect: (file: File) => void;
  disabled?: boolean;
}

export default function DropZone({ onFileSelect, disabled }: DropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (file: File) => {
      setError(null);
      const validation = validatePDFFile(file);
      if (!validation.valid) {
        setError(validation.error!);
        return;
      }
      onFileSelect(file);
    },
    [onFileSelect]
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  return (
    <div className="w-full">
      <div
        onClick={() => !disabled && inputRef.current?.click()}
        onDrop={onDrop}
        onDragOver={(e) => { e.preventDefault(); if (!disabled) setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        className={`
          relative group w-full rounded-2xl border-2 border-dashed p-12
          flex flex-col items-center justify-center gap-4 cursor-pointer
          transition-all duration-300
          ${isDragging
            ? "border-amber-400 bg-amber-50/60 scale-[1.01]"
            : "border-slate-200 bg-white/60 hover:border-amber-300 hover:bg-amber-50/30"
          }
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        `}
      >
        {/* Animated upload icon */}
        <div className={`
          w-20 h-20 rounded-2xl flex items-center justify-center
          transition-all duration-300
          ${isDragging ? "bg-amber-100 scale-110" : "bg-slate-100 group-hover:bg-amber-100 group-hover:scale-105"}
        `}>
          <svg
            className={`w-9 h-9 transition-colors duration-300 ${isDragging ? "text-amber-500" : "text-slate-400 group-hover:text-amber-500"}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
            />
          </svg>
        </div>

        <div className="text-center">
          <p className="font-semibold text-slate-700 text-base mb-1">
            {isDragging ? "Drop it here" : "Drag & drop your PDF here"}
          </p>
          <p className="text-sm text-slate-400">Supports PDF files up to 50MB</p>
        </div>

        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
          className="px-5 py-2 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-600 hover:border-amber-300 hover:text-amber-600 transition-all shadow-sm"
        >
          Browse Files
        </button>

        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
          disabled={disabled}
        />
      </div>

      {error && (
        <p className="mt-3 text-sm text-red-500 flex items-center gap-2">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}