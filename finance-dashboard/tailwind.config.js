/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#f0fdf4',
          100: '#dcfce7',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
        },
      },
      boxShadow: {
        soft: '0 18px 45px -20px rgba(15, 23, 42, 0.35)',
      },
      backgroundImage: {
        mesh: 'radial-gradient(circle at top left, rgba(34,197,94,0.18), transparent 32%), radial-gradient(circle at top right, rgba(245,158,11,0.16), transparent 28%), linear-gradient(180deg, rgba(255,255,255,0.96), rgba(248,250,252,0.96))',
        'mesh-dark': 'radial-gradient(circle at top left, rgba(34,197,94,0.18), transparent 32%), radial-gradient(circle at top right, rgba(14,165,233,0.14), transparent 28%), linear-gradient(180deg, rgba(2,6,23,0.96), rgba(15,23,42,0.96))',
      },
    },
  },
  plugins: [],
};
