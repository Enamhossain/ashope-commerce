/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ff4d00",
        "primary-hover": "#e64500",
        secondary: "#ffffff",
        surface: "rgba(20, 20, 20, 0.8)",
      },
      fontFamily: {
        heading: ["Outfit", "sans-serif"],
        body: ["Plus Jakarta Sans", "sans-serif"],
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.border-gradient': {
          borderImage: 'linear-gradient(to right, rgba(255, 77, 0, 0.4), #131313) 1',
          borderImageSlice: '1',
          borderWidth: '2px',
          borderStyle: 'solid',
        },
      });
    },
  ],
};