"use client";

import { useState } from "react";
import FormInput from "./FormInput";

interface PasswordInputProps {
  hideLabel?: boolean;
  hideSecurityBar?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function getSecurityLevel(pw: string) {
  if (!pw) return { label: "EMPTY", color: "text-gray-400", bar: "bg-gray-300", width: "w-0" };
  if (pw.length < 6) return { label: "WEAK", color: "text-red-500", bar: "bg-red-500", width: "w-1/4" };
  if (pw.length < 10) return { label: "FAIR", color: "text-amber-500", bar: "bg-amber-500", width: "w-1/2" };
  if (pw.length < 14) return { label: "GOOD", color: "text-blue-500", bar: "bg-blue-500", width: "w-3/4" };
  return { label: "STRONG", color: "text-green-500", bar: "bg-green-500", width: "w-full" };
}

export default function PasswordInput({
  hideLabel = false,
  hideSecurityBar = false,
  value,
  onChange,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [internalPassword, setInternalPassword] = useState("");

  // If value prop is passed → use it (controlled by parent)
  // If not → use internal state (self-managed)
  const password = value !== undefined ? value : internalPassword;
  const handleChange = onChange ?? ((e: React.ChangeEvent<HTMLInputElement>) => setInternalPassword(e.target.value));

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
      className="flex items-center transition-colors text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
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
        label={hideLabel ? "" : "Password"}
        type={showPassword ? "text" : "password"}
        placeholder="········"
        value={password}
        onChange={handleChange}
        icon={<LockIcon />}
        rightElement={<EyeToggle />}
      />

      {!hideSecurityBar && (
        <div className="mt-2">
          <div className="flex justify-between mb-1">
            <span className="text-[10px] font-semibold tracking-widest uppercase text-gray-400 dark:text-gray-500">
              Security Level
            </span>
            <span className={`text-[10px] font-bold tracking-widest uppercase ${security.color}`}>
              {security.label}
            </span>
          </div>
          <div className="h-1 rounded-full overflow-hidden bg-gray-200 dark:bg-[#2a2a38]">
            <div className={`h-full rounded-full transition-all duration-500 ${security.bar} ${security.width}`} />
          </div>
        </div>
      )}
    </div>
  );
}
