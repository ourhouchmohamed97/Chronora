"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { use } from "react";

interface Props {
  params: Promise<{ token: string }>;
}

export default function ResetPasswordPage({ params }: Props) {
  const { token } = use(params);
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const isMatch = password === confirm;
  const isStrong = password.length >= 8;
  const canSubmit = password && confirm && isMatch && isStrong && !loading;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setLoading(true);
    setError("");

    const res = await fetch("/api/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "Something went wrong");
      return;
    }

    setDone(true);
    setTimeout(() => router.push("/login"), 3000);
  };

  return (
    <div className="min-h-screen transition-colors duration-300 bg-gray-100 dark:bg-[#0f0f13]">
      <Navbar />

      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4 py-10">
        <div className="w-full max-w-sm rounded-2xl p-8 transition-all duration-300
          bg-white shadow-[0_0_0_1px_#e5e7eb,0_24px_48px_rgba(59,130,246,0.08)]
          dark:bg-[#1a1a22] dark:shadow-[0_0_0_1px_#2a2a38,0_24px_48px_rgba(0,0,0,0.4)]"
        >
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a4 4 0 0 1 4 4v2H8V6a4 4 0 0 1 4-4z"/>
                <rect x="3" y="8" width="18" height="14" rx="2"/>
                <circle cx="12" cy="15" r="1.5" fill="#3b82f6"/>
              </svg>
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-extrabold tracking-tight mb-1 text-gray-900 dark:text-gray-100">
              New Password
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Choose a strong password to secure your account.
            </p>
          </div>

          {!done ? (
            <>
              {/* Password */}
              <div className="mb-3">
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                  New Password
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2a4 4 0 0 1 4 4v2H8V6a4 4 0 0 1 4-4z"/>
                      <rect x="3" y="8" width="18" height="14" rx="2"/>
                    </svg>
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Min. 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-10 py-2.5 rounded-xl text-sm border outline-none transition-colors
                      bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400
                      focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
                      dark:bg-[#0f0f13] dark:border-[#2a2a38] dark:text-gray-200 dark:placeholder-gray-600
                      dark:focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/>
                      </svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                      </svg>
                    )}
                  </button>
                </div>
                {password && !isStrong && (
                  <p className="text-xs text-red-400 mt-1">Password must be at least 8 characters</p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="mb-4">
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2a4 4 0 0 1 4 4v2H8V6a4 4 0 0 1 4-4z"/>
                      <rect x="3" y="8" width="18" height="14" rx="2"/>
                    </svg>
                  </span>
                  <input
                    type={showConfirm ? "text" : "password"}
                    placeholder="Repeat your password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    className="w-full pl-9 pr-10 py-2.5 rounded-xl text-sm border outline-none transition-colors
                      bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400
                      focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
                      dark:bg-[#0f0f13] dark:border-[#2a2a38] dark:text-gray-200 dark:placeholder-gray-600
                      dark:focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirm ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/>
                      </svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                      </svg>
                    )}
                  </button>
                </div>
                {confirm && !isMatch && (
                  <p className="text-xs text-red-400 mt-1">Passwords do not match</p>
                )}
              </div>

              {/* Error */}
              {error && (
                <p className="text-xs text-red-400 text-center mb-3">{error}</p>
              )}

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={!canSubmit}
                className={`w-full py-3 rounded-xl text-white text-sm font-bold tracking-tight transition-all duration-200
                  ${canSubmit
                    ? "bg-blue-500 hover:bg-blue-600 active:scale-[0.98] cursor-pointer"
                    : "bg-blue-300 cursor-not-allowed"
                  }`}
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="w-12 h-12 rounded-full bg-green-50 dark:bg-green-500/10 flex items-center justify-center mx-auto mb-3">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5"/>
                </svg>
              </div>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-1">Password reset!</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Redirecting to login...
              </p>
            </div>
          )}

          {/* Back to login */}
          <div className="text-center mt-4">
            <Link
              href="/login"
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors flex items-center justify-center gap-1"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6"/>
              </svg>
              Back to Login
            </Link>
          </div>

          {/* Terms */}
          <p className="text-center text-xs text-gray-400 dark:text-gray-600 mt-6 border-t border-gray-100 dark:border-[#2a2a38] pt-4">
            By continuing, you agree to our{" "}
            <a href="#" className="text-blue-500 hover:underline">Terms of Service</a>
            {" "}and{" "}
            <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a>
            .
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
