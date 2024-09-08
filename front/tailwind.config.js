/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
    },
    container: {
      center: true,
    },
    boxShadow: {
      custom: '0px 4px 4px 0px #0000003D',
      box: '0px 9px 16px 0px rgba(0, 0, 0, 0.18), 0px 6px 5px 0px rgba(0, 0, 0, 0.24)',
    },
    extend: {
      colors: {
        primary: '#2196F3',
        primary_dark: '#1E88E5',
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      backgroundImage: {
        like: "url('./src/assets/svg/heart.svg')",
        like_fill: "url('./src/assets/svg/heart-fill.svg')",
      },
    },
  },
  plugins: [],
};
