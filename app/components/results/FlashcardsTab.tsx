"use client";

import React, { useState } from "react";
import { StudyContent } from "../../../lib/openrouter";

interface FlashcardsTabProps {
  flashcards: StudyContent["flashcards"];
}

export default function FlashcardsTab({ flashcards }: FlashcardsTabProps) {
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<Set<string>>(new Set());

  const card = flashcards[current];

  const handleFlip = () => setFlipped((f) => !f);

  const handleKnow = () => {
    setKnown((prev) => new Set([...prev, card.id]));
    next();
  };

  const handleStudyMore = () => {
    next();
  };

  const next = () => {
    setFlipped(false);
    setTimeout(() => {
      setCurrent((c) => (c + 1) % flashcards.length);
    }, 150);
  };

  const prev = () => {
    setFlipped(false);
    setTimeout(() => {
      setCurrent((c) => (c - 1 + flashcards.length) % flashcards.length);
    }, 150);
  };

  const resetKnown = () => {
    setKnown(new Set());
    setCurrent(0);
    setFlipped(false);
  };

  return (
    <div className="space-y-6">
      <style>{`
        .flip-card { perspective: 1000px; }
        .flip-card-inner { transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1); transform-style: preserve-3d; }
        .flip-card-inner.flipped { transform: rotateY(180deg); }
        .flip-card-front, .flip-card-back { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
        .flip-card-back { transform: rotateY(180deg); }
      `}</style>

      {/* Stats */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-500">Card {current + 1} of {flashcards.length}</span>
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-emerald-600">✓ {known.size} known</span>
          <span className="text-xs text-slate-400">·</span>
          <span className="text-xs font-medium text-slate-500">{flashcards.length - known.size} remaining</span>
          {known.size > 0 && (
            <button onClick={resetKnown} className="text-xs text-slate-400 underline hover:text-slate-600">reset</button>
          )}
        </div>
      </div>

      {/* Progress dots */}
      <div className="flex gap-1 flex-wrap">
        {flashcards.map((fc, i) => (
          <button
            key={fc.id}
            onClick={() => { setCurrent(i); setFlipped(false); }}
            className={`h-1.5 rounded-full transition-all ${i === current ? "w-5 bg-amber-500" : known.has(fc.id) ? "w-1.5 bg-emerald-400" : "w-1.5 bg-slate-200"}`}
          />
        ))}
      </div>

      {/* Flip Card */}
      <div className="flip-card w-full cursor-pointer" style={{ height: "260px" }} onClick={handleFlip}>
        <div className={`flip-card-inner relative w-full h-full ${flipped ? "flipped" : ""}`}>
          {/* Front */}
          <div className="flip-card-front absolute inset-0 rounded-2xl bg-white border border-slate-100 shadow-md flex flex-col items-center justify-center p-8 text-center">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Term</span>
            <p className="text-xl font-bold text-slate-800" style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
              {card.front}
            </p>
            <span className="mt-6 text-xs text-slate-400">Click to reveal answer</span>
          </div>

          {/* Back */}
          <div className="flip-card-back absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 shadow-md flex flex-col items-center justify-center p-8 text-center">
            <span className="text-xs font-semibold text-amber-500 uppercase tracking-widest mb-4">Answer</span>
            <p className="text-base text-slate-700 leading-relaxed">{card.back}</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      {flipped ? (
        <div className="flex gap-3">
          <button
            onClick={handleStudyMore}
            className="flex-1 py-3 rounded-xl border-2 border-slate-200 text-sm font-semibold text-slate-600 hover:border-red-300 hover:text-red-500 hover:bg-red-50 transition-all"
          >
            😕 Study More
          </button>
          <button
            onClick={handleKnow}
            className="flex-1 py-3 rounded-xl bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-600 transition-colors"
          >
            ✓ Got It
          </button>
        </div>
      ) : (
        <div className="flex gap-3">
          <button
            onClick={prev}
            className="px-5 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:border-slate-300 transition-all"
          >
            ←
          </button>
          <button
            onClick={handleFlip}
            className="flex-1 py-3 rounded-xl bg-amber-500 text-white text-sm font-semibold hover:bg-amber-600 transition-colors"
          >
            Flip Card
          </button>
          <button
            onClick={next}
            className="px-5 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:border-slate-300 transition-all"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}