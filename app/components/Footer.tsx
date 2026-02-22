"use client";

interface FooterProps {
  darkMode?: boolean;
}

export default function Footer({ darkMode = false }: FooterProps) {
  return (
    <footer className="flex justify-center gap-6 py-6">
      {["Help Center", "Status", "Safety"].map((item) => (
        <a
          key={item}
          href="#"
          className={`text-xs transition-colors duration-200 hover:text-blue-500 ${darkMode ? "text-gray-500" : "text-gray-400"}`}
        >
          {item}
        </a>
      ))}
    </footer>
  );
}
