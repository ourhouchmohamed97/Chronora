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
  inputBg: string;
  inputBorder: string;
  inputText: string;
  labelColor: string;
  extraStyle?: CSSProperties;
}

export default function FormInput({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  icon,
  rightElement,
  inputBg,
  inputBorder,
  inputText,
  labelColor,
  extraStyle,
}: FormInputProps) {
  return (
    <div>
      <label
        style={{
          display: "block",
          fontSize: 13,
          fontWeight: 600,
          color: labelColor,
          marginBottom: 6,
        }}
      >
        {label}
      </label>
      <div style={{ position: "relative" }}>
        {icon && (
          <span
            style={{
              position: "absolute",
              left: 12,
              top: "50%",
              transform: "translateY(-50%)",
              color: "#666",
              fontSize: 14,
              display: "flex",
              alignItems: "center",
            }}
          >
            {icon}
          </span>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          style={{
            width: "100%",
            padding: `10px ${rightElement ? "40px" : "12px"} 10px ${icon ? "36px" : "12px"}`,
            border: `1px solid ${inputBorder}`,
            borderRadius: 10,
            background: inputBg,
            color: inputText,
            fontSize: 14,
            outline: "none",
            boxSizing: "border-box",
            transition: "border-color 0.2s",
            ...extraStyle,
          }}
          onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
          onBlur={(e) => (e.target.style.borderColor = inputBorder)}
        />
        {rightElement && (
          <span
            style={{
              position: "absolute",
              right: 12,
              top: "50%",
              transform: "translateY(-50%)",
              display: "flex",
              alignItems: "center",
            }}
          >
            {rightElement}
          </span>
        )}
      </div>
    </div>
  );
}
