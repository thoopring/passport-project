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
        // Coral — primary brand. Friendlier than vermilion.
        brand: {
          50: "#FFF5F4",
          100: "#FFE4E0",
          200: "#FFC4BC",
          300: "#FFA098",
          400: "#FF8580",
          500: "#FF6B6B",
          600: "#E04848",
          700: "#B83333",
          800: "#8A2424",
          900: "#5C1818",
          950: "#330C0C",
        },
        // Soft Blue — secondary accent (sky/ocean). For badges, secondary
        // CTAs, decorative dots, and breaking up coral monotony.
        accent: {
          50: "#F1F8FD",
          100: "#DCEEFA",
          200: "#B6DBF4",
          300: "#86C3EA",
          400: "#5EB1E2",
          500: "#4DA8DA",
          600: "#2F88BB",
          700: "#226A95",
          800: "#194E6E",
          900: "#10334A",
        },
        // Sand — tertiary warmth, for highlight cards and section breaks.
        sand: {
          50: "#FBF1E2",
          100: "#F4DECB",
          200: "#EBC9A8",
          300: "#DCAC7E",
          400: "#C99057",
          500: "#B47840",
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
        display: ["var(--font-fraunces)", "Pretendard Variable", "Pretendard", "Georgia", "serif"],
        fraunces: ["var(--font-fraunces)", "Pretendard Variable", "Pretendard", "Georgia", "serif"],
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
