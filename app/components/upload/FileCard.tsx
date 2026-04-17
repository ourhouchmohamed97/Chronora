"use client";

import React from "react";
import { formatFileSize } from "../../../lib/pdf-utils";

interface FileCardProps {
  file: File;
  onRemove: () => void;
  disabled?: boolean;
}

export default function FileCard({ file, onRemove, disabled }: FileCardProps) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-100 shadow-sm">
      {/* PDF icon */}
      <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 bg-red-50">
        <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
          />
        </svg>
      </div>

      {/* File info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-800 truncate">{file.name}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-xs text-slate-400">{formatFileSize(file.size)}</span>
          <span className="w-1 h-1 rounded-full bg-slate-300" />
          <span className="text-xs text-emerald-500 font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
            Ready to process
          </span>
        </div>
      </div>

      {/* Remove */}
      {!disabled && (
        <button
          onClick={onRemove}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}