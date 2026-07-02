/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
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
        deepblue: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#0b0f19',
        },
        crispslate: {
          900: '#0f172a',
          800: '#1e293b',
          700: '#334155',
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
