/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Sora', 'Inter', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#eef4ff',
          100: '#d9e6ff',
          200: '#bcd3ff',
          300: '#8eb6ff',
          400: '#598dff',
          500: '#3366ff',
          600: '#1f48f5',
          700: '#1733e1',
          800: '#192bb6',
          900: '#1a2a8f',
          950: '#141a57',
        },
        accent: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #3366ff 0%, #7c3aed 100%)',
        'brand-gradient-soft': 'linear-gradient(135deg, #eef4ff 0%, #f5f3ff 100%)',
        'mesh-light':
          'radial-gradient(at 0% 0%, rgba(51,102,255,0.18) 0px, transparent 50%), radial-gradient(at 100% 0%, rgba(124,58,237,0.18) 0px, transparent 50%), radial-gradient(at 50% 100%, rgba(51,102,255,0.12) 0px, transparent 50%)',
        'mesh-dark':
          'radial-gradient(at 0% 0%, rgba(51,102,255,0.25) 0px, transparent 50%), radial-gradient(at 100% 0%, rgba(124,58,237,0.22) 0px, transparent 50%), radial-gradient(at 50% 100%, rgba(51,102,255,0.18) 0px, transparent 50%)',
      },
      boxShadow: {
        glow: '0 0 40px -10px rgba(51, 102, 255, 0.45)',
        'glow-accent': '0 0 40px -10px rgba(124, 58, 237, 0.45)',
        card: '0 10px 30px -12px rgba(15, 23, 42, 0.18)',
        'card-hover': '0 20px 50px -12px rgba(51, 102, 255, 0.35)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.95)', opacity: '0.7' },
          '70%': { transform: 'scale(1.1)', opacity: '0' },
          '100%': { transform: 'scale(0.95)', opacity: '0' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.6s ease-out',
        float: 'float 6s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        shimmer: 'shimmer 2s linear infinite',
        'gradient-x': 'gradient-x 8s ease infinite',
      },
    },
  },
  plugins: [],
};
