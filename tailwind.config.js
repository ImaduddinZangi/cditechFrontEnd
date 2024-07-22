/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      textColor: {
        gray: ["#475467"],
        darkgray: ["#344054"],
        dark: ["#101828"],
        purple: ["#6941C6"],
      },
      backgroundColor: {
        purple: ["#7F56D9"],
        lightgray: ["#FCFCFD"],
      },
      borderColor: {
        lightgray: ["#D0D5DD"],
      },
      ringColor: {
        purple: ["#6941C6"],
      },
      accentColor: {
        purple: ["#6941C6"],
        darkpurple: ["#7F56D9"],
      },
      colors: {
        'custom-bg-color': '#F9F5FF',
      },
    },
  },
  plugins: [],
};

