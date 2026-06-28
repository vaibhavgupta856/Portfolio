/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#030014',
          raised: '#0a0a18',
          border: '#1a1a2e',
        },
        accent: {
          DEFAULT: '#4f6bff',
          glow: '#94a3ff',
          muted: '#3b52cc',
        },
        cyan: {
          glow: '#38bdf8',
        },
      },
      fontFamily: {
        display: ['"Orbitron"', '"Syne"', 'system-ui', 'sans-serif'],
        body: ['"Exo 2"', '"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'gradient-flow': 'gradient-flow 6s ease infinite',
        'gradient-flow-slow': 'gradient-flow 12s ease infinite',
        shimmer: 'shimmer 3s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'glitch-1': 'glitch-1 2.5s infinite linear alternate-reverse',
        'glitch-2': 'glitch-2 3s infinite linear alternate-reverse',
      },
      keyframes: {
        'gradient-flow': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.85' },
          '50%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        'glitch-1': {
          '0%, 100%': { clipPath: 'inset(0 0 95% 0)' },
          '25%': { clipPath: 'inset(30% 0 40% 0)' },
          '50%': { clipPath: 'inset(60% 0 10% 0)' },
          '75%': { clipPath: 'inset(10% 0 70% 0)' },
        },
        'glitch-2': {
          '0%, 100%': { clipPath: 'inset(80% 0 5% 0)' },
          '25%': { clipPath: 'inset(10% 0 60% 0)' },
          '50%': { clipPath: 'inset(40% 0 30% 0)' },
          '75%': { clipPath: 'inset(70% 0 5% 0)' },
        },
      },
    },
  },
  plugins: [],
}
