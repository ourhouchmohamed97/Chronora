"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import {
  Sparkles,
  Calendar,
  Award,
  Layers,
  BookOpen,
  LineChart,
  ArrowRight,
  Upload,
  CheckCircle,
  Clock,
  Check,
  ChevronRight,
  BookOpenCheck,
  HelpCircle,
  RefreshCw,
} from "lucide-react";

type MockTabId = "summary" | "studyPlan" | "quiz" | "flashcards";

export default function Home() {
  const [activeTab, setActiveTab] = useState<MockTabId>("summary");
  const [quizSelectedOption, setQuizSelectedOption] = useState<number | null>(null);
  const [flashcardFlipped, setFlashcardFlipped] = useState(false);

  return (
    <div
      className="min-h-screen font-sans overflow-x-hidden transition-colors duration-300 bg-white dark:bg-[#0f172a]"
      style={{ fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,300&display=swap');
        
        * { box-sizing: border-box; }
        
        .serif-title { 
          font-family: 'Fraunces', Georgia, serif; 
        }
        
        .bg-light-gradient {
          background: linear-gradient(160deg, #fafafa 0%, #f4f4f8 50%, #fafaf6 100%);
        }
        
        .dark .bg-light-gradient {
          background: linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
        }

        .generate-btn { 
          background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
          transition: transform .2s, box-shadow .2s, opacity .2s; 
        }
        .generate-btn:hover { 
          transform: translateY(-2px); 
          box-shadow: 0 12px 32px rgba(30,41,59,.25); 
        }
        
        .dark .generate-btn {
          background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%);
        }
        .dark .generate-btn:hover {
          box-shadow: 0 12px 32px rgba(245, 158, 11, 0.35);
        }

        .btn-amber {
          background: linear-gradient(135deg, #f59e0b, #f97316);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .btn-amber:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(245, 158, 11, 0.3);
        }

        .card-premium {
          background: white;
          border: 1px solid rgba(241, 245, 249, 0.8);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .card-premium:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.05);
          border-color: rgba(245, 158, 11, 0.3);
        }
        
        .dark .card-premium {
          background: #1e293b;
          border: 1px solid rgba(51, 65, 85, 0.8);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        }
        .dark .card-premium:hover {
          border-color: rgba(245, 158, 11, 0.5);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
        }

        /* 3D Flashcard Flip styles */
        .perspective {
          perspective: 1000px;
        }
        .flip-card-inner {
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }
        .flip-card-flipped {
          transform: rotateY(180deg);
        }
        .flip-card-front, .flip-card-back {
          backface-visibility: hidden;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        .flip-card-back {
          transform: rotateY(180deg);
        }
      `}</style>

      <Navbar />

      <main className="flex-grow bg-light-gradient">
        
        {/* Hero Section */}
        <section className="pt-24 pb-20 px-4 relative overflow-hidden">
          {/* Subtle warm glow background blobs */}
          <div className="absolute top-20 left-1/4 w-[350px] h-[350px] rounded-full bg-amber-200/20 dark:bg-amber-500/5 blur-3xl pointer-events-none" />
          <div className="absolute top-40 right-1/4 w-[400px] h-[400px] rounded-full bg-orange-200/20 dark:bg-orange-500/5 blur-3xl pointer-events-none" />
          
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 relative z-10">
            
            {/* Left side: Heading & CTA */}
            <div className="flex-1 text-center lg:text-left space-y-6">
              
              <div className="inline-flex items-center gap-2 border text-xs font-semibold px-3 py-1.5 rounded-full bg-amber-50 border-amber-200/50 text-amber-700 dark:bg-amber-950/30 dark:border-amber-800 dark:text-amber-300">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                Now Powered by Gemini 2.5 Flash
              </div>
              
              <h1 className="serif-title text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                Transform your study <br className="hidden sm:inline" />
                materials with <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">AI</span>.
              </h1>
              
              <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Upload any PDF syllabus, textbook chapter, or lecture notes. Chronora instantly extracts key concepts, schedules a day-by-day study calendar, and designs custom quizzes & flashcards.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link href="/upload" className="w-full sm:w-auto">
                  <button className="generate-btn text-white w-full sm:w-auto font-bold px-7 py-3.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-md">
                    <Upload className="w-4 h-4" />
                    Upload your PDF
                  </button>
                </Link>
                <a href="#how-it-works" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto font-semibold px-7 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                    How it works
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </button>
                </a>
              </div>
              
              {/* Trust Badge */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-slate-400 text-xs font-medium">
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-500" /> No Credit Card Required
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-500" /> Free Tier Available
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-500" /> Under 60s Processing
                </div>
              </div>
            </div>
            
            {/* Right side: Interactive Product Mockup */}
            <div className="flex-1 w-full max-w-xl">
              <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-xl overflow-hidden">
                
                {/* Header Mockup */}
                <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <h3 className="serif-title text-sm font-bold text-slate-950 dark:text-white flex items-center gap-1.5">
                      <BookOpenCheck className="w-4 h-4 text-amber-500" />
                      Photosynthesis & Respiration.pdf
                    </h3>
                    <p className="text-[10px] text-slate-400">12 pages · 4,280 words · AI Study Package</p>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                  </div>
                </div>

                {/* Tab selector */}
                <div className="p-3 bg-slate-50/50 dark:bg-slate-950/20 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-850">
                    {[
                      { id: "summary", label: "Summary", icon: <Sparkles className="w-3.5 h-3.5" /> },
                      { id: "studyPlan", label: "Study Plan", icon: <Calendar className="w-3.5 h-3.5" /> },
                      { id: "quiz", label: "Quiz", icon: <Award className="w-3.5 h-3.5" /> },
                      { id: "flashcards", label: "Flashcards", icon: <Layers className="w-3.5 h-3.5" /> },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        id={`mock-tab-${tab.id}`}
                        onClick={() => {
                          setActiveTab(tab.id as MockTabId);
                          // Reset state on tab change
                          if (tab.id !== "quiz") setQuizSelectedOption(null);
                        }}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                          activeTab === tab.id
                            ? "bg-white dark:bg-slate-800 text-slate-800 dark:text-white shadow-sm"
                            : "text-slate-500 hover:text-slate-700 dark:text-slate-400"
                        }`}
                      >
                        <span className={activeTab === tab.id ? "text-amber-500" : ""}>{tab.icon}</span>
                        <span className="hidden sm:inline">{tab.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Content Area (Depends on Active Tab) */}
                <div className="p-5 min-h-[260px] flex flex-col justify-between">
                  
                  {/* SUMMARY TAB */}
                  {activeTab === "summary" && (
                    <div className="space-y-4">
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-amber-600 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded">Core Overview</span>
                        <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                          This document covers photosynthesis in plant chloroplasts (light-dependent reactions and the Calvin Cycle) and contrasts it with cellular respiration, outlining the ecological carbon-oxygen cycle.
                        </p>
                      </div>
                      
                      <div className="space-y-2.5">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Key Concepts Identified</span>
                        
                        <div className="p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800/50 flex items-start gap-2.5 shadow-sm">
                          <span className="w-5 h-5 rounded bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-xs font-bold text-amber-600">1</span>
                          <div>
                            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Light-Dependent Reactions</h4>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Occur in the thylakoid membranes; chlorophyll captures sunlight to synthesize ATP and NADPH, splitting water to release oxygen.</p>
                          </div>
                        </div>

                        <div className="p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800/50 flex items-start gap-2.5 shadow-sm">
                          <span className="w-5 h-5 rounded bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-xs font-bold text-amber-600">2</span>
                          <div>
                            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Calvin Cycle</h4>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Stroma-based carbon fixation which converts CO2 into G3P (glucose precursor) utilizing the previously generated ATP and NADPH.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STUDY PLAN TAB */}
                  {activeTab === "studyPlan" && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center bg-amber-500/5 dark:bg-amber-500/10 px-3 py-2 rounded-xl border border-amber-500/10">
                        <span className="text-xs font-bold text-slate-800 dark:text-amber-300">Target Study Track: 3 Days</span>
                        <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1"><Clock className="w-3 h-3" /> ~45 mins/day</span>
                      </div>
                      
                      <div className="space-y-2">
                        {[
                          { day: "Day 1", title: "Thylakoids & Light Capture", type: "Read + Quiz", dur: "40 min", active: true },
                          { day: "Day 2", title: "Calvin Cycle & Carbon Fixation", type: "Practice Quiz", dur: "35 min", active: false },
                          { day: "Day 3", title: "Photosynthesis vs. Respiration", type: "Active Recall", dur: "50 min", active: false },
                        ].map((d) => (
                          <div
                            key={d.day}
                            className={`p-2.5 rounded-xl border transition-colors flex items-center justify-between ${
                              d.active
                                ? "border-amber-200 bg-amber-50/20 dark:border-amber-800/50 dark:bg-amber-950/20"
                                : "border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800/40"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span className={`w-2 h-2 rounded-full ${d.active ? "bg-amber-500 animate-pulse" : "bg-slate-300 dark:bg-slate-700"}`} />
                              <div>
                                <span className="text-[10px] font-bold text-amber-600 uppercase">{d.day}</span>
                                <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-none mt-0.5">{d.title}</h4>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-[9px] bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded font-medium">{d.type}</span>
                              <p className="text-[9px] text-slate-400 mt-0.5 font-bold">{d.dur}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* QUIZ TAB */}
                  {activeTab === "quiz" && (
                    <div className="space-y-4">
                      <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                        <span className="text-amber-500 font-bold mr-1">Q1.</span>
                        Where do the light-dependent reactions of photosynthesis specifically take place?
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {[
                          { id: 0, text: "A. Stroma of the chloroplast" },
                          { id: 1, text: "B. Thylakoid membrane", correct: true },
                          { id: 2, text: "C. Mitochondrial matrix" },
                          { id: 3, text: "D. Cytoplasm" },
                        ].map((opt) => {
                          const isSelected = quizSelectedOption === opt.id;
                          const hasSelectedAny = quizSelectedOption !== null;
                          let btnClass = "border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850";
                          
                          if (isSelected) {
                            if (opt.correct) {
                              btnClass = "border-green-200 bg-green-50 text-green-700 dark:border-green-900/50 dark:bg-green-950/20 dark:text-green-300";
                            } else {
                              btnClass = "border-red-200 bg-red-50 text-red-700 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-300";
                            }
                          } else if (hasSelectedAny && opt.correct) {
                            btnClass = "border-green-200 bg-green-50 text-green-700 dark:border-green-900/50 dark:bg-green-950/20 dark:text-green-300";
                          }

                          return (
                            <button
                              key={opt.id}
                              id={`mock-quiz-opt-${opt.id}`}
                              onClick={() => {
                                if (quizSelectedOption === null) setQuizSelectedOption(opt.id);
                              }}
                              className={`p-2.5 rounded-xl border text-left text-xs font-medium transition-all ${btnClass}`}
                            >
                              {opt.text}
                            </button>
                          );
                        })}
                      </div>

                      {quizSelectedOption !== null && (
                        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-850 text-[10px] text-slate-500 dark:text-slate-400">
                          {quizSelectedOption === 1 ? (
                            <span className="text-green-600 font-bold">✓ Correct! </span>
                          ) : (
                            <span className="text-red-500 font-bold">✗ Incorrect. </span>
                          )}
                          Chlorophyll is embedded in the thylakoid membrane where it absorbs light, triggering the light-dependent stage.
                        </div>
                      )}
                      
                      {quizSelectedOption === null && (
                        <p className="text-[10px] text-center text-slate-400 animate-pulse">Click any option to test interactive feedback!</p>
                      )}
                    </div>
                  )}

                  {/* FLASHCARDS TAB */}
                  {activeTab === "flashcards" && (
                    <div className="space-y-4 flex flex-col items-center">
                      <span className="text-[10px] text-slate-400">Click to flip the flashcard!</span>
                      
                      <div 
                        id="mock-flashcard-container"
                        onClick={() => setFlashcardFlipped(!flashcardFlipped)}
                        className="w-full max-w-[280px] h-[140px] perspective cursor-pointer"
                      >
                        <div className={`w-full h-full relative flip-card-inner rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm ${
                          flashcardFlipped ? "flip-card-flipped" : ""
                        }`}>
                          {/* Front */}
                          <div className="flip-card-front bg-white dark:bg-slate-800 p-4 flex flex-col items-center justify-center rounded-2xl">
                            <span className="text-[9px] uppercase font-bold tracking-wider text-amber-500 mb-2">Term</span>
                            <h4 className="serif-title text-base font-bold text-slate-800 dark:text-white text-center">Photolysis</h4>
                          </div>
                          
                          {/* Back */}
                          <div className="flip-card-back bg-slate-950 text-white p-4 flex flex-col items-center justify-center rounded-2xl">
                            <span className="text-[9px] uppercase font-bold tracking-wider text-amber-400 mb-2">Definition</span>
                            <p className="text-xs text-slate-200 text-center leading-relaxed">
                              The chemical splitting of water molecules into oxygen, hydrogen ions, and electrons by light energy during photosynthesis.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Bottom Footer inside card */}
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[9px] text-slate-400 font-semibold">
                    <span>STUDYING MADE SMART</span>
                    <button 
                      onClick={() => {
                        setQuizSelectedOption(null);
                        setFlashcardFlipped(false);
                      }}
                      className="flex items-center gap-1 text-slate-500 hover:text-amber-500"
                    >
                      <RefreshCw className="w-2.5 h-2.5" /> Reset View
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* Features Grid Section */}
        <section id="features" className="py-24 px-4 bg-slate-50/50 dark:bg-slate-900/30 border-y border-slate-100 dark:border-slate-800">
          <div className="max-w-6xl mx-auto space-y-12">
            
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <h2 className="serif-title text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                Everything you need to master exams.
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-base">
                Chronora takes the chaos out of studying by converting dense PDF material into structured, manageable, and highly effective components.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Sparkles className="w-6 h-6 text-amber-500" />,
                  title: "AI Core Summaries",
                  description: "Extract clean overviews and essential concepts from complicated textbooks and slides. Cut out the noise.",
                },
                {
                  icon: <Calendar className="w-6 h-6 text-amber-500" />,
                  title: "Daily Study Schedules",
                  description: "Recieve a day-by-day structured learning path. Know exactly what to read and when to practice.",
                },
                {
                  icon: <Award className="w-6 h-6 text-amber-500" />,
                  title: "Interactive Practice Quizzes",
                  description: "Generate deep learning quizzes with detailed explanations of right and wrong options.",
                },
                {
                  icon: <Layers className="w-6 h-6 text-amber-500" />,
                  title: "Smart Flashcards",
                  description: "Leverage active recall and spaced repetition with auto-generated cards covering key definitions.",
                },
                {
                  icon: <LineChart className="w-6 h-6 text-amber-500" />,
                  title: "Workload Estimation",
                  description: "Calculate approximate timelines based on word count. Distribute your work to avoid last-minute cramming.",
                },
                {
                  icon: <BookOpen className="w-6 h-6 text-amber-500" />,
                  title: "Multi-type PDF Processing",
                  description: "From lecture slides to full syllabi and chapters up to 50MB. Safe, secure, and parsed under a minute.",
                },
              ].map((feat, i) => (
                <div key={i} className="card-premium p-6 rounded-2xl flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/5 dark:bg-amber-500/10 flex items-center justify-center border border-amber-500/10">
                      {feat.icon}
                    </div>
                    <h3 className="serif-title text-lg font-bold text-slate-900 dark:text-white">{feat.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{feat.description}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* 3 Steps Section */}
        <section id="how-it-works" className="py-24 px-4 bg-white dark:bg-[#0f172a]">
          <div className="max-w-6xl mx-auto space-y-16">
            
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <h2 className="serif-title text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                How Chronora works
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-base">
                Get from uploaded files to ready-to-study materials in three quick steps.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              {/* Connector Line (Desktop) */}
              <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-slate-100 dark:bg-slate-800 z-0" />

              {[
                {
                  step: "01",
                  title: "Upload Study Materials",
                  description: "Drag & drop your lecture PDF, syllabi, or textbook chapter. We validate text readability instantly.",
                  icon: <Upload className="w-5 h-5 text-amber-600" />,
                },
                {
                  step: "02",
                  title: "AI Processes Content",
                  description: "Our engine reads the PDF text, extracts the central concepts, and constructs custom learning modules.",
                  icon: <Sparkles className="w-5 h-5 text-amber-600" />,
                },
                {
                  step: "03",
                  title: "Begin Master Track",
                  description: "Read structured summaries, solve the practice quizzes, review cards, and execute your study plan.",
                  icon: <BookOpenCheck className="w-5 h-5 text-amber-600" />,
                },
              ].map((step, index) => (
                <div key={index} className="flex flex-col items-center text-center space-y-4 relative z-10">
                  <div className="w-16 h-16 rounded-full bg-white dark:bg-slate-900 border-2 border-amber-500 flex items-center justify-center shadow-md">
                    <span className="text-slate-800 dark:text-amber-500 text-sm font-bold">{step.icon}</span>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold tracking-widest text-amber-600 uppercase">Step {step.step}</span>
                    <h3 className="serif-title text-lg font-bold text-slate-900 dark:text-white">{step.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs mx-auto">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-24 px-4 bg-slate-50/50 dark:bg-slate-900/30 border-y border-slate-100 dark:border-slate-800">
          <div className="max-w-6xl mx-auto space-y-16">
            
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <h2 className="serif-title text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                Simple, transparent pricing.
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-base">
                Start studying for free. Upgrade as you need more monthly uploads.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Free Tier",
                  price: "$0",
                  sub: "Free forever",
                  desc: "Ideal for individual student assignments.",
                  features: ["5 PDF uploads / month", "Gemini 2.5 Flash summaries", "Basic practice quizzes", "Spaced flashcards"],
                  cta: "Start Studying",
                  href: "/upload",
                  popular: false,
                },
                {
                  name: "Premium Scholar",
                  price: "$8",
                  sub: "/ month",
                  desc: "Perfect for full-time university students.",
                  features: ["Unlimited PDF uploads", "Gemini 2.5 Flash & Pro models", "Deep-dive mode available", "Advanced practice quizzes", "Unlimited study plans", "Priority processing speed"],
                  cta: "Go Premium",
                  href: "/upload",
                  popular: true,
                },
                {
                  name: "Study Circle",
                  price: "$24",
                  sub: "/ month",
                  desc: "Designed for study groups and teams.",
                  features: ["Collaborative study hubs", "Shared flashcard groups", "Team analytics dashboards", "CSV export options", "Dedicated group support"],
                  cta: "Start Group Track",
                  href: "/upload",
                  popular: false,
                },
              ].map((plan, i) => (
                <div 
                  key={i} 
                  className={`relative rounded-2xl p-8 flex flex-col justify-between ${
                    plan.popular
                      ? "bg-slate-900 text-white shadow-lg border-2 border-amber-500 dark:bg-slate-800"
                      : "bg-white border border-slate-100 dark:bg-slate-900 dark:border-slate-800"
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-950 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                      Most Popular
                    </span>
                  )}
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="serif-title text-lg font-bold">{plan.name}</h3>
                      <p className={`text-xs mt-1 ${plan.popular ? "text-slate-400" : "text-slate-500"}`}>{plan.desc}</p>
                    </div>

                    <div className="flex items-baseline">
                      <span className="serif-title text-4xl font-bold">{plan.price}</span>
                      <span className={`text-xs ml-1 ${plan.popular ? "text-slate-400" : "text-slate-500"}`}>{plan.sub}</span>
                    </div>

                    <ul className="space-y-3.5 border-t border-slate-100 dark:border-slate-800 pt-6">
                      {plan.features.map((f, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs">
                          <CheckCircle className={`w-4 h-4 flex-shrink-0 ${plan.popular ? "text-amber-400" : "text-amber-500"}`} />
                          <span className={plan.popular ? "text-slate-200" : "text-slate-600 dark:text-slate-350"}>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link href={plan.href} className="mt-8 block">
                    <button className={`w-full py-3 rounded-xl text-xs font-bold transition-all ${
                      plan.popular
                        ? "bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-md"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-white"
                    }`}>
                      {plan.cta}
                    </button>
                  </Link>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4 bg-slate-900 dark:bg-slate-950 text-white relative overflow-hidden border-t border-slate-800">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />
          <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
            <h2 className="serif-title text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              Ready to learn smarter? <br />
              Accelerate your progress today.
            </h2>
            <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              Stop struggling with hours of reading. Let Chronora organize your content, build study paths, and test your recall with AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/upload" className="w-full sm:w-auto">
                <button className="btn-amber text-slate-950 font-bold px-8 py-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg w-full sm:w-auto">
                  Get Started for Free
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}