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
        // Cobalt — single accent for the whole product
        brand: {
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#3B82F6",
          600: "#2563EB",
          700: "#1D4ED8",
          800: "#1E40AF",
          900: "#1E3A8A",
          950: "#172554",
        },
        // Kept for backwards-compat only; same cobalt.
        accent: {
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#3B82F6",
          600: "#2563EB",
          700: "#1D4ED8",
          800: "#1E40AF",
          900: "#1E3A8A",
        },
        surface: {
          0: "#FFFFFF",
          50: "#FAFAFA",
          100: "#F5F5F5",
          200: "#E5E5E5",
          300: "#D4D4D4",
          400: "#A3A3A3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "-apple-system", "sans-serif"],
        display: ["var(--font-sans)", "Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      fontSize: {
        "display-xl": ["4rem", { lineHeight: "1.05", letterSpacing: "-0.025em", fontWeight: "600" }],
        "display-lg": ["3rem", { lineHeight: "1.08", letterSpacing: "-0.022em", fontWeight: "600" }],
        "display-md": ["2.25rem", { lineHeight: "1.15", letterSpacing: "-0.018em", fontWeight: "600" }],
        "display-sm": ["1.5rem", { lineHeight: "1.25", letterSpacing: "-0.012em", fontWeight: "600" }],
        "body-lg": ["1.0625rem", { lineHeight: "1.65" }],
        "body-md": ["0.9375rem", { lineHeight: "1.6" }],
        "body-sm": ["0.8125rem", { lineHeight: "1.5" }],
        "caption": ["0.6875rem", { lineHeight: "1.4", letterSpacing: "0.14em" }],
      },
      borderRadius: {
        "2xl": "0.625rem",
        "3xl": "0.875rem",
        "4xl": "1.25rem",
      },
      boxShadow: {
        "soft": "0 1px 2px rgba(10,10,10,0.04)",
        "card": "0 1px 3px rgba(10,10,10,0.05), 0 1px 2px rgba(10,10,10,0.03)",
        "elevated": "0 8px 24px -8px rgba(10,10,10,0.08)",
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-out forwards",
        "fade-up": "fadeUp 0.5s ease-out forwards",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
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
