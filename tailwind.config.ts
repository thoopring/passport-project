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
        // Vermilion — warm primary accent (CTAs, links, emphasis)
        brand: {
          50: "#FDF0EC",
          100: "#FBDCD1",
          200: "#F5B19C",
          300: "#EE856A",
          400: "#DF5E3C",
          500: "#D4442B",
          600: "#B63521",
          700: "#92291A",
          800: "#6E1F14",
          900: "#4A150D",
          950: "#280A06",
        },
        accent: {
          50: "#FDF0EC",
          100: "#FBDCD1",
          200: "#F5B19C",
          300: "#EE856A",
          400: "#DF5E3C",
          500: "#D4442B",
          600: "#B63521",
          700: "#92291A",
          800: "#6E1F14",
          900: "#4A150D",
        },
        paper: {
          50: "#FCFAF5",
          100: "#F9F4EB",
          200: "#F5EFE4",
          300: "#EBE3D2",
          400: "#D8CDB5",
          500: "#B8A98A",
        },
        surface: {
          0: "#FFFFFF",
          50: "#FAFAF7",
          100: "#F5F3ED",
          200: "#E5DFD4",
          300: "#CEC7B8",
          400: "#A39E93",
          500: "#6E6B64",
          600: "#52504A",
          700: "#3F3E3A",
          800: "#26261F",
          900: "#14140E",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "-apple-system", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "Cambria", "Times New Roman", "serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      fontSize: {
        "display-xl": ["4.5rem", { lineHeight: "1.02", letterSpacing: "-0.02em", fontWeight: "400" }],
        "display-lg": ["3.25rem", { lineHeight: "1.06", letterSpacing: "-0.018em", fontWeight: "400" }],
        "display-md": ["2.25rem", { lineHeight: "1.1", letterSpacing: "-0.015em", fontWeight: "400" }],
        "display-sm": ["1.625rem", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "500" }],
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
        "soft": "0 1px 2px rgba(20,21,23,0.04)",
        "card": "0 2px 12px -4px rgba(20,21,23,0.08)",
        "elevated": "0 12px 32px -12px rgba(20,21,23,0.12)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
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
