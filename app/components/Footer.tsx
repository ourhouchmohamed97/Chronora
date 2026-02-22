"use client";

interface FooterProps {
  subtextColor: string;
}

export default function Footer({ subtextColor }: FooterProps) {
  return (
    <footer
      style={{
        textAlign: "center",
        padding: "16px 0 24px",
        display: "flex",
        justifyContent: "center",
        gap: 24,
      }}
    >
      {["Help Center", "Status", "Safety"].map((item) => (
        <a
          key={item}
          href="#"
          style={{
            fontSize: 13,
            color: subtextColor,
            textDecoration: "none",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#3b82f6")}
          onMouseLeave={(e) => ((e.target as HTMLElement).style.color = subtextColor)}
        >
          {item}
        </a>
      ))}
    </footer>
  );
}
