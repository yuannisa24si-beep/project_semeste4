/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pink: {
          50: '#FDF0F0',
          100: '#F9E4E4',
          200: '#F5C6C6',
          300: '#EFA8A8',
          400: '#E8A4A4',
          500: '#D97B7B',
          600: '#C97B7B',
          700: '#A85C5C',
          800: '#7D3F3F',
          900: '#5C2E2E',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
