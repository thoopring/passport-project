import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Vermilion — DESIGN.md brand color, re-adopted after drift to mauve.
        brand: {
          50: "#FDF2EF",
          100: "#FADFD8",
          200: "#F4B4A5",
          300: "#EC8872",
          400: "#E06241",
          500: "#D4442B",
          600: "#B03720",
          700: "#8A2A18",
          800: "#631E11",
          900: "#40130A",
          950: "#240905",
        },
        accent: {
          50: "#FDF2EF",
          100: "#FADFD8",
          200: "#F4B4A5",
          300: "#EC8872",
          400: "#E06241",
          500: "#D4442B",
          600: "#B03720",
          700: "#8A2A18",
          800: "#631E11",
          900: "#40130A",
        },
        // Aubergine — ink scale for text + dark surfaces
        ink: {
          50: "#F6F2F6",
          100: "#E4DDE5",
          200: "#BFB0C2",
          300: "#997F9E",
          400: "#6E5573",
          500: "#4A3550",
          600: "#39253E",
          700: "#2A182E",
          800: "#1E1020",
          900: "#110912",
        },
        surface: {
          0: "#FFFFFF",
          50: "#FAF9FA",
          100: "#F4F4F4",
          200: "#EAE8EA",
          300: "#DDDADE",
          400: "#AFAAB2",
          500: "#6B5E6F",
          600: "#4A3F4E",
          700: "#362D39",
          800: "#231D26",
          900: "#120F14",
        },
      },
      fontFamily: {
        sans: ["Pretendard Variable", "Pretendard", "var(--font-sans)", "Inter", "system-ui", "-apple-system", "sans-serif"],
        display: ["Pretendard Variable", "Pretendard", "var(--font-display)", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      fontSize: {
        "display-xl": ["4.25rem", { lineHeight: "1.02", letterSpacing: "-0.025em", fontWeight: "600" }],
        "display-lg": ["3rem", { lineHeight: "1.06", letterSpacing: "-0.022em", fontWeight: "600" }],
        "display-md": ["2.125rem", { lineHeight: "1.1", letterSpacing: "-0.018em", fontWeight: "600" }],
        "display-sm": ["1.5rem", { lineHeight: "1.22", letterSpacing: "-0.012em", fontWeight: "600" }],
        "body-lg": ["1.0625rem", { lineHeight: "1.65" }],
        "body-md": ["0.9375rem", { lineHeight: "1.6" }],
        "body-sm": ["0.8125rem", { lineHeight: "1.55" }],
        "caption": ["0.6875rem", { lineHeight: "1.4", letterSpacing: "0.14em" }],
      },
      borderRadius: {
        "2xl": "0.625rem",
        "3xl": "0.875rem",
        "4xl": "1.25rem",
      },
      boxShadow: {
        "soft": "0 1px 2px rgba(10,10,10,0.04)",
        "card": "0 2px 12px -4px rgba(10,10,10,0.06)",
        "elevated": "0 12px 32px -12px rgba(10,10,10,0.10)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
