"use client";

import React, { useState } from "react";
import { StudyContent } from "../../../lib/openrouter";

interface QuizTabProps {
  quiz: StudyContent["quiz"];
}

type AnswerState = Record<string, number>; // questionId → selected option index

export default function QuizTab({ quiz }: QuizTabProps) {
  const [answers, setAnswers] = useState<AnswerState>({});
  const [submitted, setSubmitted] = useState(false);
  const [current, setCurrent] = useState(0);

  const question = quiz[current];
  const selectedAnswer = answers[question.id];
  const isAnswered = selectedAnswer !== undefined;

  const score = quiz.filter((q) => answers[q.id] === q.correctAnswer).length;

  const handleSelect = (optionIndex: number) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [question.id]: optionIndex }));
  };

  const handleNext = () => {
    if (current < quiz.length - 1) setCurrent((c) => c + 1);
  };

  const handlePrev = () => {
    if (current > 0) setCurrent((c) => c - 1);
  };

  const handleSubmit = () => setSubmitted(true);

  const handleRetry = () => {
    setAnswers({});
    setSubmitted(false);
    setCurrent(0);
  };

  // Results screen
  if (submitted) {
    const pct = Math.round((score / quiz.length) * 100);
    const grade = pct >= 80 ? "Excellent!" : pct >= 60 ? "Good effort!" : "Keep studying!";
    const gradeColor = pct >= 80 ? "text-emerald-600" : pct >= 60 ? "text-amber-600" : "text-red-500";

    return (
      <div className="space-y-6">
        {/* Score card */}
        <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-8 text-center">
          <div className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold border-4 border-amber-200 bg-amber-50 text-amber-700">
            {pct}%
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-1" style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
            {grade}
          </h3>
          <p className={`text-sm font-semibold ${gradeColor} mb-4`}>
            {score} out of {quiz.length} correct
          </p>
          <button
            onClick={handleRetry}
            className="px-6 py-2.5 rounded-xl bg-amber-500 text-white text-sm font-semibold hover:bg-amber-600 transition-colors"
          >
            Retry Quiz
          </button>
        </div>

        {/* Review all answers */}
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-widest">Review</h3>
        {quiz.map((q, i) => {
          const userAnswer = answers[q.id];
          const correct = userAnswer === q.correctAnswer;
          return (
            <div key={q.id} className={`rounded-2xl p-5 border ${correct ? "bg-emerald-50 border-emerald-100" : "bg-red-50 border-red-100"}`}>
              <div className="flex items-start gap-3 mb-3">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${correct ? "bg-emerald-500 text-white" : "bg-red-500 text-white"}`}>
                  {i + 1}
                </span>
                <p className="font-semibold text-slate-800 text-sm">{q.question}</p>
              </div>
              <div className="ml-9 space-y-1.5 mb-3">
                {q.options.map((opt, oi) => (
                  <div key={oi} className={`text-sm px-3 py-1.5 rounded-lg ${oi === q.correctAnswer ? "bg-emerald-100 text-emerald-700 font-medium" : oi === userAnswer && !correct ? "bg-red-100 text-red-600 line-through" : "text-slate-500"}`}>
                    {opt}
                  </div>
                ))}
              </div>
              <div className="ml-9 text-xs text-slate-500 bg-white/80 rounded-lg px-3 py-2 border border-slate-100">
                💡 {q.explanation}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // Quiz screen
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-500">Question {current + 1} of {quiz.length}</span>
        <span className="text-sm font-medium text-slate-500">{answeredCount} answered</span>
      </div>
      <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-400 transition-all duration-300"
          style={{ width: `${((current + 1) / quiz.length) * 100}%` }}
        />
      </div>

      {/* Question card */}
      <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-6">
        <p className="font-semibold text-slate-800 text-base mb-5 leading-relaxed">{question.question}</p>

        <div className="space-y-3">
          {question.options.map((option, oi) => (
            <button
              key={oi}
              onClick={() => handleSelect(oi)}
              className={`w-full text-left px-4 py-3.5 rounded-xl border text-sm font-medium transition-all duration-150
                ${selectedAnswer === oi
                  ? "border-amber-400 bg-amber-50 text-amber-800 shadow-sm"
                  : "border-slate-200 text-slate-700 hover:border-amber-300 hover:bg-amber-50/50"
                }`}
            >
              <span className="inline-flex items-center gap-3">
                <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold flex-shrink-0 ${selectedAnswer === oi ? "border-amber-400 bg-amber-400 text-white" : "border-slate-300 text-slate-400"}`}>
                  {String.fromCharCode(65 + oi)}
                </span>
                {option}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={handlePrev}
          disabled={current === 0}
          className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:border-slate-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          ← Previous
        </button>

        <div className="flex gap-1">
          {quiz.map((q, i) => (
            <button
              key={q.id}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-amber-500 w-4" : answers[q.id] !== undefined ? "bg-emerald-400" : "bg-slate-300"}`}
            />
          ))}
        </div>

        {current < quiz.length - 1 ? (
          <button
            onClick={handleNext}
            className="px-5 py-2.5 rounded-xl bg-slate-800 text-white text-sm font-semibold hover:bg-slate-900 transition-colors"
          >
            Next →
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={answeredCount < quiz.length}
            className="px-5 py-2.5 rounded-xl bg-amber-500 text-white text-sm font-semibold hover:bg-amber-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            Submit Quiz
          </button>
        )}
      </div>

      {answeredCount < quiz.length && current === quiz.length - 1 && (
        <p className="text-center text-xs text-slate-400">
          Answer all {quiz.length} questions to submit
        </p>
      )}
    </div>
  );
}