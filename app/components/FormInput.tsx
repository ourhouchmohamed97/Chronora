"use client";

import { ReactNode, CSSProperties } from "react";

interface FormInputProps {
  label: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: ReactNode;
  rightElement?: ReactNode;
  darkMode?: boolean;
}

export default function FormInput({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  icon,
  rightElement,
  darkMode = false,
}: FormInputProps) {
  return (
    <div>
      <label className={`block text-xs font-semibold mb-1.5 ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
        {label}
      </label>
      <div className="relative">
        {icon && (
          <span className={`absolute left-3 top-1/2 -translate-y-1/2 flex items-center ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
            {icon}
          </span>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full rounded-xl border text-sm outline-none transition-colors duration-200
            focus:border-blue-500
            ${icon ? "pl-9" : "pl-3"}
            ${rightElement ? "pr-10" : "pr-3"}
            py-2.5
            ${darkMode
              ? "bg-[#0f0f13] border-[#2a2a38] text-gray-100 placeholder-gray-600"
              : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400"
            }`}
        />
        {rightElement && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
            {rightElement}
          </span>
        )}
      </div>
    </div>
  );
}
