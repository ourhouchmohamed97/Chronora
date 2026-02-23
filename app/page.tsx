import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import {
  TrendingUp,
  Calendar,
  Scale,
  Clock,
  Zap,
  Layers,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

export default function Home() {
  return (
    <div
      className="min-h-screen bg-white font-sans overflow-x-hidden"
      style={{ fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Sora:wght@400;600;700;800&display=swap');
        * { box-sizing: border-box; }
        .hero-title { font-family: 'Sora', sans-serif; }
        .gradient-text { background: linear-gradient(135deg, #3B5BDB 0%, #7048E8 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        @keyframes float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }
        @keyframes pulse-ring { 0% { transform: scale(1); opacity: 0.4; } 100% { transform: scale(1.5); opacity: 0; } }
        .float { animation: float 6s ease-in-out infinite; }
        .fade-up-1 { animation: fadeUp 0.7s ease both; }
        .fade-up-2 { animation: fadeUp 0.7s 0.15s ease both; }
        .fade-up-3 { animation: fadeUp 0.7s 0.3s ease both; }
        .fade-up-4 { animation: fadeUp 0.7s 0.45s ease both; }
        .fade-in-5 { animation: scaleIn 0.8s 0.55s ease both; }
        .dashboard-shadow { box-shadow: 0 30px 80px rgba(59, 91, 219, 0.18), 0 8px 24px rgba(0,0,0,0.08); }
        .card-hover { transition: transform 0.25s ease, box-shadow 0.25s ease; }
        .card-hover:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(59,91,219,0.15); }
        .btn-primary { background: linear-gradient(135deg, #3B5BDB, #7048E8); transition: transform 0.2s, box-shadow 0.2s; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(59, 91, 219, 0.4); }
        .step-line::after { content: ''; position: absolute; top: 50%; left: 100%; width: 100%; height: 2px; background: linear-gradient(90deg, #3B5BDB, #7048E8); transform: translateY(-50%); }
        .noise { background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E"); }
        .pricing-card-featured { background: linear-gradient(135deg, #3B5BDB 0%, #7048E8 100%); }
        .testimonial-card { backdrop-filter: blur(10px); }
      `}</style>
      
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-28 pb-16 px-6 relative overflow-hidden">
          <div className="absolute inset-0 noise pointer-events-none" />
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full opacity-10 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse, #3B5BDB 0%, transparent 70%)",
            }}
          />

          <div className="max-w-3xl mx-auto text-center">
            <div className="fade-up-1 inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              Now with Advanced Deadline Prediction
            </div>

            <h1 className="hero-title fade-up-2 text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-tight mb-5">
              Study <span className="gradient-text italic">Smarter,</span>
              <br />
              Not Harder.
            </h1>

            <p className="fade-up-3 text-lg text-slate-500 max-w-xl mx-auto mb-8 leading-relaxed">
              Unlock your full academic potential with our AI-driven scheduler.
              We analyze your workload, predict deadlines, and create the
              perfect study routine tailored just for you.
            </p>

            <div className="fade-up-4 flex flex-col sm:flex-row items-center justify-center gap-3 mb-14">
              <button className="btn-primary text-white font-semibold px-7 py-3.5 rounded-xl flex items-center gap-2 shadow-lg">
                Start Free Trial
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </button>
              <button className="text-slate-700 font-semibold px-7 py-3.5 rounded-xl border border-slate-200 hover:border-blue-300 hover:text-blue-600 transition-all flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                View Demo
              </button>
            </div>

            {/* Dashboard Mockup */}
            <div className="fade-in-5 float relative mx-auto max-w-2xl">
              <div className="dashboard-shadow rounded-2xl border border-slate-100 bg-white overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100">
                  <div>
                    <p className="text-xs font-semibold text-slate-800">
                      Performance Analytics
                    </p>
                    <p className="text-[10px] text-slate-400">
                      Track your progress and optimize your learning efficiency
                    </p>
                  </div>
                  <div className="flex gap-1.5">
                    {["Weekly", "Monthly", "Semester"].map((t, i) => (
                      <button
                        key={t}
                        className={`text-[10px] px-2.5 py-1 rounded-md font-medium ${
                          i === 0
                            ? "bg-blue-600 text-white"
                            : "text-slate-500 hover:bg-slate-50"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                    <button className="text-[10px] px-2.5 py-1 rounded-md text-slate-500 border border-slate-200 flex items-center gap-1">
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                        />
                      </svg>
                      Export
                    </button>
                  </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-4 gap-px bg-slate-100 border-b border-slate-100">
                  {[
                    {
                      label: "Total Study Hours",
                      value: "28.4 hrs",
                      delta: "+13.8%",
                      pos: true,
                    },
                    {
                      label: "Task Completion",
                      value: "91%",
                      delta: "+4.2%",
                      pos: true,
                    },
                    {
                      label: "Overdue Tasks",
                      value: "3",
                      delta: "",
                      pos: false,
                    },
                    {
                      label: "Avg. Focus Depth",
                      value: "42 min",
                      delta: "-1:00",
                      pos: false,
                    },
                  ].map((s) => (
                    <div key={s.label} className="bg-white p-3">
                      <p className="text-[9px] text-slate-400 mb-1">
                        {s.label}
                      </p>
                      <p className="text-base font-bold text-slate-800">
                        {s.value}
                      </p>
                      {s.delta && (
                        <p
                          className={`text-[9px] font-medium ${
                            s.delta.startsWith("+")
                              ? "text-emerald-500"
                              : "text-red-400"
                          }`}
                        >
                          {s.delta}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Charts */}
                <div className="grid grid-cols-2 gap-4 p-4">
                  {/* Bar chart */}
                  <div className="bg-slate-50 rounded-xl p-3">
                    <p className="text-[10px] font-semibold text-slate-700 mb-3">
                      Task Completion Trend
                    </p>
                    <div className="flex items-end gap-1 h-16">
                      {[35, 55, 45, 72, 60, 85, 78, 90, 82, 95].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-sm"
                          style={{
                            height: `${h}%`,
                            background:
                              i > 6
                                ? "linear-gradient(180deg, #3B5BDB, #7048E8)"
                                : "#E2E8F0",
                          }}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between mt-2">
                      {["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"].map(
                        (w) => (
                          <span key={w} className="text-[8px] text-slate-400">
                            {w}
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  {/* Radial */}
                  <div className="bg-slate-50 rounded-xl p-3 flex flex-col items-center">
                    <p className="text-[10px] font-semibold text-slate-700 mb-2 self-start">
                      Productivity Pulse
                    </p>
                    <div className="relative w-16 h-16 my-1">
                      <svg
                        className="w-full h-full -rotate-90"
                        viewBox="0 0 36 36"
                      >
                        <circle
                          cx="18"
                          cy="18"
                          r="15.9"
                          fill="none"
                          stroke="#E2E8F0"
                          strokeWidth="3"
                        />
                        <circle
                          cx="18"
                          cy="18"
                          r="15.9"
                          fill="none"
                          stroke="url(#grad)"
                          strokeWidth="3"
                          strokeDasharray="88, 100"
                          strokeLinecap="round"
                        />
                        <defs>
                          <linearGradient
                            id="grad"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                          >
                            <stop offset="0%" stopColor="#3B5BDB" />
                            <stop offset="100%" stopColor="#7048E8" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm font-bold text-slate-800">
                          88
                        </span>
                      </div>
                    </div>
                    <div className="w-full space-y-1 mt-1">
                      {[
                        { label: "Deep work %", val: "34%" },
                        { label: "Distraction rate", val: "9%" },
                      ].map((s) => (
                        <div key={s.label} className="flex justify-between">
                          <span className="text-[9px] text-slate-500">
                            {s.label}
                          </span>
                          <span className="text-[9px] font-semibold text-slate-700">
                            {s.val}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
              Master Your Schedule
            </h2>
            <p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto">
              Our suite of intelligent tools takes the guesswork out of
              planning, allowing you to focus on what actually matters—learning.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Zap className="w-8 h-8 text-indigo-600" />,
                  title: "AI Smart Scheduling",
                  description:
                    "Our algorithm learns your peak focus times and automatically sorts difficult subjects when you're most productive.",
                },
                {
                  icon: <Scale className="w-8 h-8 text-indigo-600" />,
                  title: "Workload Balancing",
                  description:
                    "Visualize your weekly efforts. We automatically redistribute tasks if your 'stress score' hits critical levels.",
                },
                {
                  icon: <Clock className="w-8 h-8 text-indigo-600" />,
                  title: "Deadline Prediction",
                  description:
                    "Based on past performance and complexity, we tell you exactly when to start a project to finish stress-free.",
                },
                {
                  icon: <Layers className="w-8 h-8 text-indigo-600" />,
                  title: "Distribution Free",
                  description:
                    "Sync with your browser to automatically block distracting apps during your scheduled deep-work sessions.",
                },
                {
                  icon: <TrendingUp className="w-8 h-8 text-indigo-600" />,
                  title: "Instant Adjustments",
                  description:
                    "Life happens. If you miss a block, simply tell the AI and your entire plan recalibrates in seconds.",
                },
                {
                  icon: <Calendar className="w-8 h-8 text-indigo-600" />,
                  title: "Full Integration",
                  description:
                    "Works seamlessly with Google Calendar, Outlook, and Notion to keep your whole life in one single view.",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition"
                >
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3 Steps Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
              Your Path to 4.0 in 3 Steps
            </h2>
            <p className="text-xl text-gray-600 mb-12 text-center">
              Simple, automated, and powerful. Getting started takes less than
              two minutes.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Sync Your Data",
                  description:
                    "Connect your syllabus, calendars, and current task lists. We securely import all your commitments.",
                },
                {
                  step: "02",
                  title: "AI Analyzes",
                  description:
                    "The engine identifies deadlines, evaluates task complexity, and checks your available hours.",
                },
                {
                  step: "03",
                  title: "Optimized Plan",
                  description:
                    "Receive a pixel-perfect daily routine that maximizes learning while preserving your mental health.",
                },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-indigo-600">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
              Simple Pricing for Every Goal
            </h2>
            <p className="text-xl text-gray-600 mb-12 text-center">
              Start for free and upgrade as you grow. No hidden fees, cancel
              anytime.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  name: "Student",
                  price: "$0",
                  period: "/mo",
                  description: "Perfect for high school or casual learners.",
                  features: [
                    "Basic analytics",
                    "Task scheduling",
                    "Email support",
                  ],
                },
                {
                  name: "Professor",
                  price: "$12",
                  period: "/mo",
                  description:
                    "Designed for university students & power users.",
                  features: [
                    "Advanced analytics",
                    "Priority support",
                    "Team features",
                    "API access",
                  ],
                  popular: true,
                },
                {
                  name: "Marketing",
                  price: "$29",
                  period: "/mo",
                  description:
                    "For students and professionals who want to improve.",
                  features: [
                    "All features",
                    "Custom integrations",
                    "Dedicated support",
                  ],
                },
                {
                  name: "Team",
                  price: "$29",
                  period: "/mo",
                  description: "For teams of 3 or more.",
                  features: [
                    "Team management",
                    "Collaboration tools",
                    "Analytics dashboard",
                    "24/7 support",
                  ],
                },
              ].map((plan, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition relative ${
                    plan.popular ? "border-2 border-indigo-600" : ""
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm">
                      Most Popular
                    </span>
                  )}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-indigo-600">
                      {plan.price}
                    </span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-600">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`w-full py-2 rounded-lg font-semibold transition ${
                      plan.popular
                        ? "bg-indigo-600 text-white hover:bg-indigo-700"
                        : "border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50"
                    }`}
                  >
                    Get Started
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-indigo-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to reclaim your time?
            </h2>
            <p className="text-xl text-indigo-100 mb-10">
              Stop stressing about deadlines. Let our AI handle the planning so
              you can focus on the learning. Join thousands of successful
              students today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-indigo-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition shadow-lg flex items-center justify-center gap-2">
                Join for Free <ArrowRight className="w-5 h-5" />
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition">
                Schedule a Demo
              </button>
            </div>
            <p className="text-indigo-200 mt-6">
              No credit card required.{" "}
              <span className="font-semibold">
                Free forever version available.
              </span>
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
