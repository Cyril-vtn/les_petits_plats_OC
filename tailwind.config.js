/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{html,js}",
    "./pages/**/*.{html,js}",
    "./index.html",
  ],
  theme: {
    extend: {},
    colors: {
      white: "#fff",
      black: "#1B1B1B",
      grey: "#7A7A7A",
      lightGrey: "#C6C6C6",
      yellow: "#FFD15B",
    },
  },
  plugins: [],
};
