/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2F5A14',
          50: '#E8F3E0',
          100: '#D1E7C2',
          200: '#A3CF85',
          300: '#75B748',
          400: '#47A00B',
          500: '#2F5A14',
          600: '#254710',
          700: '#1B340C',
          800: '#112108',
          900: '#070E04',
          950: '#030702',
        },
        secondary: {
          DEFAULT: '#E8F3E0',
          50: '#FFFFFF',
          100: '#FFFFFF',
          200: '#FFFFFF',
          300: '#FFFFFF',
          400: '#FFFFFF',
          500: '#E8F3E0',
          600: '#C5E2B1',
          700: '#A2D182',
          800: '#7FC053',
          900: '#5C9F31',
          950: '#4B8228',
        },
        accent: {
          DEFAULT: '#FF6B35',
          50: '#FFFFFF',
          100: '#FFF3EE',
          200: '#FFD7C6',
          300: '#FFBB9E',
          400: '#FF9F76',
          500: '#FF834E',
          600: '#FF6B35',
          700: '#FD4A03',
          800: '#C53A02',
          900: '#8D2A02',
          950: '#712201',
        },
      },
      fontFamily: {
        sans: ['Open Sans', 'system-ui', 'sans-serif'],
        heading: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-in-out',
        'slide-in': 'slide-in 0.3s ease-out',
        'slide-up': 'slide-up 0.3s ease-out',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '112': '28rem',
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'inner-lg': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.1)',
      },
    },
  },
  plugins: [],
};