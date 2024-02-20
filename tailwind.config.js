/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{html,js}",
    "./js/**/*.js",
    "./index.html",
    "./src/**/*.html",
  ],
  theme: {
    extend: {
      backgroundImage: {
        header: "url('/assets/images/banner.png')",
      },
      fontFamily: {
        anton: ["Anton", "sans-serif"],
        manrope: ["Manrope", "sans-serif"],
      },
    },
    colors: {
      white: "#fff",
      black: "#1B1B1B",
      grey: "#7A7A7A",
      lightGrey: "#C6C6C6",
      yellow: "#FFD15B",
      background: "#EDEDED",
    },
  },
  plugins: [],
};
