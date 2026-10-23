/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#0a0d14',
          surface: '#111726',
          border: '#1f293d',
          green: '#00ff66',
          amber: '#ffb000',
          cyan: '#00e5ff',
          red: '#ff3366',
          purple: '#b266ff',
        },
      },
      fontFamily: {
        mono: ['"Fira Code"', 'Consolas', 'Monaco', '"Courier New"', 'monospace'],
        display: ['ui-sans-serif', 'system-ui', 'sans-serif'],
        classic: ['"Palatino Linotype"', '"Book Antiqua"', 'Palatino', 'Georgia', '"Times New Roman"', 'serif'],
        hand: ['Papyrus', '"Segoe Print"', '"Bradley Hand ITC"', '"Ink Free"', 'cursive'],
      },
      animation: {
        'pulse-fast': 'pulse 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'flicker': 'flicker 0.15s infinite',
      },
    },
  },
  plugins: [],
};
