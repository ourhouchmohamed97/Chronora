"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TabBar, { TabId } from "../components/ui/TabBar";
import SummaryTab from "../components/results/SummaryTab";
import StudyPlanTab from "../components/results/StudyPlanTab";
import QuizTab from "../components/results/QuizTab";
import FlashcardsTab from "../components/results/FlashcardsTab";
import { StudyContent } from "../../lib/openrouter";

interface ResultMeta {
  fileName: string;
  numPages: number;
  wordCount: number;
  detectedTitle: string | null;
}

interface StoredResult {
  meta: ResultMeta;
  data: StudyContent;
}

export default function ResultsPage() {
  const router = useRouter();
  const [result, setResult] = useState<StoredResult | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>("summary");
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("chronora_result");
    if (!stored) { setNotFound(true); return; }
    try {
      setResult(JSON.parse(stored));
    } catch {
      setNotFound(true);
    }
  }, []);

  if (notFound) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4"
        style={{ fontFamily: "'DM Sans', sans-serif", background: "#fafafa" }}>
        <p className="text-slate-500 text-sm">No results found. Please upload a PDF first.</p>
        <button onClick={() => router.push("/upload")}
          className="px-5 py-2.5 rounded-xl bg-slate-800 text-white text-sm font-semibold hover:bg-slate-900 transition-colors">
          Go to Upload
        </button>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#fafafa" }}>
        <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const { meta, data } = result;

  return (
    <div
      className="min-h-screen"
      style={{
        fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
        background: "linear-gradient(160deg, #fafafa 0%, #f4f4f8 50%, #fafaf6 100%)",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=Fraunces:ital,opsz,wght@0,9..144,600;1,9..144,300&display=swap');
        @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        .fade-up{animation:fadeUp .4s ease both}
      `}</style>

      <div className="max-w-3xl mx-auto px-4 py-10 space-y-6 fade-up">

        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <button
              onClick={() => router.push("/upload")}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-600 mb-3 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Upload another PDF
            </button>
            <h1
              className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight"
              style={{ fontFamily: "'Fraunces', Georgia, serif" }}
            >
              {data.summary.title}
            </h1>
            <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {meta.numPages} pages
              </span>
              <span>·</span>
              <span>{meta.wordCount.toLocaleString()} words</span>
              <span>·</span>
              <span className="truncate max-w-[160px]">{meta.fileName}</span>
            </div>
          </div>

          {/* Quick stats */}
          <div className="flex gap-2 flex-shrink-0">
            {[
              { label: "Concepts", value: data.summary.concepts.length },
              { label: "Days", value: data.studyPlan.totalDays },
              { label: "Q's", value: data.quiz.length },
              { label: "Cards", value: data.flashcards.length },
            ].map(({ label, value }) => (
              <div key={label} className="text-center px-3 py-2 rounded-xl bg-white border border-slate-100 shadow-sm min-w-[52px]">
                <p className="text-lg font-bold text-amber-500">{value}</p>
                <p className="text-[10px] text-slate-400 font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tab bar */}
        <TabBar active={activeTab} onChange={setActiveTab} />

        {/* Tab content */}
        <div className="pb-16">
          {activeTab === "summary" && <SummaryTab summary={data.summary} />}
          {activeTab === "studyPlan" && <StudyPlanTab studyPlan={data.studyPlan} />}
          {activeTab === "quiz" && <QuizTab quiz={data.quiz} />}
          {activeTab === "flashcards" && <FlashcardsTab flashcards={data.flashcards} />}
        </div>
      </div>
    </div>
  );
}