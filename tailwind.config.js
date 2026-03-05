/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        rajdhani: ['"Rajdhani"', 'sans-serif'],
      },
      fontSize: {
        'clamp-xs': 'clamp(10px, 2.2vw, 15px)',
      },
      letterSpacing: {
        'widest-extra': '0.28em',
      },
      colors: {
        navy: '#120e5e',
        indigo: '#2e2aa0',
        blue: '#1e6fd9',
        cyan: '#4ab3d4',
        black: '#06040e',
        white: '#eeedf8',
        muted: 'rgba(238, 237, 248, 0.55)',
        'base-dark': '#030617',
        'base-light': '#050A1F',
        'grid-color': '#0F1A3A',
        'glow-blue': '#2F86D6',
        'glow-cyan': '#46B3D3',
      },
      spacing: {
        'clamp-mb': 'clamp(12px, 2.5vh, 24px)',
      }
    },
  },
  plugins: [],
}
