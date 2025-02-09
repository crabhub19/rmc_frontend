/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'theme': '#008000',
        'theme-dark': '#006400',
        'theme-light': '#00FF00',
        'primary': '#F5f5dc',
        'primary-dark': '#9F8C76',
        'primary-light': '#EAD2A8',
      },
    },
  },
  plugins: [],
}