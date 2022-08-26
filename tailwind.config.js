/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#22A8BA",
        danger: "#FF4F5A",
        lightDanger: "#FF8B92",
      },
    },
  },
  plugins: [],
};
