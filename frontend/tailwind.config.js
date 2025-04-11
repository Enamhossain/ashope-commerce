/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.border-gradient': {
          borderImage: 'linear-gradient(to right, rgba(170, 10, 149, 0.3), #131313) 1',
          borderImageSlice: '1', // Ensures the gradient fills the border
          borderWidth: '5px',
          borderStyle: 'solid', // Required for borderImage to work
        },
      });
    },
  ],
};