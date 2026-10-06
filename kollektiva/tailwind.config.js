/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: { geist: ['Geist', 'system-ui', 'sans-serif'] },
    },
  },
  plugins: [],
};
