/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f3effa',
          100: '#e7dff5',
          200: '#d9cbed',
          300: '#CDB4DB', // Pastel Purple
          400: '#b89fcc',
          500: '#a38abd',
          600: '#8e75ae',
        },
        secondary: {
          50: '#e6f4ff',
          100: '#cce9ff',
          200: '#99d3ff',
          300: '#A2D2FF', // Pastel Blue
          400: '#7ab8ff',
          500: '#5295e0',
          600: '#3470c0',
        },
        success: {
          50: '#edf8f3',
          100: '#dbf1e7',
          200: '#c7e9db',
          300: '#B5EAD7', // Pastel Green
          400: '#8ed3b7',
          500: '#68bc98',
          600: '#47a57d',
        },
        warning: {
          50: '#fffceb',
          100: '#fff9d6',
          200: '#fff6be',
          300: '#FFF1A6', // Pastel Yellow
          400: '#ffeb7a',
          500: '#ffe44d',
          600: '#ffd91f',
        },
        error: {
          50: '#fef2f0',
          100: '#fde6e1',
          200: '#fbd7ce',
          300: '#FFB5A7', // Pastel Pink
          400: '#ff9a8a',
          500: '#ff7c6b',
          600: '#ff5c47',
        },
        accent: {
          50: '#fff4e9',
          100: '#ffe9d3',
          200: '#ffdebc',
          300: '#FFD6A5', // Pastel Orange
          400: '#ffc278',
          500: '#ffa94d',
          600: '#ff901f',
        },
      },
      boxShadow: {
        'neumorphic': '5px 5px 10px #d1d9e6, -5px -5px 10px #ffffff',
        'neumorphic-inset': 'inset 5px 5px 10px #d1d9e6, inset -5px -5px 10px #ffffff',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
      },
      backdropBlur: {
        'glass': '8px',
      },
      animation: {
        'fadeIn': 'fadeIn 0.5s ease-in-out',
        'slideUp': 'slideUp 0.5s ease-in-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'blob': 'blob 7s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
      },
    },
  },
  plugins: [],
};