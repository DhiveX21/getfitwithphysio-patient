/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0795FE",
        danger: "#FE071A",
        info: "#FEEb07",
        success: "#95fe07",
        secondary: "#5e5e5e",
        lightDanger: "#FF8B92",
      },
    },
  },
  plugins: [],
};
