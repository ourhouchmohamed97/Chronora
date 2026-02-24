"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import FormInput from "../components/FormInput";
import { useTheme } from "../providers/ThemeProvider";
import Footer from "../components/Footer";


export default function ForgotPasswordPage() {
  const { darkMode } = useTheme();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const MailIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  );

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-[#0f0f13]" : "bg-gray-100"}`}>
      <Navbar />

      {/* Main content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4 sm:px-6 py-6 sm:py-10">
        <div className="w-full max-w-sm sm:max-w-md flex flex-col gap-4">

          {/* Card */}
          <div className={`w-full rounded-2xl p-8 transition-all duration-300
            ${darkMode
              ? "bg-[#1a1a22] shadow-[0_0_0_1px_#2a2a38,0_24px_48px_rgba(0,0,0,0.4)]"
              : "bg-white shadow-[0_0_0_1px_#e5e7eb,0_24px_48px_rgba(59,130,246,0.08)]"
            }`}
          >
            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center ${darkMode ? "bg-[#2a2a38]" : "bg-blue-50"}`}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>
            </div>

            {/* Header */}
            <div className="text-center mb-6">
              <h1 className={`text-2xl font-extrabold tracking-tight mb-2 ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                Reset Password
              </h1>
              <p className={`text-sm leading-relaxed ${darkMode ? "text-gray-500" : "text-gray-500"}`}>
                Enter your email address and we will send you a link<br className="hidden sm:block" /> to reset your password.
              </p>
            </div>

            {/* Form */}
            {!sent ? (
              <div className="flex flex-col gap-4">
                <FormInput
                  label="Email Address"
                  type="email"
                  placeholder="name@example.com"
                  icon={<MailIcon />}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  validate
                />

                <button
                  onClick={() => email.length > 0 && setSent(true)}
                  className={`w-full py-3 rounded-xl text-white text-sm font-bold tracking-tight transition-all duration-200
                    ${email.length > 0
                      ? "bg-blue-500 hover:bg-blue-600 active:scale-[0.98] cursor-pointer"
                      : "bg-blue-300 cursor-not-allowed"
                    }`}
                >
                  Send Recovery Email
                </button>
              </div>
            ) : (
              /* Success state */
              <div className={`text-center py-3 px-4 rounded-xl text-sm font-medium ${darkMode ? "bg-green-900/30 text-green-400" : "bg-green-50 text-green-600"}`}>
                ✓ Recovery email sent! Check your inbox.
              </div>
            )}

            {/* Back to login */}
            <div className="flex justify-center mt-5">
              <Link
                href="/login"
                className={`flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-blue-500 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
                </svg>
                Back to Login
              </Link>
            </div>
          </div>

          {/* Terms */}
          <p className={`text-center text-xs leading-relaxed ${darkMode ? "text-gray-600" : "text-gray-400"}`}>
            By continuing, you agree to our{" "}
            <a href="#" className="text-blue-500 hover:underline">Terms of Service</a>
            {" "}and{" "}
            <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a>.
          </p>

          {/* Contact links */}
          <div className="flex justify-center items-center gap-3">
            <a href="#" className={`text-xs transition-colors hover:text-blue-500 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
              Contact Support
            </a>
            <span className={`text-xs ${darkMode ? "text-gray-700" : "text-gray-300"}`}>•</span>
            <a href="#" className={`text-xs transition-colors hover:text-blue-500 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
              Help Center
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
