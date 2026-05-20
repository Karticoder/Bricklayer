/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#ebf5ff',
          100: '#d6eaff',
          200: '#add5ff',
          300: '#84c0ff',
          400: '#5aa9ff',
          500: '#2f93ff',
          600: '#0b7bff',
          700: '#0063db',
          800: '#004da8',
          900: '#003975'
        },
        secondary: {
          50: '#f7fafc',
          100: '#edf2f7',
          200: '#e2e8f0',
          300: '#cbd5e0',
          400: '#a0aec0',
          500: '#718096',
          600: '#4a5568',
          700: '#2d3748',
          800: '#1a202c',
          900: '#171923'
        }
      }
    }
  },
  plugins: [],
};
