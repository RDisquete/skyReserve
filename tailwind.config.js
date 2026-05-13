/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#020617',
          accent: '#38bdf8',
          panel: '#1e293b',
        }
      }
    },
  },
  plugins: [],
}