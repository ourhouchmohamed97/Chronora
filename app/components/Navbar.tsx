"use client";

interface NavbarProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function Navbar({ darkMode, onToggleDarkMode }: NavbarProps) {
  const cardBg = darkMode ? "#1a1a22" : "#ffffff";
  const text = darkMode ? "#e8e8f0" : "#1a1a2e";
  const subtext = darkMode ? "#888" : "#666";
  const inputBorder = darkMode ? "#2a2a38" : "#e0e0ea";

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 48px",
        height: "60px",
        background: cardBg,
        borderBottom: `1px solid ${inputBorder}`,
        position: "sticky",
        top: 0,
        zIndex: 100,
        transition: "background 0.3s, border-color 0.3s",
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <img src="/images/chronora_logo.png" alt="Chronora" style={{ height: 100, width: "auto" }} />
      </div>

      {/* Nav Links */}
      <div style={{ display: "flex", gap: 32 }}>
        {["Features", "How it works", "Pricing"].map((item) => (
          <a
            key={item}
            href="#"
            style={{
              color: subtext,
              textDecoration: "none",
              fontSize: 14,
              fontWeight: 500,
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#3b82f6")}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = subtext)}
          >
            {item}
          </a>
        ))}
      </div>

      {/* Right side */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button
          onClick={onToggleDarkMode}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 16,
            color: subtext,
            padding: "4px 6px",
            borderRadius: 6,
          }}
          aria-label="Toggle dark mode"
        >
          {darkMode ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          )}
        </button>
        <a
          href="#"
          style={{ color: text, textDecoration: "none", fontSize: 14, fontWeight: 500 }}
        >
          Sign In
        </a>
        <button
          style={{
            background: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: 8,
            padding: "8px 16px",
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Start Free
        </button>
      </div>
    </nav>
  );
}
