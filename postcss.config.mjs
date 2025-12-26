/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {}, // Cập nhật dòng này
    autoprefixer: {},
  },
};

export default config;