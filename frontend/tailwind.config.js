/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#fce4e4',
        secondary: '#fcb5b5',
        accent: '#fa6969',
        muted: '#f6f6f6',
        dark: '#333333',
        light: '#ffffff',
        border: '#e0e0e0',
        grayText: '#6b7280',
      },
      borderRadius: {
        DEFAULT: '1rem', // coins arrondis doux
        xl: '1.5rem',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 2px 12px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
}
