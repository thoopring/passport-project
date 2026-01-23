/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {}, // ✅ 이렇게 바꿔야 합니다
    autoprefixer: {},
  },
};

export default config;