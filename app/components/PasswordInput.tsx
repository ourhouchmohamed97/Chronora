"use client";

import { useState } from "react";
import FormInput from "./FormInput";

interface PasswordInputProps {
  inputBg: string;
  inputBorder: string;
  inputText: string;
  labelColor: string;
  subtextColor: string;
}

function getSecurityLevel(pw: string) {
  if (!pw) return { label: "EMPTY", color: "#aaa", width: "0%" };
  if (pw.length < 6) return { label: "WEAK", color: "#ef4444", width: "25%" };
  if (pw.length < 10) return { label: "FAIR", color: "#f59e0b", width: "50%" };
  if (pw.length < 14) return { label: "GOOD", color: "#3b82f6", width: "75%" };
  return { label: "STRONG", color: "#22c55e", width: "100%" };
}

export default function PasswordInput({
  inputBg,
  inputBorder,
  inputText,
  labelColor,
  subtextColor,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const security = getSecurityLevel(password);

  const LockIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  );

  const EyeToggle = () => (
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        color: subtextColor,
        padding: 0,
        display: "flex",
        alignItems: "center",
      }}
    >
      {showPassword ? (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
          <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
          <line x1="1" y1="1" x2="23" y2="23"/>
        </svg>
      ) : (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      )}
    </button>
  );

  return (
    <div>
      <FormInput
        label="Password"
        type={showPassword ? "text" : "password"}
        placeholder="········"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        icon={<LockIcon />}
        rightElement={<EyeToggle />}
        inputBg={inputBg}
        inputBorder={inputBorder}
        inputText={inputText}
        labelColor={labelColor}
      />

      {/* Security bar */}
      <div style={{ marginTop: 8 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
          <span style={{ fontSize: 11, color: subtextColor, letterSpacing: "0.06em", fontWeight: 600 }}>
            SECURITY LEVEL
          </span>
          <span style={{ fontSize: 11, fontWeight: 700, color: security.color, letterSpacing: "0.06em" }}>
            {security.label}
          </span>
        </div>
        <div style={{ height: 3, background: inputBorder, borderRadius: 99, overflow: "hidden" }}>
          <div
            style={{
              height: "100%",
              width: security.width,
              background: security.color,
              borderRadius: 99,
              transition: "width 0.4s ease, background 0.4s ease",
            }}
          />
        </div>
      </div>
    </div>
  );
}
