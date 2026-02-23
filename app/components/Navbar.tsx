"use client";

interface NavbarProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function Navbar({ darkMode, onToggleDarkMode }: NavbarProps) {
  return (
    <nav className={`flex items-center justify-between px-12 h-16 sticky top-0 z-50 border-b transition-colors duration-300 ${darkMode ? "bg-[#1a1a22] border-[#2a2a38]" : "bg-white border-gray-200"}`}>
      
      {/* Logo */}
      <div className="flex items-center">
        <img src="/images/chronora_logo.png" alt="Chronora" className="h-30 w-auto" />
      </div>

      {/* Nav Links */}
      <div className="flex gap-8">
        {["Features", "How it works", "Pricing"].map((item) => (
          <a
            key={item}
            href="#"
            className={`text-sm font-medium transition-colors duration-200 hover:text-blue-500 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
          >
            {item}
          </a>
        ))}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Dark mode toggle */}
        <button
          onClick={onToggleDarkMode}
          aria-label="Toggle dark mode"
          className={`p-1.5 rounded-md transition-colors ${darkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-500 hover:text-gray-800"}`}
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
          className={`text-sm font-medium transition-colors hover:text-blue-500 ${darkMode ? "text-gray-200" : "text-gray-800"}`}
        >
          Sign In
        </a>

        <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors duration-200">
          Start Free
        </button>
      </div>
    </nav>
  );
}