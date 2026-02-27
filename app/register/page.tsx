"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import FormInput from "../components/FormInput";
import PasswordInput from "../components/PasswordInput";
import Footer from "../components/Footer";

export default function RegisterPage() {
  const [agreed, setAgreed] = useState(false);
  const [email, setEmail] = useState("");

  const UserIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  );

  const MailIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  );

  return (
    <div className="min-h-screen transition-colors duration-300 bg-gray-100 dark:bg-[#0f0f13]">
      <Navbar />

      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4 py-10">
        <div className="w-full max-w-sm rounded-2xl p-8 transition-all duration-300
          bg-white shadow-[0_0_0_1px_#e5e7eb,0_24px_48px_rgba(59,130,246,0.08)]
          dark:bg-[#1a1a22] dark:shadow-[0_0_0_1px_#2a2a38,0_24px_48px_rgba(0,0,0,0.4)]"
        >
          {/* Header */}
          <div className="text-center mb-5">
            <h1 className="text-2xl font-extrabold tracking-tight mb-1 text-gray-900 dark:text-gray-100">
              Create an account
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Start optimizing your study routine with AI today.
            </p>
          </div>

          {/* Google Button */}
          <button className="w-full flex items-center justify-center gap-2.5 py-2.5 rounded-xl border text-sm font-medium transition-colors duration-200 mb-4
            hover:border-blue-500
            bg-gray-50 border-gray-200 text-gray-700
            dark:bg-[#0f0f13] dark:border-[#2a2a38] dark:text-gray-200"
          >
            <svg width="18" height="18" viewBox="0 0 18 18">
              <path fill="#4285F4" d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z" />
              <path fill="#34A853" d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2.04a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17z" />
              <path fill="#FBBC05" d="M4.5 10.48A4.8 4.8 0 0 1 4.5 7.5V5.43H1.83a8 8 0 0 0 0 7.12z" />
              <path fill="#EA4335" d="M8.98 3.58c1.32 0 2.5.45 3.44 1.35l2.56-2.56A8 8 0 0 0 1.83 5.43L4.5 7.5c.68-2.01 2.54-3.92 4.48-3.92z" />
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-gray-200 dark:bg-[#2a2a38]" />
            <span className="text-[11px] whitespace-nowrap tracking-widest font-medium text-gray-400 dark:text-gray-600">
              OR CONTINUE WITH EMAIL
            </span>
            <div className="flex-1 h-px bg-gray-200 dark:bg-[#2a2a38]" />
          </div>

          {/* Form */}
          <div className="flex flex-col gap-3">
            <FormInput
              label="Full Name"
              placeholder="Jane Doe"
              icon={<UserIcon />}
            />

            <FormInput
              label="Email Address"
              type="email"
              placeholder="name@example.com"
              icon={<MailIcon />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              validate
            />

            <PasswordInput />

            {/* Checkbox */}
            <div className="flex items-start gap-2 mt-1">
              <input
                type="checkbox"
                id="terms"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 accent-blue-500 cursor-pointer"
              />
              <label htmlFor="terms" className="text-xs cursor-pointer leading-relaxed text-gray-500 dark:text-gray-400">
                I agree to the{" "}
                <a href="#" className="text-blue-500 hover:underline font-medium">
                  Terms of Service and Privacy Policy
                </a>
                .
              </label>
            </div>

            {/* Submit */}
            <button
              disabled={!agreed}
              className={`w-full py-3 rounded-xl text-white text-sm font-bold tracking-tight transition-all duration-200 mt-1
                ${agreed
                  ? "bg-blue-500 hover:bg-blue-600 active:scale-[0.98] cursor-pointer"
                  : "bg-gray-300 cursor-not-allowed dark:bg-gray-700"
                }`}
            >
              Create account →
            </button>
          </div>

          {/* Sign in */}
          <p className="text-center text-sm mt-5 text-gray-500 dark:text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 font-semibold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
