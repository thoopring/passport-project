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
        // Editorial navy — primary brand
        brand: {
          50: "#F3F5F7",
          100: "#DCE1E8",
          200: "#AFBAC8",
          300: "#7F8FA4",
          400: "#51647E",
          500: "#2E445F",
          600: "#1E3349",
          700: "#162838",
          800: "#0F2A3F",
          900: "#0A1B29",
          950: "#050E16",
        },
        // Muted editorial gold — accent only
        accent: {
          50: "#FAF5EB",
          100: "#F0E5CC",
          200: "#E4CFA6",
          300: "#D6B97F",
          400: "#C7A45C",
          500: "#B8935A",
          600: "#9E7D48",
          700: "#7E6436",
          800: "#5E4A27",
          900: "#3F3119",
        },
        surface: {
          0: "#FFFFFF",
          50: "#FAF7F0",
          100: "#F5EFE4",
          200: "#E5DFD4",
          300: "#CEC7B8",
          400: "#A39E93",
          500: "#737067",
          600: "#52504A",
          700: "#3F3E3A",
          800: "#26261F",
          900: "#14140E",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "Cambria", "Times New Roman", "serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      fontSize: {
        "display-xl": ["4.25rem", { lineHeight: "1.05", letterSpacing: "-0.02em", fontWeight: "400" }],
        "display-lg": ["3.25rem", { lineHeight: "1.08", letterSpacing: "-0.018em", fontWeight: "400" }],
        "display-md": ["2.25rem", { lineHeight: "1.15", letterSpacing: "-0.015em", fontWeight: "500" }],
        "display-sm": ["1.625rem", { lineHeight: "1.25", letterSpacing: "-0.01em", fontWeight: "500" }],
        "body-lg": ["1.0625rem", { lineHeight: "1.7" }],
        "body-md": ["0.9375rem", { lineHeight: "1.65" }],
        "body-sm": ["0.8125rem", { lineHeight: "1.55" }],
        "caption": ["0.6875rem", { lineHeight: "1.5", letterSpacing: "0.12em" }],
      },
      borderRadius: {
        "2xl": "0.75rem",
        "3xl": "1rem",
        "4xl": "1.5rem",
      },
      boxShadow: {
        "soft": "0 1px 2px rgba(15,42,63,0.04)",
        "card": "0 2px 10px -2px rgba(15,42,63,0.06)",
        "elevated": "0 8px 24px -8px rgba(15,42,63,0.10)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
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
