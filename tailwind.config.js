/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          instrument: ["var(--font-instrument-serif)", "serif"],
          outfit: ["var(--font-outfit)", "sans-serif"],
          geistMono: ["var(--font-geist-mono)", "monospace"],
        },
        colors: {
          "card-light": "#f4f5f7",
          "card-dark": "#323743",
        },
      },
    },
    plugins: [],
  };