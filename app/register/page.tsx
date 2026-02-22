"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import FormInput from "../components/FormInput";
import PasswordInput from "../components/PasswordInput";
import Footer from "../components/Footer";

export default function ChronoraSignup() {
  const [agreed, setAgreed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap";
    document.head.appendChild(link);
  }, []);

  // Theme tokens
  const bg          = darkMode ? "#0f0f13" : "#f0f0f5";
  const cardBg      = darkMode ? "#1a1a22" : "#ffffff";
  const text        = darkMode ? "#e8e8f0" : "#1a1a2e";
  const subtext     = darkMode ? "#888"    : "#666";
  const inputBg     = darkMode ? "#0f0f13" : "#f8f8fc";
  const inputBorder = darkMode ? "#2a2a38" : "#e0e0ea";
  const inputText   = darkMode ? "#e8e8f0" : "#1a1a2e";

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
    <div
      style={{
        minHeight: "100vh",
        background: bg,
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
        transition: "background 0.3s",
      }}
    >
      <Navbar darkMode={darkMode} onToggleDarkMode={() => setDarkMode(!darkMode)} />

      {/* Main content */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "calc(100vh - 60px)",
          padding: "40px 16px",
        }}
      >
        {/* Card */}
        <div
          style={{
            background: cardBg,
            borderRadius: 20,
            padding: "28px 32px",
            width: "100%",
            maxWidth: 360,
            boxShadow: darkMode
              ? "0 0 0 1px #2a2a38, 0 24px 48px rgba(0,0,0,0.4)"
              : "0 0 0 1px #e0e0ea, 0 24px 48px rgba(79,110,247,0.08)",
            transition: "background 0.3s, box-shadow 0.3s",
          }}
        >
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <h1
              style={{
                margin: "0 0 8px",
                fontSize: 22,
                fontWeight: 800,
                color: text,
                letterSpacing: "-0.03em",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Create an account
            </h1>
            <p style={{ margin: 0, fontSize: 14, color: subtext }}>
              Start optimizing your study routine with AI today.
            </p>
          </div>

          {/* Google Button */}
          <button
            style={{
              width: "100%",
              padding: "11px",
              borderRadius: 10,
              border: `1px solid ${inputBorder}`,
              background: inputBg,
              color: text,
              fontSize: 14,
              fontWeight: 500,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              transition: "border-color 0.2s, background 0.2s",
              marginBottom: 16,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#3b82f6")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = inputBorder)}
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
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ flex: 1, height: 1, background: inputBorder }} />
            <span style={{ fontSize: 12, color: subtext, whiteSpace: "nowrap" }}>
              OR CONTINUE WITH EMAIL
            </span>
            <div style={{ flex: 1, height: 1, background: inputBorder }} />
          </div>

          {/* Form */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <FormInput
              label="Full Name"
              placeholder="Jane Doe"
              icon={<UserIcon />}
              inputBg={inputBg}
              inputBorder={inputBorder}
              inputText={inputText}
              labelColor={text}
            />

            <FormInput
              label="Email Address"
              type="email"
              placeholder="name@example.com"
              icon={<MailIcon />}
              inputBg={inputBg}
              inputBorder={inputBorder}
              inputText={inputText}
              labelColor={text}
            />

            <PasswordInput
              inputBg={inputBg}
              inputBorder={inputBorder}
              inputText={inputText}
              labelColor={text}
              subtextColor={subtext}
            />

            {/* Checkbox */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginTop: 2 }}>
              <input
                type="checkbox"
                id="terms"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                style={{ marginTop: 2, accentColor: "#3b82f6", cursor: "pointer" }}
              />
              <label htmlFor="terms" style={{ fontSize: 13, color: subtext, cursor: "pointer", lineHeight: 1.5 }}>
                I agree to the{" "}
                <a href="#" style={{ color: "#3b82f6", textDecoration: "none", fontWeight: 500 }}>
                  Terms of Service and Privacy Policy
                </a>
                .
              </label>
            </div>

            {/* Submit */}
            <button
              disabled={!agreed}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: 10,
                border: "none",
                background: agreed ? "#3b82f6" : "#ccc",
                color: "white",
                fontSize: 15,
                fontWeight: 700,
                cursor: agreed ? "pointer" : "not-allowed",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                transition: "opacity 0.2s, transform 0.1s",
                letterSpacing: "-0.01em",
                marginTop: 4,
              }}
              onMouseEnter={(e) => { if (agreed) e.currentTarget.style.opacity = "0.92"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
              onMouseDown={(e) => { if (agreed) e.currentTarget.style.transform = "scale(0.98)"; }}
              onMouseUp={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
            >
              Create account →
            </button>
          </div>

          {/* Sign in */}
          <p style={{ textAlign: "center", marginTop: 20, marginBottom: 0, fontSize: 14, color: subtext }}>
            Already have an account?{" "}
            <a href="#" style={{ color: "#3b82f6", textDecoration: "none", fontWeight: 600 }}>
              Sign In
            </a>
          </p>
        </div>
      </div>

      <Footer subtextColor={subtext} />
    </div>
  );
}
