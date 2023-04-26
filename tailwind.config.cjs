/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#16ABF8',
        danger: '#ED4C5C',
        secondary: '#888888',
        light: '#F4F4F4',
        superLight: '#E5E5E5',
        dark: '#4A4A4A',
        high: '#F8A541',
        normal: '#00A790',
        low: '#428BC1',
        veryLow: '#8942C1',
      },
    },
  },
  plugins: [],
};
