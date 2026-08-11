"use client";

import Link from "next/link";
import { useState } from "react";
import { useTheme } from "../providers/ThemeProvider";

export default function Navbar() {
  const { toggleDarkMode, darkMode } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b transition-colors duration-300 bg-white border-gray-200 dark:bg-[#1a1a22] dark:border-[#2a2a38]">
      <div className="flex items-center justify-between px-4 sm:px-8 lg:px-12 h-16">

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img src="/images/chronora_logo.png" alt="Chronora" className="h-25 sm:h-25 md:h-25 w-auto" />
        </Link>

        {/* Nav Links — hidden on mobile */}
        <div className="hidden md:flex gap-8">
          {[
            { label: "Features", href: "/#features" },
            { label: "How it works", href: "/#how-it-works" },
            { label: "Pricing", href: "/#pricing" },
            { label: "Upload PDF", href: "/upload" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-slate-650 hover:text-amber-500 text-sm font-medium transition-colors duration-200 dark:text-slate-400 dark:hover:text-amber-500"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
            className="p-1.5 rounded-md transition-colors text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
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

          {/* Sign In — hidden on mobile */}
          <Link
            href="/login"
            className="hidden sm:block text-slate-700 hover:text-amber-500 text-sm font-medium transition-colors dark:text-slate-200 dark:hover:text-amber-500"
          >
            Sign In
          </Link>

          <Link href="/register">
            <button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs sm:text-sm font-semibold px-3 sm:px-4 py-2 rounded-lg transition-all duration-200 shadow-sm cursor-pointer">
              Start Free
            </button>
          </Link>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-1.5 rounded-md text-gray-600 dark:text-gray-400"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-3 border-t border-gray-100 dark:border-[#2a2a38]">
          {[
            { label: "Features", href: "/#features" },
            { label: "How it works", href: "/#how-it-works" },
            { label: "Pricing", href: "/#pricing" },
            { label: "Upload PDF", href: "/upload" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="text-slate-650 hover:text-amber-500 text-sm font-medium py-1 transition-colors dark:text-slate-400 dark:hover:text-amber-500"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/login"
            onClick={() => setMenuOpen(false)}
            className="text-slate-800 hover:text-amber-500 text-sm font-medium py-1 transition-colors dark:text-slate-200 dark:hover:text-amber-500"
          >
            Sign In
          </Link>
        </div>
      )}
    </nav>
  );
}