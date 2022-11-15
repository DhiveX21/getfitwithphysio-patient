/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#5aa9e6",
        success: "#5dff6d",
        danger: "#ff6392",
        info: "#7fc8e8",
        secondary: "#7a7a7a",
        lightDanger: "#FF8B92",
        warning: "#ffe45e",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
