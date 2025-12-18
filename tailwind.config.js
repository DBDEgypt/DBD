/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3634e3',
        accent: '#3634e3',
        'accent-light': '#5a58ff',
        'accent-dark': '#2a28b8',
        secondary: '#494949',
        dark: '#000000',
        'dark-soft': '#0a0a0a',
        'dark-gray': '#1a1a1a',
      },
      fontFamily: {
        graphik: ['Graphik Compact Trial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
