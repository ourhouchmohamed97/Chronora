"use client";

import React from "react";
import { StudyContent } from "../../../lib/openrouter";

interface SummaryTabProps {
  summary: StudyContent["summary"];
}

export default function SummaryTab({ summary }: SummaryTabProps) {
  return (
    <div className="space-y-8">
      {/* Overview */}
      <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h2
              className="text-xl font-bold text-slate-800 mb-2"
              style={{ fontFamily: "'Fraunces', Georgia, serif" }}
            >
              {summary.title}
            </h2>
            <p className="text-slate-600 leading-relaxed">{summary.overview}</p>
          </div>
        </div>
      </div>

      {/* Key Concepts */}
      <div>
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-4">
          Key Concepts
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {summary.concepts.map((concept, i) => (
            <div
              key={i}
              className="group p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-amber-200 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-lg bg-slate-100 group-hover:bg-amber-100 flex items-center justify-center text-xs font-bold text-slate-500 group-hover:text-amber-600 transition-colors flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <div>
                  <h4 className="font-semibold text-slate-800 mb-1">{concept.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{concept.explanation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}