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
        lightgray: ["#667085"],
        dark: ["#101828"],
        purple: ["#6941C6"],
      },
      backgroundColor: {
        purple: ["#7F56D9"],
        lightgray: ["#FCFCFD"],
        darkgray: ["#344054"],
        gray: ["#475467"],
        dark: ["#101828"],
        textpurple: ["#6941C6"],
      },
      borderColor: {
        lightgray: ["#D0D5DD"],
        purple: ["#6941C6"],
      },
      ringColor: {
        purple: ["#6941C6"],
      },
      accentColor: {
        purple: ["#6941C6"],
        darkpurple: ["#7F56D9"],
      },
      colors: {
        "custom-bg-color": "#F9F5FF",
      },
    },
  },
  plugins: [],
};
