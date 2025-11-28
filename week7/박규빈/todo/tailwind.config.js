/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // 다크모드 설정을 위해 필수
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#3182f6',
          darkBlue: '#1c64f2',
          yellow: '#fff3bf',
          green: '#d3f9d8',
          gray: '#dee2e6',
          text: '#212529',
          textGray: '#495057',
        },
      },
      fontFamily: {
        sans: ['"Apple SD Gothic Neo"', '"Noto Sans KR"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
