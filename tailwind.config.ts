import type { Config } from "tailwindcss";

const config: Config = {
  // 👇 [핵심] 다크모드를 수동(토글 버튼)으로 껐다 켰다 할 수 있게 설정
  darkMode: "class", 
  
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // 👈 components 폴더도 잘 들어가 있네요!
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;