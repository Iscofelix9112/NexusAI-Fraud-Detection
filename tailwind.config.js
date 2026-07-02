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
          green: '#064e3b',
          lightgreen: '#22c55e',
          bg: '#f3f4f6',
          text: '#111827',
          gray: '#6b7280'
        },
        alertemerald: '#22c55e',
        alertcrimson: '#ef4444'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
