"use client";

import { ReactNode, useState } from "react";

interface FormInputProps {
  label: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: ReactNode;
  rightElement?: ReactNode;
  validate?: boolean;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function FormInput({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  icon,
  rightElement,
  validate = false,
}: FormInputProps) {
  const [touched, setTouched] = useState(false);

  const isEmpty = validate && type === "email" && touched && value !== undefined && value.length === 0;
  const hasError = validate && type === "email" && touched && value !== undefined && value.length > 0 && !isValidEmail(value);
  const isValid = validate && type === "email" && touched && value !== undefined && value.length > 0 && isValidEmail(value);

  const errorMessage = isEmpty
    ? "Email is required."
    : hasError
    ? "Please enter a valid email address."
    : null;

  return (
    <div>
      {label && (
        <label className="block text-xs font-semibold mb-1.5 text-gray-800 dark:text-gray-200">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className={`absolute left-3 top-1/2 -translate-y-1/2 flex items-center
            ${errorMessage ? "text-red-400" : isValid ? "text-green-500" : "text-gray-400 dark:text-gray-500"}`}>
            {icon}
          </span>
        )}

        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={() => setTouched(true)}
          className={`w-full rounded-xl border text-sm outline-none transition-colors duration-200
            ${icon ? "pl-9" : "pl-3"}
            ${rightElement || isValid || errorMessage ? "pr-10" : "pr-3"}
            py-2.5
            bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400
            dark:bg-[#0f0f13] dark:border-[#2a2a38] dark:text-gray-100 dark:placeholder-gray-600
            ${errorMessage
              ? "border-red-400 focus:border-red-500 dark:border-red-400 dark:focus:border-red-500"
              : isValid
              ? "border-green-400 focus:border-green-500 dark:border-green-400 dark:focus:border-green-500"
              : "focus:border-blue-500"
            }`}
        />

        <span className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
          {rightElement ?? (
            errorMessage ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            ) : isValid ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            ) : null
          )}
        </span>
      </div>

      {errorMessage && (
        <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          {errorMessage}
        </p>
      )}
    </div>
  );
}