/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primaryLo: "#4a0026",
        primary: "#7E0040",
        primaryHi: "#b0005a",
        secondary: "#FBBEDE",
        third: "#0000",
        dimWhite: "rgba(255, 255, 255, 0.7)",
        dimBlue: "rgba(9, 151, 124, 0.1)",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      height: {
        carrouselSize: "30rem",
        detailsSize: "60rem",
      },
      transitionProperty: {
        width: "width",
        height: "height",
      },
      animation: {
        wiggle: "wiggle 0.1s linear infinite",
      },
      keyframes: {
        wiggle: {
          "0%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-2deg)" },
          "50%": { transform: "rotate(0deg)" },
          "75%": { transform: "rotate(2deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  variants: {
    extend: {
      backgroundColor: ["group-hover"],
      text: ["group-hover"],
      borderColor: ["group-hover"],
    },
  },
  plugins: [],
};
